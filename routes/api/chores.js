// Set up routes for all group related end points.
const express = require("express");
const router = express.Router();
const jwt = require('../../util/jwt')

const group = require('../../models/group');
const user = require('../../models/user');
const chore = require('../../models/chore');

// Route        GET api/chores/:group_ID
// Description  Get the Chore list for a given group
// Access       Public
router.get('/:group_ID', (req, res) => {
    //Do we need to verify the user on a chorelist lookup?

    // Retrieve all chore objects from the given group_ID
    group.findById(req.params.group_ID)
        .then(foundGroup => {
            res.json({
                chores: foundGroup.chores,
                error: ''
            })
        })
        .catch(err => {
            console.log(err);
            res.status(404).json({error: err})
        })
});

// Route        POST api/chores/
// Description  Adds a chore to the group. 
// Access       Public I think
router.post('/add', (req, res) => {
    // TODO: make sure user is admin.

    group.findById(req.bodyParser._id)
        .then(g => {
            // Create payload with required fields.
            const payload = {
                chore_assigned_user: req.body.chore_assigned_user,
                chore_assigned_user_index: req.body.chore_assigned_user_index,
                chore_user_pool: req.body.chore,
                chore_name: req.body.chore_name    
            };
            
            // Check if non-required fields were filled out and add to payload. 
            if (req.body.hasOwnProperty("chore_description"))
                payload["chore_description"] = req.body["chore_description"];
            if (req.body.hasOwnProperty("chore_completion_status"))
                payload["chore_completion_status"] = req.body["chore_completion_status"];
            if (req.body.hasOwnProperty("chore_point_value"))
                payload["chore_point_value"] = req.body["chore_point_value"];
            if (req.body.hasOwnProperty("chore_schedule"))
                payload["chore_schedule"] = req.body["chore_schedule"];

            chore.save(payload)
                .then(item => {
                    // Add new chore to group chore list.
                    g.chore_list.push_back(item);
                    res.json(item);
                })
                .catch(err => {
                    console.log(err);
                    res.json({
                        error: err
                    });
                })
        })
        .catch(err => {
            console.log(err);
            res.json({
                error: err
            })
        })
});

// delete chore (and schedule)

// edit chore (name)

// assign user to chore queue

// remove user from chore queue

// update chore status
