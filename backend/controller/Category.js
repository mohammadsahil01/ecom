const { Category } = require("../model/Category")

exports.fetchCategory = async (req,res)=>{
    const categories = await Category.find({}).exec()
    try{
        res.status(201).json(categories)
    }catch(err){
        res.status(400).json(err)
    }
}

exports.createCategory= async (req,res)=>{
    const product = new Category(req.body)
    try{
        const doc = await product.save()
        res.status(201).json(doc)
    }catch(err){
        res.status(400).json(err)
    }
}