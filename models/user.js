const mongoose = require("mongoose");
const GroupPlaceHolder = require("./groupPlaceHolder");
const Schema = mongoose.Schema;
const bcrypt = require("bcrypt");
const SALT_WORK_FACTOR = 10;

const UserSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  password_hash: {
    type: String,
    required: true,
  },
  phone_number: {
    type: String,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  email_verified: {
    type: Boolean,
    default: false,
  },
  date_created: {
    type: Date,
    default: Date.now,
  },
  groups: {
    type: [GroupPlaceHolder.GroupPlaceHolderSchema],
  },
});
//A PRE-METHOD that fires before every user.save() call
//Checks to ensure that the  passwrod was not changed, if it has, then we need to recompute the hash
UserSchema.pre("save", function (next) {
  var user = this;

  // only hash the password if it has been modified (or is new)
  if (!user.isModified("password_hash")) return next();

  // generate a salt
  bcrypt.genSalt(SALT_WORK_FACTOR, function (err, salt) {
    if (err) return next(err);

    // hash the password using our new salt
    bcrypt.hash(user.password_hash, salt, function (err, hash) {
      if (err) return next(err);

      // override the cleartext password with the hashed one
      user.password_hash = hash;
      next();
    });
  });
});

//Compare a plaintext password to the this.password_hash
UserSchema.methods.comparePassword = function (inputPassword, cb) {
  bcrypt.compare(inputPassword, this.password_hash, (err, isMatch) => {
    if (err) return cb(err);
    cb(null, isMatch);
  });
};

//Add a group to the users.groups []
// Checks for duplicates before doing so
UserSchema.methods.addGroup = function (newGroup, cb) {
  //Format the data from the input model
  const data = {
    group_ID: newGroup._id,
    group_name: newGroup.group_name,
  };

  // So aparantly addToSet will not with with documents unless the enplicit _id is the same too
  // Thus, we should copy the groups add Group member function

  //Check for duplicates
  let unique = true;
  this.groups.every((group) => {
    if (group.group_ID.equals(data.group_ID)) {
      unique = false;
      return false;
    }
    return true;
  });
  //Add groupPlaceHolder if unique
  if (unique) {
    this.groups.push(data);
    this.save(cb);
    return;
  } else {
    let err = `User: ${this.name} is already a member of Group: ${data.group_name}`;
    return cb(err);
  }
};

//Removes a group from the User's groups []
// curGroupID is the groupPlaceHolderID
UserSchema.methods.leaveGroup = function (curGroupID, cb) {
  //Manuallly find the index of the group we want to remove
  //remove that index form the groupPlaceHolders arrray
  //Save the result
  this.groups.pull(curGroupID).then(this.save(cb));
  // this.save(cb)
};

// This function removed a group place holder from the user object corsponding to the user_ID param
// RETURNS a the updated user with populated group data promise that should we awaited due to the included .exec()
UserSchema.statics.leaveGroup = function (user_ID, group_ID) {
  return this.findById(user_ID)
    .then((cur) => {
      cur.groups = cur.groups.filter(
        (group) => !group.group_ID.equals(group_ID)
      );
      cur.save();
      return cur;
    })
    .catch((err) => console.log(err));
  // return this.findOneAndUpdate(
  //   { _id: user_ID },
  //   { $pull: { groups: { group_ID: group_ID } } },
  //   { new: true }
  // )
  //   .populate({
  //     path: "groups",
  //     populate: {
  //       path: "group_ID",
  //       model: "group",
  //     },
  //   })
  //   .exec();
};

// Returns an array of the Users group.group_ID objects
// Mainly for use when we use the .populate() command
UserSchema.methods.getGroup_IDArray = function (cb) {
  let groups = [];
  this.groups.map((g) => {
    g.group_ID.isAdmin = g.group_ID.verifyAdmin(this._id, (err, res) => {
      if (err) {
        console.log(err);
        return false;
      } else return true;
    });
    groups.push(g.group_ID);
  });
  return groups;
};

//Returns a list of all chores assigned to the current user
UserSchema.statics.getChoreList = function (user_ID, cb) {
  // Initilize an empty list to store the chorelist
  let ret = [];
  this.findById(user_ID) // Populates the user's groupPlaceHolders with the group infomation
    .populate({
      path: "groups",
      populate: {
        path: "group_ID",
        model: "group",
      },
    })
    .then((user) => {
      if (!user) throw "No User Found";
      //We found a user
      // console.log(user);

      //Now for each group....
      user.groups.forEach((g) => {
        const group = g.group_ID;
        // Find the user's coresponding groupMember object
        const member = group.findMemberByUser_ID(user_ID);
        // .filter((mem) => user_ID == mem.user_ID)[0];
        // console.log(member);
        //Find all chores assigned to the found member
        // console.log(group.group_chores);
        let memberChores = group.getChoresForMember(member);
        memberChores = group.populateChoreList(memberChores);
        memberChores.forEach((chore) => ret.push(chore));
      });

      return cb ? cb(null, ret) : ret;
    })
    .catch((err) => cb(err, null));
};

const User = mongoose.model("user", UserSchema);
module.exports = User;
