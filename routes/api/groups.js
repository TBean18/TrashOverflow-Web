// Set up routes for all group related end points.
const express = require("express");
const router = express.Router();

const group = require('../../models/group');

// Route        GET api/groups/
// Description  Get all Groups
// Access       Public
router.get('/', (req, res) => {
    // =Retrieve all group objects
    group.find()
        .then(items => res.json(items))
        .catch(err => {
            console.log(err);
            res.status(401).json(err);
        })
});

// Route        POST api/groups/new
// Description  Create a new group
// Access       Public
router.post('/new', (req, res) => {
    // Create new payload. Only add description and chore list
    // if the items were filled out.
    const payload = {
        group_name : req.body.group_name,
        group_members : req.body.group_members,
        group_admins : req.body.group_admins,
        group_member_count : req.body.group_members.length,
        group_description : req.body.group_description,
        group_chore_list : req.body.group_chore_list
    }

    // Make the new group with the payload created and save to db.
    const newGroup = new group(payload);
    newGroup.save()
        .then(item => res.json(item))
        .catch(err => {
            console.log(err);
            res.status(401).json(err);
        });
});

// Route        POST api/groups
// Description  Edit a group
// Access       Public
router.post('/editGroup', (req, res) => {

});

// Route        POST api/groups
// Description  delete a group
// Access       Public
router.delete('/deleteGroup', (req, res) => {

});


router.post('/join', (req, res) => {
    var newGroupMember = {
        user_ID: req.body.user_ID,
        user_name: req.body.user_name
    }
    group.findById(req.body.group_ID)
        .then(item => {
            item.group_members.push(newGroupMember)
            item.group_member_count = item.group_members.length;
            var groupName = item.group_name;
            var groupMembers = item.group_members;
            //Save the changes
            item.save()
                // Once save is complete send the res
                .then(res.json({
                    groupName,
                    groupMembers
                }))
                // Catch a failed save
                .catch(err => {
                    console.log(err);
                    res.status(401).json(err);
                })

        })
        //Catch a failed findByID
        .catch(err => {
            console.log(err);
            res.status(401).json(err);
        })
})
module.exports = router;