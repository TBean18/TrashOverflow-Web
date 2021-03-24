
// Set up routes for all schedule related end points.
const express = require("express");
const router = express.Router();
const jwt = require('../../util/jwt');

const schedule = require("../../models/schedule");
const chore = require("../../models/chore");

// Route        POST api/schedules/
// Description  Creates a new schedule and links it to a chore. 
// Access       Public
router.post('/create', (req, res) => {
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
            // Save the schedule into the database.
            newSched.save()
                .then(item => {
                    res.json(item);
                    // Link the schedule to the chore.
                    c.chore_schedule = newSched;
                })
            .catch(err => {
                console.log(err);
                res.json({
                    error: err
                });
            });
        })
        .catch(err => {
            console.log(err);
            res.json({
                error: err
            });
        })
});

// Route        POST api/schedules/
// Description  Updates the schedule. 
// Access       Public
// Note: This endpoints updates everything passed even if it is not actually different.
router.post('/edit', (req, res) => {
    // TODO: possibly make this admin only priviledges. 

    chore.findById(req.body._id)
        .then(c => {
            const payload = {};
            if (req.body.hasOwnProperty("schedule_due_date"))
                payload["schedule_due_date"] = req.body["schedule_due_date"];
            if (req.body.hasOwnProperty("schedule_user_rotation_type"))
                payload["schedule_user_rotation_type"] = req.body["schedule_user_rotation_type"];

            // This may need to change depending on how the data gets sent from backend. 
            if (req.body.hasOwnProperty("schedule_recurrence_type"))
                payload["schedule_recurrence_type"] = req.body["schedule_recurrence_type"];

            // Updates the chore schedule object associated with the chore found. 
            c.chore_schedule.update(playload)
                .then(item => res.json(item))
                .catch(err => {
                    console.log(err);
                    res.json({
                        error: err
                    });
                });
        })
        .catch(err => {
            console.log(err);
            res.json({
                error: err
            });
        });
});

// create schedule

// update schedule
module.export = router;