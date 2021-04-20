const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const GroupMember = require("./groupMember");
const Schedule = require("./schedule");
const Group = require("./group");

const ChoreSchema = new Schema({
  chore_assigned_user: {
    type: Schema.Types.ObjectID,
    ref: "groupMember",
    default: null,
  },
  chore_assigned_user_index: {
    type: Number,
    default: 0,
  },
  chore_user_pool: {
    type: [Schema.Types.ObjectID],
    ref: "groupMember",
    required: true,
    // default: [],
  },
  chore_name: {
    type: String,
    required: true,
  },
  chore_description: {
    type: String,
    default: "An Amazing Task",
  },
  // Accepted Options include: COMPLETED, LATE, TODO
  chore_completion_status: {
    type: String,
    default: "TODO",
  },
  chore_point_value: {
    type: Number,
    default: 0,
  },
  chore_schedule: Schedule.ScheduleSchema,
});

ChoreSchema.methods.rotateAssignedUser = function (save, cb) {
  console.log("WARNING: chore.rotateAssignedUser use is deprecated, please use group.rotateAssignedUser instead");
  //Set the assigned_user to the next user in the user_pool
  this.chore_assigned_user_index =
    (this.chore_assigned_user_index + 1) % this.chore_user_pool.length;
  this.chore_assigned_user = this.chore_user_pool[
    this.chore_assigned_user_index
  ];
  if (save) this.save(cb);
};

//Function Used to check the completion for a given chore
ChoreSchema.methods.checkCompletionStatus = function (cb) {

  console.log("WARNING: chore.checkCompletionStatus use is deprecated, please use group.checkCompletionStatus instead");

  const currentDate = new Date(this.chore_schedule.schedule_due_date);
  switch (this.chore_completion_status) {
    //The Chore has been completed
    // Check to see if the due_date has passed,
    // if so, then it reverts to 'TODO' and is passed to the next available user
    case "COMPLETED":
      if (Date.now() > currentDate) {
        //Due date has passed
        this.chore_completion_status = "TODO";
        //Passing true will save the document after assigning the new user
        this.rotateAssignedUser(true, cb);
      }
      break;
    // The Chore is waiting to be completed
    // Check to see if the due_date has passed,
    // if so, then it reverts to 'LATE'
    case "TODO":
      if (Date.now() > currentDate) {
        //Due date has passed
        this.chore_completion_status = "LATE";
        this.save(cb);
      }
      break;
    // If the Chore is late, then it will continue to be late
    // Until the next api/chores/complete call for the given chore
    case "LATE":
      return;
  }
  return;
};

// Removes a member from a chore and returns the updated user pool.
ChoreSchema.statics.removeMemberFromChore = function (member_ID, chore_ID) {
  return this.findByIdAndUpdate(
    { _id: chore_ID },
    { $pull: { chore_user_pool: { _id: member_ID } } },
    { new: true }
  ).exec();
};

// Assigns a user to a chore and returns the updated chore for saving.
ChoreSchema.methods.assignUser = function (member_ID) {
  // Make sure user is not already assigned to this chore.
  for (let i in this.chore_user_pool) {
    if (this.chore_user_pool[i] == member_ID)
      return { error: "User Is Already Assigned To This Chore" };
  }

  // Because this is a circular queue, we may have to add someone in the middle
  // of the array to add them at the end of the line.
  // The weird math for first splice param is to avoid getting a negative index.
  this.chore_user_pool.splice(
    // Place we are adding the user.
    (this.chore_assigned_user_index + this.chore_user_pool.length) %
      this.chore_user_pool.length,
    // Delete nobody.
    0,
    // Group member we are adding.
    member_ID
  );

  // Fix the assigned user back to what it was.
  this.chore_assigned_user_index =
    (this.chore_assigned_user_index + 1) % this.chore_user_pool.length;

  // Return updated chore.
  return this;
};

// Removes a user from a chore and returns the updated chore for saving.
ChoreSchema.methods.removeUser = function (member_ID) {
  // Make the the user is assigned to the chore.
  let personIndex = -1;
  for (let i in this.chore_user_pool) {
    if (this.chore_user_pool[i] == member_ID) {
      personIndex = i;
      break;
    }
  }

  // If they are not assigned to this chore.
  if (personIndex === -1) {
    return {
      error: "The User You Were Trying to Remove Is Not Assigned to This Chore",
    };
  }
  // If they are the person who is supposed to do the job, rotate.
  if (personIndex == this.chore_assigned_user_index) {
    this.rotateAssignedUser(true, (err) => {
      return { error: err };
    });
  }

  // Remove the person.
  this.chore_user_pool.splice(personIndex, 1);

  // If the person we are removing has a lower index than the person assigned,
  // it messes up the queue, so fix it.
  if (personIndex <= this.chore_assigned_user_index)
    this.chore_assigned_user_index -= 1;

  // Return the updated chore.
  return this;
};

//Chore static function used to find a chore with a populated groupMember
// Callback Structure cb(Error, Chore)
ChoreSchema.statics.findChore = function (chore_ID, cb) {
  this.findById(chore_ID)
    .populate("groupMember")
    .then((chore) => cb(null, chore))
    .catch((err) => cb(err, null));
};

const model = mongoose.model("chore", ChoreSchema);
module.exports = { model, ChoreSchema };
