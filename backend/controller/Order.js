const { Cart } = require("../model/Cart")
const { Order } = require("../model/Order")


exports.fetchOrderbyUser = async (req,res)=>{
    const user = req.user
    try{
        const items = await Order.find({user:user.id}).populate('items')
        res.status(201).json(items)
    }catch(err){
        res.status(400).json(err)
    }
}

exports.CreateOrder = async (req,res)=>{
    const {user} = req.user
    
    const item = new Order({...req.body},{user:user})
    try{
        const doc = await item.save();
        res.status(201).json(doc)
    }catch(err){
        res.status(400).json(err)
    }
}

exports.DeleteOrder = async (req,res)=>{
    const {id} = req.params
    
    try{
        const item = await Order.findByIdAndDelete(id);
        
    if (item) {
        console.log(`Order ${item} deleted successfully.`);
        res.status(201).json(item)
      } else {
        console.log(`No Order found with em ${item}.`);
        res.status(400).json({message:`No Item found with em ${item}.`})
      }
    }catch (error) {
         console.error('Error deleting Order:', error.message);
         res.status(401).json({error})
    }
    }

    