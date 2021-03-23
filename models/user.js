const mongoose = require('mongoose');
const GroupPlaceHolder = require('./groupPlaceHolder');
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
  if (!user.isModified('password_hash')) return next();

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

  const added = this.groups.addToSet(data)
  if(added.length == 0){
    let err = `User: ${this.name} is already a member of Group: ${data.group_name}`
    return cb(err)
  }
  this.save()

  // //Check for duplicate group
  // var unique = true;
  // this.groups.forEach(g => {
  //   if(g.group_ID.equals(newGroupHolder.group_ID)){
  //     unique = false;
  //     // console.log('Same');
  //   }
  // })
  // //If unique add the new group
  // if(unique){
  //   this.groups.push(newGroupHolder)
  //   this.save(cb)
  // }else{
  //   let err = `User: ${this.name} is already a member of Group: ${data.group_name}`
  //   return cb(err)
  // }
}

//Removes a group from the User's groups [] 
// curGroupID is the groupPlaceHolderID
UserSchema.methods.leaveGroup = function(curGroupID, cb){
  //Manuallly find the index of the group we want to remove
  //remove that index form the groupPlaceHolders arrray
  //Save the result
  this.groups.pull(curGroupID);
  this.save(cb)
}

UserSchema.statics.leaveGroup = function(user_ID, group_ID){
  this.update({_id: user_ID}, {$pull: { groups: { $elemMatch: {group_ID: group_ID}}}})
}


// Returns an array of the Users group.group_ID objects
// Mainly for use when we use the .populate() command
UserSchema.methods.getGroup_IDArray = function(cb){
  let groups = []
  this.groups.map(g =>{
    groups.push(g.group_ID);
  });
  return groups
}

const User = mongoose.model('user', UserSchema); 
module.exports = User;
