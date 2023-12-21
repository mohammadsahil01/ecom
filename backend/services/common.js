const passport = require('passport');

exports.isAuth=(req,res,done)=>{
   return passport.authenticate('jwt')
}

exports.SanitiziedUser=(user)=>{
    return{
        id:user.id,email:user.email,Addresses:user.Addresses,role:user.role
      }
}

exports.cookieExtractor= function(req){
  var token = null;
  if(req && req.cookies){
    token = req.cookies['jwt']
  }
  return token;
}