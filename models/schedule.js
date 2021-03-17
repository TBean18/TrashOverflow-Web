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
  const currentDate = new Date(this.schedule_due_date);
  switch(this.schedule_recurrence_type.reccurence_name){
    case 'DAILY':
      currentDate.setDate(currentDate.getDate() + 1);
      this.schedule_due_date = currentDate;
      break;
    case 'WEEKLY':
      currentDate.setDate(currentDate.getDate() + 7);
      this.schedule_due_date = currentDate;
      break;
    case 'MONTHLY':
      currentDate.setDate(currentDate.getDate() + 31);
      this.schedule_due_date = currentDate;
      break;
  }
  this.save(cb);
  return
}



const model = mongoose.model('schedule', ScheduleSchema)
module.exports = {model, ScheduleSchema}
