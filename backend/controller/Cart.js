const { Cart } = require("../model/Cart")


exports.fetchCartbyUser = async (req,res)=>{
    const {id} = req.user
    
    try{
        const items = await Cart.find({user:id}).populate('user').populate('Product')
        res.status(201).json(items)
    }catch(err){
        res.status(400).json(err)
    }
}

exports.AddToCart = async (req,res)=>{
    const user = req.user.id
    const item = new Cart({...req.body,user:user})
    try{
        const doc = await item.save();
        const result = await doc.populate('Product')
        res.status(201).json(result)
    }catch(err){
        res.status(400).json(err)
    }
}

exports.DeleteFromCart = async (req,res)=>{
    const {id} = req.params
    
    try{
        const item = await Cart.findByIdAndDelete(id);
        
    if (item) {
        console.log(`Item ${item} deleted successfully.`);
        res.status(201).json(item)
      } else {
        console.log(`No Item found with em ${item}.`);
        res.status(400).json({message:`No Item found with em ${item}.`})
      }
    }catch (error) {
         console.error('Error deleting Item:', error.message);
         res.status(401).json({error})
    }
    }

    exports.updateCart = async (req,res)=>{
        const {id} = req.params
        
        try{
            const item = await Cart.findByIdAndUpdate(id,req.body,{new:true});
            const doc = await item.populate('Product')
            
        if (doc) {
            console.log(`Item ${doc} update successfully.`);
            res.status(201).json(doc)
          } else {
            console.log(`No Item found with em ${doc}.`);
            res.status(400).json({message:`No Item found with em ${doc}.`})
          }
        }catch (error) {
             console.error('Error updating Item:', error.message);
             res.status(401).json({error})
        }
        }