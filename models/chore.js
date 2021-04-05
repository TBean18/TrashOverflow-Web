const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const GroupMember = require("./groupMember");
const Schedule = require("./schedule");
const Group = require("./group");

const ChoreSchema = new Schema({
  chore_assigned_user: {
    type: Schema.Types.ObjectID,
    ref: "groupMember",
    required: true,
  },
  chore_assigned_user_index: {
    type: Number,
    default: 0,
  },
  chore_user_pool: {
    type: [Schema.Types.ObjectID],
    ref: "groupMember",
    required: true,
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
  },
  chore_schedule: Schedule.ScheduleSchema,
});

ChoreSchema.methods.rotateAssignedUser = function (save, cb) {
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
  const currentDate = new Date(this.chore_schedule.schedule_due_date);
  switch (this.chore_completion_status) {
    //The Chore has been completed
    // Check to see if the due_date has passed,
    // if so, then it reverts to 'TODO' and is passed to the next available user
    case "COMPLETED":
      if (Date.now > currentDate) {
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
      if (Date.now > currentDate) {
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

//Function used to return the list a user's chores
ChoreSchema.statics.getUserChoreList = function (user_ID, cb) {
  // Group.aggregate().match({
  //   "group_chores.chore_asssigned_member.user_ID": user_ID,
  // }).project({

  // })

  //https://stackoverflow.com/questions/16845191/mongoose-finding-subdocuments-by-criteria/28395234

  // https://stackoverflow.com/questions/30740932/mongoose-how-to-query-subdocument-by-property-value

  Group.find({ "group_chores.chore_asssigned_member.user_ID": user_ID })
    .then((g) => console.log(g))
    .catch((err) => console.log(err));
};

ChoreSchema.statics.findChore() = function (chore_ID, cb) {
  this.findById(chore_ID).then();
};

const model = mongoose.model("chore", ChoreSchema);
module.exports = { model, ChoreSchema };
