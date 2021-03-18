// Set up routes for all schedule related end points.
const express = require("express");
const router = express.Router();
const jwt = require('../../util/jwt');

const schedule = require("../../models/schedule");
const chore = require("../../models/chore");

// create schedule
router.post('/createSchedule', (req, res) => {
    // TODO: possibly make this admin only priviledges.

    // Search the database for the chore.
    chore.findById(req.body._id)
        .then(c => {
            // Create empty json payload. Only add stuff to schedule 
            // if the user enters it.
            const payload = {};
            if (req.body.hasOwnProperty("schedule_due_date"))
                payload["schedule_due_date"] = req.body["schedule_due_date"];
            if (req.body.hasOwnProperty("schedule_user_rotation_type"))
                payload["schedule_user_rotation_type"] = req.body["schedule_user_rotation_type"];
            
            // This may need to change depending on how the data gets sent from backend. 
            if (req.body.hasOwnProperty("schedule_recurrence_type"))
                payload["schedule_recurrence_type"] = req.body["schedule_recurrence_type"];

            const newSched = new schedule(payload);
            // FIXME: do we save this in schedule or chore?
            newSched.save()
                .then(item => res.json(item));
                .catch(err => {
                    console.log(err);
                    res.json({error: err});
                });
        })
        .catch(err => {
            console.log(err);
            res.json({error: err});
        })

});

// update schedule
router.post('/updateSchedule', (req, res) => {
    // TODO: possibly make this admin only priviledges. 


});