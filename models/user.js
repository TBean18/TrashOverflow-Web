const mongoose = require('mongoose');
const GroupPlaceHolder = require('./GroupPlaceHolder');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt');
const SALT_WORK_FACTOR = 10;

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
//A PRE-METHOD that fires before every user.save() call
//Checks to ensure that the  passwrod was not changed, if it has, then we need to recompute the hash
UserSchema.pre('save', function(next) {
  var user = this;

  // only hash the password if it has been modified (or is new)
  if (!user.isModified('password')) return next();

  // generate a salt
  bcrypt.genSalt(SALT_WORK_FACTOR, function(err, salt) {
    if (err) return next(err);

    // hash the password using our new salt
    bcrypt.hash(user.password_hash, salt, function(err, hash) {
        if (err) return next(err);

        // override the cleartext password with the hashed one
        user.password_hash = hash;
        next();
    });
  });
});

//Compare a plaintext password to the this.password_hash
UserSchema.methods.comparePassword = function(inputPassword, cb){
  bcrypt.compare(inputPassword, this.password_hash, (err, isMatch) => {
    if (err) return cb(err);
    cb(null, isMatch);
  });
};

//Add a group to the users.groups []
UserSchema.methods.addGroup = function(newGroup, cb){
  //Format the data from the input model 
  const data = {
    group_ID: newGroup._id,
    group_name: newGroup.group_name
  }
  const newGroupHolder = new GroupPlaceHolder.GroupPlaceHolder(data);
  //Check for duplicate group
  var unique = true;
  this.groups.forEach(g => {
    if(g.group_ID.equals(newGroupHolder.group_ID)){
      unique = false;
      // console.log('Same');
    }
  })
  //If unique add the new group
  if(unique){
    this.groups.push(newGroupHolder)
    this.save(cb)
  }
}


const User = mongoose.model('user', UserSchema); 
module.exports = User;
