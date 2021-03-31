// Set up routes for all group related end points.
const express = require("express");
const router = express.Router();
const jwt = require('../../util/jwt')

const group = require('../../models/group');
const user = require('../../models/user');

// Route        GET api/groups/
// Description  Get all Groups for the given user
// Access       Public
// Parameters   user_ID
router.post('/', jwt.authenticateUser, (req, res) => {

    //Find the user and the groups for that user
    user.findById(req.body.user_ID)
    //Populate the users groups aswell
    .populate({
        path: 'groups',
        populate:{
            path: 'group_ID',
            model: 'group'
        }
    })
    .then(curUser => {
        let groups = curUser.getGroup_IDArray();
        res.json({
            groups,
            error: ''
        })
    })
    .catch(err => {
        console.log(err);
        res.status(401).json({error: err});
    });

});

// Route        POST api/groups/new
// Description  Create a new group
// Access       Public
router.post('/new', jwt.authenticateUser, async (req, res) => {
    //Find the user 
    const creator = await user.findById(req.body.user_ID).exec();

    // Create new payload. Only add description and chore list
    // if the items were filled out.
    const payload = {
        group_name : req.body.group_name,
        group_members : [],
        group_description : req.body.group_description,
        group_chore_list : [],
    }

    // Make the new group with the payload created and save to db.
    const newGroup = new group(payload);
    newGroup.save()
        .then(item => {
            //Once the group is saved we need to add it to the creator's group list
            creator.addGroup(item);
            //Add the Creator as a group Member (Admin)
            item.addGroupMember(creator, false);
            item.promoteGroupMember(req.body.user_ID, true);

            res.json(item)
        })
        .catch(err => {
            console.log(err);
            res.status(401).json(err);
        });
});

