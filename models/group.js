const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const GroupMember = require('./groupMember');
const Chore = require('./chore');


const GroupSchema = new Schema({
  group_name:{
      type: String,
      required: true
  },
  group_members:{
    type: [GroupMember.GroupMemberSchema],
    required: true
  },
  group_member_count: {
    type: Number,
    default: 1
  },
  group_description:{
    type: String,
    default: 'Our Great Group'
  },
  date_created:{
    type: Date,
    default: Date.now
  },
  group_chore_list: {
    type: [Chore.ChoreSchema]
  }

});

//Add a user to the group_members []
GroupSchema.methods.addGroupMember = function(newMember, cb){
  //Format input data
  const data = {
    user_ID: newMember._id,
    user_name: newMember.name,
    completed_tasks: 0,
    point_balance: 0
  }



  // const added = this.group_members.addToSet(data)
  // if(added.length == 0){
  //   let err = `User: ${data.user_name} is already a member of Group: ${this.group_name}`
  //   return cb(err)
  // }

  const newGroupMember = new GroupMember.model(data);
  
  //Check for duplicate group
  var unique = true;
  this.group_members.every(member => {
    if(member.user_ID.equals(newGroupMember.user_ID)){ 
      unique = false;
      return false;
    }
    return true;
  })
  //If unique add
  if(unique){
    this.group_members.push(newGroupMember)
    this.save(cb);
    return
  }else{
    let err = `User: ${data.user_name} is already a member of Group: ${this.group_name}`
    return cb(err)
  }

}

//Remove a group member from the group_members []
GroupSchema.methods.removeGroupMember = function(curMemberID, cb) {
  this.group_members.pull(curMemberID);
  this.save(cb);
}

// ***ASSUMES curMemberID IS THE ID OF AN EXISTING GROUP MEMBER***
// Promotes a group member to admin
GroupSchema.methods.promoteGroupMember = function(curMemberID, cb) {
  this.group_members[curMemberID].admin = true;
  this.save(cb);
}

// ***ASSUMES curMemberID IS THE ID OF AN EXISTING GROUP MEMBER***
// Demotes a group member from admin
GroupSchema.methods.demoteGroupMember = function(curMemberID, cb) {
  this.group_members[curMemberID].admin = false;
  this.save(cb);
}

// Returns admin if admin is a member of this group, empty string otherwise
GroupSchema.methods.verifyAdmin = function(curMemberID, cb) {
  let res = this.group_members.filter(mem => curMemberID === mem.user_ID && mem.admin === true);
  // should just be length 1 if admin found, but just in case...
  return (res.length >= 1) ? res : '';
}

// Returns user if user is a member of this group, empty string otherwise
GroupSchema.methods.verifyUser = function(curMemberID, cb) {
  let res = this.group_members.filter(mem => curMemberID === mem.user_ID);
  // should just be length 1 if user found, but just in case...
  return (res.length >= 1) ? res : '';
}


const Group = mongoose.model('group', GroupSchema);
module.exports = Group;
