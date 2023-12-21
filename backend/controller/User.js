const { Category } = require("../model/Category")
const { User } = require("../model/USer")
const { SanitiziedUser } = require("../services/common")

exports.fetchUserById = async (req,res)=>{
    const {id}= req.user
    const user = await User.findById(id,'name email id Addresses')
    try{
        res.status(201).json(user)
    }catch(err){
        res.status(400).json(err)
    }
}

exports.updateUser = async (req,res)=>{
    const {id} = req.user
          try{
        // Check if 'Addresses' field is present in req.body
        if (req.body.Addresses) {
            // If yes, push the new addresses into the existing Addresses array
            const user = await User.findById(id)
            user.Addresses.push(req.body.Addresses)
            await user.save()
            res.status(201).json(SanitiziedUser(user));
        }
        else{
        const user = await User.findByIdAndUpdate(id,updateQuery,{new:true}).exec();
        res.status(201).json(SanitiziedUser(user));
        }
    }catch(err){
        res.status(400).json(err)
    }
}

