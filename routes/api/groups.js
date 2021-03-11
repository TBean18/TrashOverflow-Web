// Set up routes for all group related end points.
const express = require("express");
const router = express.Router();

const group = require('../../models/group');
const user = require('../../models/user');

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

// Route        POST api/groups/join
// Description  join a group
// Access       Public
router.post('/join', async (req, res) => {
    //Since the group needs to be added to the User aswell we need to find the user first
    //Find User
    var foundUser;
    try{
        foundUser = await user.findById(req.body.user_ID).exec();
    }catch(err){
        console.log(err);
        // console.log('XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX')
        res.status(404).json(err);
        return
    }
    // We have found our user
    //Temp GroupMemeber data payload
    var newGroupMember = {
        user_ID: foundUser._id,
        user_name: foundUser.name
    }

    //Find the Group
    var foundGroup
    try{
        foundGroup = await group.findById(req.body.group_ID).exec()
    }catch(err) {
        console.log(err);
        res.status(404).json(err);
        return;
    }

    //Try to update data
    try{
        //Update Group data
        foundGroup.group_members.push(newGroupMember)
        foundGroup.group_member_count = foundGroup.group_members.length;

        //update the User's Group
        foundUser.addGroup(foundGroup, (err) => {
            if(err) console.log(err);
        })

         //Send Response
        foundGroup.save()
        .then(res.json({
            user: foundUser,
            group: foundGroup
        }))
        //Catch a failed groupSave
        .catch(err => {
            console.log(err);
            res.status(404).json(err);
        })
    }catch(err){
        console.log(err);
        res.status(404).json(err);
        return;
    }
});

module.exports = router;