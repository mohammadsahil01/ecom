const { User } = require("../model/USer");
const crypto = require('crypto');
const { SanitiziedUser } = require("../services/common");
const jwt = require('jsonwebtoken')
exports.createUser= async (req,res)=>{
    
    try{
        var salt = crypto.randomBytes(16);
        crypto.pbkdf2(req.body.password, salt, 310000, 32, 'sha256',
        async function(err, hashedPassword){
        const user = new User({email:req.body.email,password:hashedPassword,salt})
        const doc = await user.save()

        req.login(SanitiziedUser(user),(err)=>{
            if(err){
                res.status(400).json(err)
            }else{
                const token = jwt.sign(SanitiziedUser(user),'SECRET_KEY')
                res.cookie('jwt',token, { expires: new Date(Date.now() + 3600000), httpOnly: true }).status(200).json({token})
            }
        })
        })
        }catch(err){
        res.status(400).json(err)
        }
        }


exports.loginUser= async (req,res)=>{
    res.cookie('jwt',req.user.token, { expires: new Date(Date.now() + 3600000), httpOnly: true }).status(200).json(req.user)
}

exports.checkUser = async (req,res)=>{
    res.json(SanitiziedUser(req.user))
}

// exports.loginUser= async (req,res)=>{
    
//     try{
//         const user = await User.findOne({email:req.body.email}).exec()
//         if(user){
//         if(user.password===req.body.password){
//             res.status(201).json({id:user.id,email:user.email,Addresses:user.Addresses})
//         }else{``
//             res.status(401).json({message:'invalid credentials'})
//         }}else{
//             res.status(401).json({message:'invalid credentials'})
//         }
//     }catch(err){
//         res.status(401).json(err)
//     }
// }