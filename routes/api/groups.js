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
    group.findByIdAndUpdate(req.body._id, {
            group_name : req.body.group_name,
            group_admins : req.body.group_admins,
            group_description : req.body.group_description
        }, {
            new: true
        })
        .then(items => res.json(items))
        .catch(err => console.log(err));
});

// Route        POST api/groups
// Description  delete a group
// Access       Public
router.delete('/deleteGroup', (req, res) => {
    group.findById(req.params.id)
        .then(g => {
            let name = {
                "name" : g.group_name,
                "delete_success" : true
            }
            g.remove().then(() => res.json(name))
        })
        .catch(err => res.status(404).json({
            "error" : "Could not delete group"
        }));
});

// Route        POST api/groups/join
// Description  join a group
// Access       Public
router.post('/join', async (req, res) => {
    //Since the group needs to be added to the User aswell we need to find the user first
    //Find User
    var foundUser, foundGroup;
    try{
        [foundUser, foundGroup] = await Promise.all([user.findById(req.body.user_ID).exec(), group.findById(req.body.group_ID).exec()]);
    }catch(err){
        console.log(err);
        res.status(404).json(err);
        return
    }
    // We have found our user
   
    //Try to update data
    try{
        //Set up an error variable to be passed thorugh both update functions
        var error = '';
        //Update Group data
        foundGroup.addGroupMember(foundUser, (err) => {
            if(err) {
                console.log(err);
                error.concat((' ' + err));
            }
        })

        // foundGroup.group_members.push(newGroupMember)
        // foundGroup.group_member_count = foundGroup.group_members.length;

        //update the User's Group and send responce 
        foundUser.addGroup(foundGroup, (err) => {
            if(err) {
                console.log(err);
                error.concat((' ' + err))
            }
            res.json({
                user_groups: foundUser.groups,
                group: foundGroup.group_members,
                error: err
            })
        })
    }catch(err){
        console.log(err);
        res.status(404).json(err);
        return;
    }

    //Compose Response
});

module.exports = router;