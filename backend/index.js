require('dotenv').config()
const express = require('express');
const server = express();
const mongoose = require('mongoose');
const passport = require('passport');
const session = require('express-session');
const LocalStrategy = require('passport-local').Strategy
const { createProduct } = require('./controller/Products');
const ProductsRoutes = require('./routes/Products')
const CategoryRoutes = require('./routes/Category')
const BrandRoutes = require('./routes/Brand')
const UserRouter = require('./routes/User');
const AuthRouter = require('./routes/Auth')
const CartRouter = require('./routes/Cart')
const OrderRouter = require('./routes/Order')
const cors = require('cors');
const { User } = require('./model/USer');
const crypto = require('crypto');
const { SanitiziedUser, isAuth, cookieExtractor } = require('./services/common');
const JwtStrategy = require('passport-jwt').Strategy
const ExtractJwt = require('passport-jwt').ExtractJwt;
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser')




server.use(express.json())
// server.use(express.static('build'))
server.use(cookieParser());

const opts = {}
opts.jwtFromRequest = cookieExtractor;
opts.secretOrKey = "SECRET_KEY";



main().catch(error=>console.log(error))


async function main(){
    await mongoose.connect(process.env.MONGO_DB_URL)
    console.log('db connected')
}

server.use(session({
    secret: process.env.SESSION_KEY,
    resave: false, // don't save session if unmodified
    saveUninitialized: false, // don't create session until something stored
  }));
  
server.use(passport.authenticate('session'));
server.use(cors({origin: 'http://localhost:3000',exposedHeaders:['X-Total-Count'],credentials:true}))


server.use('/products',isAuth(),ProductsRoutes.router)
server.use('/categories',isAuth(),CategoryRoutes.router)
server.use('/brands',isAuth(),BrandRoutes.router)
server.use('/auth',AuthRouter.router)
server.use('/users',isAuth(),UserRouter.router)
server.use('/cart',isAuth(),CartRouter.router)
server.use('/orders',isAuth(),OrderRouter.router)


passport.use('local',new LocalStrategy(
  {usernameField:'email'},
    async function(email, password, done) {
        try{
            const user = await User.findOne({email:email}).exec()
            if(!user){
                done(null,false,{message:'invalid credentials'}
            )}
            crypto.pbkdf2(password,user.salt, 310000, 32, 'sha256', function(err, hashedPassword){
            if (!crypto.timingSafeEqual(user.password, hashedPassword)){
                done(null,false,{message:'invalid credentials'})  
            }else{
                const token = jwt.sign(SanitiziedUser(user),'SECRET_KEY')
            done(null,{token})
            }
            })

        }catch(err){
            done(err)
        }
      
    }
  ));

  passport.use('jwt', new JwtStrategy(opts, async function(jwt_payload, done) {
    try {
      const user = await User.findById(jwt_payload.id);
      
      if (user) {
        return done(null,SanitiziedUser(user));
        // or you could create a new account
      }else{
        return done(null,false);
      }
    } catch (err) {
      return done(err, false);
    }
  }));
  

  passport.serializeUser(function(user, cb) {
    process.nextTick(function() {
      return cb(null,SanitiziedUser(user));
    });
  });
  
  passport.deserializeUser(function(user, cb) {
    process.nextTick(function() {
      return cb(null, SanitiziedUser(user));
    });
  });


//Payments

// This is your test secret API key.
const stripe = require("stripe")(process.env.SECRET_API_KEY);

server.use(express.static("public"));


server.post("/create-payment-intent", async (req, res) => {
  const { totalAmount } = req.body;

  // Create a PaymentIntent with the order amount and currency
  const paymentIntent = await stripe.paymentIntents.create({
    amount: totalAmount*100,
    currency: "inr",
    // In the latest version of the API, specifying the `automatic_payment_methods` parameter is optional because Stripe enables its functionality by default.
    automatic_payment_methods: {
      enabled: true,
    },
  });

  res.send({
    clientSecret: paymentIntent.client_secret,
  });
});


server.get('/logout', (req, res) => {
  // Destroy the session

    // Clear cookies
    res.clearCookie('jwt'); // Replace with your actual session cookie name

    // Redirect to the home page or login page

});


server.listen(process.env.PORT,()=>{
    console.log('server started')
})