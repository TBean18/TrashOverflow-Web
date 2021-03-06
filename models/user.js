const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const GroupPlaceHolder = new Schema({
  group_ID: Schema.Types.ObjectID,
  group_name: String
})

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
    required: true
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
    type: [GroupPlaceHolder]
  }

})



module.exports = User = mongoose.model('user', UserSchema);