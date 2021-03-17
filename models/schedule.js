const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const GroupMember = require('./groupMember');

function validateReccurenceType(t){
  const legalVals = new Set(['DAILY', 'WEEKLY', 'MONTHLY']);
  return legalVals.has(t.reccurence_name);
}
const recurrenceValidator = [validateReccurenceType, '{PATH} does not support value of {VALUE}']

const reccurenceSchema = new Schema({
  reccurence_name: String,
  reccurence_days: Number
})

const ScheduleSchema = new Schema({
  schedule_due_date: Date,
  schedule_user_rotation_type: {
    type: String,
    default: 'iterate'
  },
  schedule_recurrence_type: {
    type: reccurenceSchema,
    validator: recurrenceValidator
  },
  date_created:{
    type: Date,
    default: Date.now
  }

})

//Schema Functions ----------------------------------
//Function used to set the new due date based off of the reccurance_type property
ScheduleSchema.methods.setNewDueDate = function(cb){
  switch(this.schedule_recurrence_type.reccurence_name){
    case 'DAILY':
      this.schedule_due_date = this.schedule_due_date + 1;
      break;
    case 'WEEKLY':
      this.schedule_due_date = this.schedule_due_date + 7;
      break;
    case 'MONTHLY':
      this.schedule_due_date = this.schedule_due_date + 31;
      break;
  }
  this.save(cb);
  return
}



const model = mongoose.model('schedule', ScheduleSchema)
module.exports = {model, ScheduleSchema}
