const mongoose = require('mongoose')

const {Schema} = mongoose;



const UserSchema = new Schema(
    {
        email: {
          type: String,
          required: true,
        },
        password: {
          type: Buffer,
          required: true,
        },
        Addresses: [{
          type: mongoose.Schema.Types.Mixed, // Array of addresses
        }],
        role: {
          type: String,
          default:'user'
        },
        salt:{type:Buffer}
      }
  );

const virtual =  UserSchema.virtual('id');
virtual.get(function(){
    return this._id
})

UserSchema.set('toJSON',{
    virtuals:true,
    versionKey:false,
    transform:function(doc,ret){delete ret._id}
})



exports.User = mongoose.model('User', UserSchema);


