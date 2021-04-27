// Set up routes for all group related end points.
const express = require("express");
const router = express.Router();
const jwt = require("../../util/jwt");

const groupPlaceHolder = require("../../models/groupPlaceHolder");
const group = require("../../models/group");
const user = require("../../models/user");
const { json } = require("body-parser");

// Route        GET api/groups/
// Description  Get all Groups for the given user
// Access       Public
// Parameters
//      user_ID:    String - ID of user for which to return their groups
router.post("/", jwt.authenticateUser, (req, res) => {
  //Find the user and the groups for that user
  user
    .findById(req.body.user_ID)
    //Populate the users groups aswell
    .populate({
      path: "groups",
      populate: {
        path: "group_ID",
        model: "group",
      },
    })
    .then((curUser) => {
      let groups = curUser.getGroup_IDArray();
      res.json({
        groups,
        error: "",
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(401).json({
        error: "Permission Denied",
      });
    });
});

// Route        POST api/groups/new
// Description  Create a new group
// Access       Public
// Parameters
//      user_ID:            String - ID of user/creator of new group
//      group_name:         String - Name of new group
//      group_description:  String - Description of new group
router.post("/new", jwt.authenticateUser, async (req, res) => {
  //Find the user
  const creator = await user.findById(req.body.user_ID).exec();

  // Create new payload. Only add description and chore list
  // if the items were filled out.
  const payload = {
    group_name: req.body.group_name,
    group_members: [],
    group_description: req.body.group_description,
    group_chore_list: [],
  };

  // Make the new group with the payload created and save to db.
  const newGroup = new group(payload);
  newGroup
    .save()
    .then((item) => {
      //Once the group is saved we need to add it to the creator's group list
      creator.addGroup(item);
      //Add the Creator as a group Member (Admin)
      item.addGroupMember(creator, false);
      item.promoteGroupMember(req.body.user_ID, true);

      res.json(item);
    })
    .catch((err) => {
      console.log(`groups/new -  ${err}`);
      res.status(401).json({
        error: "Permission Denied",
      });
    });
});

// Route        POST api/groups
// Description  Edit a group
// Access       Public
// Parameters
//      group_ID:                String - ID of group to be modified
//      group_name:         String - Modified name of group
//      group_description:  String - Modified description of group
router.post("/editGroup", jwt.authenticateUser, (req, res) => {
  const { group_ID, group_name, group_description } = req.body;

  group
    .findById(group_ID)
    .then((g) => {
      g.group_name = group_name;
      g.group_description = group_description;
      g.save().then((g) => res.json({ g }));
    })
    .catch((err) => {
      console.log(err);
      res.status(401).json({
        error: "Permission Denied",
      });
    });
});

// Route        POST api/groups/delete
// Description  delete a group
// Access       Public
// Parameters
//      _id:     String - ID of group to be deleted
//      user_ID: String - ID of the person deleting the group
router.post("/delete", jwt.authenticateUser, (req, res) => {
  group
    .findById(req.body._id)
    .then(async (g) => {
      // Make sure user is admin in group.
      for (let i = 0; i < g.group_members.length; i++) {
        if (g.group_members[i].user_ID == req.body.user_ID) {
          if (g.group_members[i].admin) break;

          res.status(401).json({
            error: "Permission Denied",
          });
          return;
        }
      }

      for (let member of g.group_members) {
        await user.leaveGroup(member.user_ID, g._id);
      }

      g.remove().then(() => {
        res.json({
          name: g.group_name,
          delete_success: true,
        });
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(404).json({
        error: "Could Not Find Group",
      });
    });
});

// Route        POST api/groups/join
// Description  Endpoint hit when a user wants to join an existing group
// Access       Public
// Parameters
//      user_ID:    String - ID of current user
//      group_ID:   String - ID of group to join
router.post("/join", jwt.authenticateUser, async (req, res) => {
  //Since the group needs to be added to the User aswell we need to find the user first
  //Find User
  var foundUser, foundGroup;
  try {
    // foundUser = await user.findById(req.body.user_ID).exec();
    // foundGroup = await group.findById(req.body.group_ID).exec();
    [foundUser, foundGroup] = await Promise.all([
      user.findById(req.body.user_ID).exec(),
      group.findById(req.body.group_ID).exec(),
    ]);
  } catch (err) {
    console.log(err);
    res.status(404).json({
      error: "There Was An Issue Joining You With the Group",
    });
    return;
  }
  // We have found our user

  console.log(foundGroup);

  //Try to update data
  try {
    //Set up an error variable to be passed through both update functions
    var error = "";
    //Update Group data
    foundGroup.addGroupMember(foundUser, (err) => {
      if (err) {
        console.log(err);
        error.concat(err + "; ");
      }
    });

    //update the User's Group and send response
    foundUser.addGroup(foundGroup, (err) => {
      if (err) {
        console.log(err);
        error.concat(err + "; ");
      }
      res.json({
        user_groups: foundUser.groups,
        group: foundGroup.group_members,
        error: err,
      });
    });

    if (error !== "") throw error;
  } catch (err) {
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
router.post("/removeUser", jwt.authenticateUser, async (req, res) => {
  const { user_ID, group_ID, member_ID } = req.body;
  const admin_user_ID = user_ID;
  // find group
  var foundGroup;
  try {
    foundGroup = await group.findById(group_ID).exec();
  } catch (err) {
    console.log({
      err,
    });
    res.status(401).json({
      error: "Permission Denied",
    });
    return;
  }

  // find the relevant groupmembers
  let foundGroupAdmin = foundGroup.findMemberByUser_ID(admin_user_ID);
  if (!foundGroupAdmin)
    return res.status(404).json({
      error: foundGroup.ERROR_MEMBER(admin_user_ID),
    });
  // check if current user is an admin
  if (!foundGroupAdmin.admin)
    return res.status(404).json({
      error: foundGroup.ERROR_ADMIN(admin_user_ID),
    });

  let foundGroupMember = foundGroup.group_members.id(member_ID);
  if (!foundGroupMember)
    return res.status(404).json({
      error: foundGroup.ERROR_MEMBER(member_ID),
    });

  const member_user_ID = foundGroupMember.user_ID;

  // Added not in front of retval because on success it returns "", on failure it returns the error
  // remove group member and check if successful
  let removedMemberStatus = !foundGroup.removeGroupMember(member_ID);
  // TODO: turn error string into dedicated error method
  if (!removedMemberStatus)
    return res.status(404).json({
      error: "Could Not Remove Member From Group",
    });

  let leaveGroupStatus = await user.leaveGroup(member_user_ID, group_ID);
  // TODO: same as above
  if (!leaveGroupStatus)
    return res.status(404).json({
      error: "Could Not Remove User from Group",
    });

  // compose response
  // let groupArray = foundGroupMember.getGroup_IDArray();
  res.json({
    groups: leaveGroupStatus.groups,
    error: "",
  });
});

// Route        POST api/groups/leave
// Description  Endpoint hit when a user wants to leave a group they are already in
// Access       Public
// Parameters
//      user_ID:    String - ID of current user
//      group_ID:   String - ID of group to leave
router.post("/leave", jwt.authenticateUser, async (req, res) => {
  const { group_ID, user_ID } = req.body;

  // find group
  var foundGroup;
  try {
    foundGroup = await group.findById(group_ID).exec();
  } catch (err) {
    console.log(err);
    res.status(404).json({
      error: "Unable to remove you from Group",
    });
    return;
  }

  // find group Member
  let foundGroupMember = foundGroup.findMemberByUser_ID(user_ID);
  if (!foundGroupMember)
    return res.status(404).json({
      error: foundGroup.ERROR_MEMBER(user_ID),
    });

  // check if group is empty after removal
  let prevMemCount = foundGroup.group_members.length;

  // remove group member and check if successful
  let removedMemberError = foundGroup.removeGroupMember(foundGroupMember._id);
  if (removedMemberError)
    return res.status(404).json({
      error: removedMemberError,
    });

  // if group not empty after removal and removed user not an admin...
  if (prevMemCount !== 1 && foundGroupMember.admin) {
    // find admins in the group
    let admins = foundGroup.group_members.filter((mem) => mem.admin === true);
    // ...check to see if group is left w/ 0 admins
    if (admins.length < 1) {
      //promote the next group member
      try {
        foundGroup.promoteGroupMember(foundGroup.group_members[0].user_ID);
      } catch (err) {
        console.log(err);
      }
    }
  }

  // remove the group from the user's list and check if successful
  let updatedUser = await user.leaveGroup(user_ID, group_ID);
  if (!updatedUser)
    return res.status(404).json({
      error: "Could Not Remove/Leave Group From User",
    });

  // compose response
  res.json({
    error: "",
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
//      member_ID:        String - Member_ID of the user to be promoted
//      group_ID:         String - ID of group where demotion will take place
router.post("/promote", jwt.authenticateUser, async (req, res) => {
  const { user_ID, member_user_ID, group_ID, member_ID } = req.body;
  const admin_user_ID = user_ID;
  // find group
  var foundGroup;
  try {
    foundGroup = await group.findById(group_ID).exec();
  } catch (err) {
    console.log({
      err,
    });
    res.status(401).json({
      error: "Permission Denied",
    });
    return;
  }

  // find the relevant groupmembers
  let foundGroupAdmin = foundGroup.findMemberByUser_ID(admin_user_ID);
  if (!foundGroupAdmin)
    return res.status(404).json({
      error: foundGroup.ERROR_MEMBER(admin_user_ID),
    });
  // check if current user is an admin
  if (!foundGroupAdmin.admin)
    return res.status(404).json({
      error: foundGroup.ERROR_ADMIN(admin_user_ID),
    });

  const foundMember = foundGroup.group_members.id(member_ID);

  // let foundGroupMember = foundGroup.findMemberByUser_ID(member_user_ID);
  if (!foundMember)
    return res.status(404).json({
      error: foundGroup.ERROR_MEMBER(member_ID),
    });

  // update group data and compose response
  let promoteMemberStatus = await foundGroup.promoteGroupMember(
    foundMember.user_ID,
    true
  );
  if (!promoteMemberStatus)
    return res.status(404).json({
      error: "Could Not Promote User",
    });
  res.json({
    member: foundMember,
    error: "",
  });
});

// Route        POST api/groups/demote
// Description  Endpoint hit when a admin wants to demote another admin or themself
// Access       Public
// Parameters
//      admin_user_ID:    String - ID of current user
//      member_user_ID:   String - ID of user to be demoted
//      group_ID:         String - ID of group where demotion will take place
router.post("/demote", jwt.authenticateUser, async (req, res) => {
  const { admin_user_ID, member_user_ID, group_ID } = req.body;

  // find group
  var foundGroup;
  try {
    foundGroup = await group.findById(group_ID).exec();
  } catch (err) {
    console.log({
      err,
    });
    res.status(401).json({
      error: "Permission Denied",
    });
    return;
  }

  // find the relevant groupmembers
  let foundGroupAdmin = foundGroup.findMemberByUser_ID(admin_user_ID);
  if (!foundGroupAdmin)
    return res.status(404).json({
      error: foundGroup.ERROR_MEMBER(admin_user_ID),
    });
  // check if current user is an admin
  if (!foundGroupAdmin.admin)
    return res.status(404).json({
      error: foundGroup.ERROR_ADMIN(admin_user_ID),
    });

  let foundGroupMember = foundGroup.findMemberByUser_ID(member_user_ID);
  if (!foundGroupMember)
    return res.status(404).json({
      error: foundGroup.ERROR_MEMBER(member_user_ID),
    });

  // update group data and compose response
  let promoteMemberStatus = await foundGroup.demoteGroupMember(member_user_ID);
  if (!promoteMemberStatus)
    return res.status(404).json({
      error: "Could Not Promote User",
    });
  res.json({
    member: foundGroupMember,
    error: "",
  });
});

// Route        POST api/groups/demote
// Description  Endpoint hit when a admin wants to demote another admin or themself
// Access       Public
// Parameters
//      admin_user_ID:    String - ID of current user
//      member_user_ID:   String - ID of user to be demoted
//      group_ID:         String - ID of group where demotion will take place
router.get("/info/:group_ID", async (req, res) => {
  const group_ID = req.params.group_ID;

  // find group
  var foundGroup;
  try {
    foundGroup = await group.findById(group_ID).exec();
    // we have awaited finding the group we can now access the data
    res.json({
      group: {
        _id: foundGroup._id,
        group_name: foundGroup.group_name,
      },
    });
  } catch (err) {
    console.log({
      err,
    });
    res.status(401).json({
      error: "Permission Denied",
    });
    return;
  }
});

module.exports = router;
