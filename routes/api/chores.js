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

