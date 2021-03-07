const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const GroupMember = require('./groupMember');

function validateReccurenceType(t){
  const legalVals = new Set(['daily', 'weekly', 'monthly']);
  return legalVals.has(t);
}
const recurrenceValidator = [validateReccurenceType, '{PATH} does not support value of {VALUE}']

const ScheduleSchema = new Schema({
  schedule_due_date: Date,
  schedule_user_rotation_type: {
    type: String,
    default: 'iterate'
  },
  schedule_recurrence_type: {
    type: String,
    default: 'weekly',
    validator: recurrenceValidator
  },
  date_created:{
    type: Date,
    default: Date.now
  }

})



const model = mongoose.model('schedule', ScheduleSchema)
module.exports = {model, ScheduleSchema}
