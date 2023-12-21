const mongoose = require('mongoose')

const {Schema} = mongoose;



const CategorySchema = new Schema({
    value: {
        type: String,
        required: true,
      },
      label: {
        type: String,
        required: true,
      },
      checked: {
        type: Boolean,
        required: true,
      },
});

const virtual =  CategorySchema.virtual('id');
virtual.get(function(){
    return this._id
})

CategorySchema.set('toJSON',{
    virtuals:true,
    versionKey:false,
    transform:function(doc,ret){delete ret._id}
})



exports.Category = mongoose.model('Category', CategorySchema);


