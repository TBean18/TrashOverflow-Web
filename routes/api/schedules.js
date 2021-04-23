// Set up routes for all schedule related end points.
const express = require("express");
const router = express.Router();
const jwt = require("../../util/jwt");

const schedule = require("../../models/schedule");
const chore = require("../../models/chore");
const group = require("../../models/group");

// Route        POST api/schedules/
// Description  Creates a new schedule and links it to a chore.
// Access       Public
// Required Parameters
//      user_ID:                      String - user id of the group admin
//      group_ID:                     String - ID of the group
//      chore_ID:                     String - ID of the chore
//      schedule_due_date:            Date - Date chore is due
// Optional Parameters
//      schedule_recurrence_type:     reccurenceSchema - How often the chore repeats
router.post("/create", jwt.authenticateUser, (req, res) => {
  group
    .findById(req.body.group_ID)
    .then((g) => {
      // Make sure user is admin.
      const adminMember = g.verifyAdmin(req.body.user_ID, (err, result) => {
        if (err) return false;
        return result;
      });

      if (!adminMember)
        return res.status(401).json({ error: "Permission Denied" });

      // Look for chore.
      let choreIndex = -1;
      for (let i in g.group_chores) {
        if (g.group_chores[i]._id == req.body.chore_ID) {
          choreIndex = i;
          break;
        }
      }
      // If we could not find the chore.
      if (choreIndex === -1) {
        return res.status(404).json({
          error: "Could Not Find Chore",
        });
      }

      // If there is already a schedule, don't let them make another.
      if (g.group_chores[choreIndex].chore_schedule) {
        return res.status(404).json({
          error: "You Already Have a Schedule Set for This Chore",
        });
      }

      // Create the schedule object.
      const payload = {
        schedule_due_date: new Date(req.body.schedule_due_date),
        schedule_recurrence_type: req.body.schedule_recurrence_type || {
          reccurence_name: "WEEKLY",
          reccurence_days: 7,
        },
      };

      // Update the group chore with the new schedule.
      g.group_chores[choreIndex].chore_schedule = payload;
      g.save().then(() => res.json({ chores: g.group_chores }));
    })
    .catch((err) => {
      console.log(err);
      res.status(404).json({
        error: "Could Not Create Schedule",
      });
    });
});

// Route        POST api/schedules/
// Description  Updates the schedule.
// Access       Public
// Required Parameters
//      user_ID:                        String - ID of the group admin editing the schedule
//      group_ID:                       String - ID of the group
//      chore_ID:                       String - ID of the chore
// Optional Parameters
//      schedule_due_date:              Date - new date chore needs to be finished by
//      schedule_recurrence_type:       recurrenceSchema - new recurrence for chore
router.post("/edit", jwt.authenticateUser, (req, res) => {
  group
    .findById(req.body.group_ID)
    .then(async (g) => {
      // Make sure user is admin.
      const adminMember = g.verifyAdmin(req.body.user_ID, (err, result) => {
        if (err) return false;
        return result;
      });

      if (!adminMember)
        return res.status(401).json({ error: "Permission Denied" });

      // Look for chore.
      let choreIndex = -1;
      for (let i in g.group_chores) {
        if (g.group_chores[i]._id == req.body.chore_ID) {
          choreIndex = i;
          break;
        }
      }
      // If we could not find the chore.
      if (choreIndex === -1) {
        return res.status(404).json({
          error: "Could Not Find Chore",
        });
      }

      if (!g.group_chores[choreIndex].chore_schedule) {
        return res.status(404).json({
          error: "Please Create a Chore Schedule",
        });
      }

      const payload = g.group_chores[choreIndex].chore_schedule;
      if (req.body.hasOwnProperty("schedule_due_date"))
        payload.schedule_due_date = req.body.schedule_due_date;
      if (req.body.hasOwnProperty("schedule_recurrence_type"))
        payload.schedule_recurrence_type = req.body.schedule_recurrence_type;

      g.save(payload).then(() => res.json(g.group_chores[choreIndex]));
    })
    .catch((err) => {
      console.log(err);
      res.status(404).json({
        error: "Could Not Update Chore Schedule",
      });
    });
});

module.exports = router;