// Route        POST api/groups
// Description  Edit a group
// Access       Public
router.post('/editGroup', jwt.authenticateUser, (req, res) => {
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
router.delete('/:id', jwt.authenticateUser, (req, res) => {
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
// Parameters
//      user_ID:    String - ID of current user
//      group_ID:   String - ID of group to join
router.post('/join', jwt.authenticateUser, async (req, res) => {
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
        //Set up an error variable to be passed through both update functions
        var error = '';
        //Update Group data
        foundGroup.addGroupMember(foundUser, (err) => {
            if(err) {
                console.log(err);
                error.concat((err + '; '));
            }
        })

        //update the User's Group and send response
        foundUser.addGroup(foundGroup, (err) => {
            if(err) {
                console.log(err);
                error.concat((err + '; '))
            }
            res.json({
                user_groups: foundUser.groups,
                group: foundGroup.group_members,
                error: err
            })
        })

        if (error !== '') throw error;
    }catch(err){
        console.log(err);
        res.status(404).json(err);
        return;
    }
});


// Route        POST api/groups/removeUser
// Description  Endpoint hit when a admin wants to remove a user from the group
// Access       Public
// Parameters
//      admin_user_ID:    String - ID of current user
//      member_user_ID:   String - ID of user to be demoted
//      group_ID:         String - ID of group where demotion will take place
router.post('/removeUser', jwt.authenticateUser, async (req, res) => {
    const {admin_user_ID, member_user_ID, group_ID} = req.body;

    // find group
    var foundGroup;
    try{
        foundGroup = group.findById(group_ID).exec();
    }catch(err){
        console.log({err});
        res.status(401).json({error: err});
        return;
    }

    // find the relevant groupmembers
    let foundGroupAdmin = foundGroup.findMemberByUser_ID(admin_user_ID);
    if(!foundGroupAdmin) return res.status(404).json({error: foundGroup.ERROR_MEMBER(admin_user_ID)});
    // check if current user is an admin
    if(!foundGroupAdmin.admin) return res.status(404).json({error: foundGroup.ERROR_ADMIN(admin_user_ID)});

    let foundGroupMember = foundGroup.findMemberByUser_ID(member_user_ID);
    if(!foundGroupMember) return res.status(404).json({error: foundGroup.ERROR_MEMBER(member_user_ID)});

    // remove group member and check if successful
    // TODO: afaik this doesn't return anything but would be nice if we start doing this for all our methods
    // instead of try/catch blocks
    let removedMemberStatus = foundGroup.removeGroupMember(foundGroupMember._id);
    // TODO: turn error string into dedicated error method
    if (!removedMemberStatus) return res.status(404).json({error: 'Could not remove member from group'});

    let leaveGroupStatus = await user.leaveGroup(member_user_ID, group_ID);
    // TODO: same as above
    if(!leaveGroupStatus) return res.status(404).json({error: 'Could not remove/leave group from user'});

    // compose response
    let groupArray = updatedUser.getGroup_IDArray();
    res.json({
        groups: groupArray,
        error: ''
    });
});

// Route        POST api/groups/leave
// Description  Endpoint hit when a user wants to leave a group they are already in
// Access       Public
// Parameters
//      user_ID:    String - ID of current user
//      group_ID:   String - ID of group to leave
router.post('/leave', jwt.authenticateUser, async (req, res) => {
    const {group_ID, user_ID} = req.body;

    // find group
    var foundGroup;
    try{
        foundGroup = await group.findById(group_ID).exec();
    }catch(err){
        console.log(err);
        res.status(404).json({error: err});
        return
    }

    // find group Member
    let foundGroupMember = foundGroup.findMemberByUser_ID(user_ID)
    if(!foundGroupMember) return res.status(404).json({error: foundGroup.ERROR_MEMBER(user_ID)})

    // check if group is empty after removal
    let prevMemCount = foundGroup.group_members.length;

    // remove group member and check if successful
    let removedMemberError = foundGroup.removeGroupMember(foundGroupMember._id);
    if (removedMemberError) return res.status(404).json({error: removedMemberError});

    // if group not empty after removal and removed user not an admin...
    if(prevMemCount !== 1 && foundGroupMember.admin){
        // find admins in the group
        let admins = foundGroup.group_members.filter(mem => (mem.admin === true));
        // ...check to see if group is left w/ 0 admins
        if(admins.length < 1){
            //promote the next group member
            foundGroup.promoteGroupMember(foundGroup.group_members[0]._id);
        }
    }

    // remove the group from the user's list and check if successful
    let updatedUser = await user.leaveGroup(user_ID, group_ID);
    if(!updatedUser) return res.status(404).json({error: 'Could not remove/leave group from user'});

    // compose response
    let groupArray = updatedUser.getGroup_IDArray();
    res.json({
        groups: groupArray,
        error: ''
    });
        // .then(foundUser => {
        // console.log(foundUser)
        // res.json({
        //     groups: foundUser.groups,
        //     error: 'test'
        // })
        // })
        // .catch(err => {
        //     console.log(err);
        //     res.status(404).json({error: err})
        // });

    // the group preSave function will take care of the empty group case
});

// TODO: Consolidate /promote and /demote into one?
// Route        POST api/groups/promote
// Description  Endpoint hit when a admin wants to promote another user to admin
// Access       Public
// Parameters
//      admin_user_ID:    String - ID of current user
//      member_user_ID:   String - ID of user to be demoted
//      group_ID:         String - ID of group where demotion will take place
router.post('/promote', jwt.authenticateUser, async (req, res) => {
    const {admin_user_ID, member_user_ID, group_ID} = req.body;

    // find group
    var foundGroup;
    try{
        foundGroup = group.findById(group_ID).exec();
    }catch(err){
        console.log({err});
        res.status(401).json({error: err});
        return;
    }

    // find the relevant groupmembers
    let foundGroupAdmin = foundGroup.findMemberByUser_ID(admin_user_ID);
    if(!foundGroupAdmin) return res.status(404).json({error: foundGroup.ERROR_MEMBER(admin_user_ID)});
    // check if current user is an admin
    if(!foundGroupAdmin.admin) return res.status(404).json({error: foundGroup.ERROR_ADMIN(admin_user_ID)});

    let foundGroupMember = foundGroup.findMemberByUser_ID(member_user_ID);
    if(!foundGroupMember) return res.status(404).json({error: foundGroup.ERROR_MEMBER(member_user_ID)});

    // update group data and compose response
    let promoteMemberStatus = await foundGroup.promoteGroupMember(foundGroupMember._id);
    if(!promoteMemberStatus) return res.status(404).json({error: 'Could not promote user'});
    res.json({
        // TODO: what else should go here?
        error: ''
    });
});

// Route        POST api/groups/demote
// Description  Endpoint hit when a admin wants to demote another admin or themself
// Access       Public
// Parameters
//      admin_user_ID:    String - ID of current user
//      member_user_ID:   String - ID of user to be demoted
//      group_ID:         String - ID of group where demotion will take place
router.post('/demote', jwt.authenticateUser, async (req, res) => {
    const {admin_user_ID, member_user_ID, group_ID} = req.body;

    // find group
    var foundGroup;
    try{
        foundGroup = group.findById(group_ID).exec();
    }catch(err){
        console.log({err});
        res.status(401).json({error: err});
        return;
    }

    // find the relevant groupmembers
    let foundGroupAdmin = foundGroup.findMemberByUser_ID(admin_user_ID);
    if(!foundGroupAdmin) return res.status(404).json({error: foundGroup.ERROR_MEMBER(admin_user_ID)});
    // check if current user is an admin
    if(!foundGroupAdmin.admin) return res.status(404).json({error: foundGroup.ERROR_ADMIN(admin_user_ID)});

    let foundGroupMember = foundGroup.findMemberByUser_ID(member_user_ID);
    if(!foundGroupMember) return res.status(404).json({error: foundGroup.ERROR_MEMBER(member_user_ID)});

    // update group data and compose response
    let promoteMemberStatus = await foundGroup.promoteGroupMember(foundGroupMember._id);
    if(!promoteMemberStatus) return res.status(404).json({error: 'Could not promote user'});
    res.json({
        // TODO: what else should go here?
        error: ''
    });
});

module.exports = router;