const mongoose = require('mongoose')

const {Schema} = mongoose;



const cartSchema = new Schema({
  
  Product: {
    type: Schema.Types.ObjectId,ref:'Product',
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
  },
  user: {
    type:Schema.Types.ObjectId,ref:'User',
    required: true,
  },
});

const virtual =  cartSchema.virtual('id');
virtual.get(function(){
    return this._id
})

cartSchema.set('toJSON',{
    virtuals:true,
    versionKey:false,
    transform:function(doc,ret){delete ret._id}
})



exports.Cart = mongoose.model('Cart', cartSchema);


