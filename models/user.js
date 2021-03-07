const mongoose = require('mongoose');
const GroupPlaceHolder = require('./GroupPlaceHolder');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  name:{
      type: String,
      required: true
  },
  password_hash:{
    type: String,
    required: true
  },
  phone_number:{
    type: String
  },
  email:{
    type: String,
    required: true,
    unique: true
  },
  email_verified:{
    type: Boolean,
    default: false
  },
  date_created:{
    type: Date,
    default: Date.now
  },
  groups:{
    type: [GroupPlaceHolder.GroupPlaceHolderSchema]
  }

})


const User = mongoose.model('user', UserSchema); 
module.exports = User;
