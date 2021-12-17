const mongoose = require('mongoose')
const conn = mongoose.createConnection("process.env.MONGO_URI");
const bcrypt = require('bcryptjs')


const UserSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
})

//Popuplating this field of books to user s
UserSchema.virtual('purchase', {
    ref: 'Purchase',
    foreignField: 'createdBy',
    localField: '_id',
  });
  UserSchema.set('toJSON', { virtuals: true });
  
  //=== END=======


UserSchema.pre('save', async function (next) {
    //We only want to do this if the password is sent or modified, this is because when a user later update their password this will run and the user cannot login
    if (!this.isModified('password')) {
      next();
    }
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  });

  
UserSchema.methods.isPasswordMatch = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
  };

const User = conn.model('User', UserSchema)

module.exports = User