// Set up routes for all group related end points.
const express = require("express");
const router = express.Router();
const jwt = require('../../util/jwt')

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
router.delete('/:id', (req, res) => {
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
// Description  Endpoint hit when a user wants to join an existing group
// Access       Public
router.post('/join', async (req, res) => {
    //Verify that the supplied user_id is the same as the user_id on the token
    try{
        jwt.verifyID(req.body.token, req.body.user_ID)
    }catch(err){
        console.log({err});
        res.status(401).json({error: err});
        return
    }

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
});


// Route        POST api/groups/removeUser
// Description  Endpoint hit when a admin wants to remove a user from the group
// Access       Public
router.post('/removeUser', async (req, res) => {
    //Verify that the supplied user_id is the same as the user_id on the token
    try{
        jwt.verifyID(req.body.token, req.body.admin_user_ID)
    }catch(err){
        console.log({err});
        res.status(401).json({error: err});
        return
    }

    //Find Group
    var foundGroup;
    try{
        foundGroup = group.findById(req.body.group_ID).exec();
    }catch(err){
        console.log({err});
        res.status(401).json({error: err});
        return
    }

    //Find the relevant groupmembers
    var foundAdmin, foundUser;
    try{
        //Find the relevant group Members
        //let results = foundGroup.group_members.filter(member => (member.user_ID == req.body.admin_user_ID ||
        //                                                         member.user_ID == req.body.group_member_ID));

        //Set the vars
        foundAdmin = foundGroup.verifyAdmin(req.body.admin_user_ID, (err) => {
            if(err) {
                console.log(err);
                error += err + ' '
            }
        });
        foundUser = foundGroup.verifyUser(req.body.group_member_ID, (err) => {
            if(err) {
                console.log(err);
                error += err + ' '
            }
        });

        //Verify User Info
        if(foundAdmin == '') throw `Admin user not found for (Group: ${req.body.group_ID}) or is not an Admin`;
        //if(foundAdmin.admin !== true) throw `${foundAdmin.user_name}: Is not an Admin for Group: ${req.body.group_ID}`;
        if(foundUser == '') throw `${req.body.group_member_ID}: Is not a member for Group: ${req.body.group_ID}`;

    }catch(err){
        console.log(err);
        res.status(404).json(err);
        return
    }

    //Try to update data
    try{
        //Set up an error variable to be passed thorugh both update functions
        var error = '';
        //Update Group data
        foundGroup.removeGroupMember(req.body.group_member_ID, (err) => {
            if(err) {
                console.log(err);
                error += err + ' '
            }
        });

        //update the User's Group and send responce
        foundUser.leaveGroup(req.body.group_place_holder_ID, (err) => {
            if(err) {
                console.log(err);
                error += err + ' '
            }
            res.json({
                user_groups: foundUser.groups,
                group: {
                    name: foundGroup.group_name,
                    members: foundGroup.group_members
                },
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

// Route        POST api/groups/leave
// Description  Endpoint hit when a user wants to leave a group they are already in
// Access       Public
router.post('/leave', async (req, res) => {
    //Verify that the supplied user_id is the same as the user_id on the token
    try{
        jwt.verifyID(req.body.token, req.body.user_ID)
    }catch(err){
        console.log({err});
        res.status(401).json({error: err});
        return
    }

    //Locate data objects
    var foundUser, foundGroup;
    try{
        [foundUser, foundGroup] = await Promise.all([user.findById(req.body.user_ID).exec(), group.findById(req.body.group_ID).exec()]);
    }catch(err){
        console.log(err);
        res.status(404).json(err);
        return
    }

    //Try to update data
    try{
        //Set up an error variable to be passed thorugh both update functions
        var error = '';

        let groupUser = foundGroup.group_members.filter(mem => (mem.user_ID == req.body.user_ID));
        let admins = foundGroup.group_members.filter(mem => (mem.admin === true));
        // We need to randomly promote a user to admin before removing this one as they are the last admin
        if (groupUser.admin === true && admins.length === 1) {
            // TODO: Call /promote endpoint from here??
        }
        // Else user is not an admin, so we can remove without further consideration

        //Update Group data
        foundGroup.removeGroupMember(req.body.group_member_ID, (err) => {
            if(err) {
                console.log(err);
                error += err + ' '
            }
        });

        //update the User's Group and send responce
        foundUser.leaveGroup(req.body.group_place_holder_ID, (err) => {
            if(err) {
                console.log(err);
                error += err + ' '
            }
            res.json({
                user_groups: foundUser.groups,
                group: {
                    name: foundGroup.group_name,
                    members: foundGroup.group_members
                },
                error: err
            })
        })

    }catch(err){
        console.log(err);
        res.status(404).json(err);
        return;
    }
});

// Route        POST api/groups/promote
// Description  Endpoint hit when a admin wants to promote another user to admin
// Access       Public
router.post('/promote', async (req, res) => {
    //Verify that the supplied user_id is the same as the user_id on the token
    try{
        jwt.verifyID(req.body.token, req.body.user_ID)
    }catch(err){
        console.log({err});
        res.status(401).json({error: err});
        return
    }

    //Find Group
    var foundGroup;
    try{
        foundGroup = group.findById(req.body.group_ID).exec();
    }catch(err){
        console.log({err});
        res.status(401).json({error: err});
        return
    }

    //Find the relevant groupmembers
    var foundAdmin, foundUser, foundGroup;
    try{
        let results = foundGroup.group_members.filter(member => (member.user_ID == req.body.admin_user_ID ||
                                                                 member.user_ID == req.body.group_member_ID));

        //Set the vars
        foundAdmin = results.filter(mem => member.user_ID == req.body.admin_user_ID);
        foundUser = results.filter(mem => member.user_ID == req.body.group_member_ID) || '';

        //Verify User Info
        if(foundAdmin == '') throw `Admin user not found for Group: ${req.body.group_ID}`;
        if(foundAdmin.admin !== true) throw `${foundAdmin.user_name}: Is not an Admin for Group: ${req.body.group_ID}`;
        if(foundUser == '') throw `${req.body.group_member_ID}: Is not a member for Group: ${req.body.group_ID}`;

    }catch(err){
        console.log(err);
        res.status(404).json(err);
        return
    }

    //Try to update data
    try{
        //Set up an error variable to be passed thorugh both update functions
        var error = '';
        //Update Group data
        foundGroup.promoteGroupMember(foundUser, (err) => {
            if(err) {
                console.log(err);
                error.concat((' ' + err));
            }
        })

        //update the User's Group and send response
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
});

// Route        POST api/groups/promote
// Description  Endpoint hit when a admin wants to demote another admin or themself
// Access       Public
router.post('/demote', async (req, res) => {
    //Verify that the supplied user_id is the same as the user_id on the token
    try{
        jwt.verifyID(req.body.token, req.body.user_ID)
    }catch(err){
        console.log({err});
        res.status(401).json({error: err});
        return
    }

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
        foundGroup.demoteGroupMember(foundUser, (err) => {
            if(err) {
                console.log(err);
                error.concat((' ' + err));
            }
        })

        //update the User's Group and send response
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
});

module.exports = router;