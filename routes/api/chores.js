// Set up routes for all group related end points.
const express = require("express");
const router = express.Router();
const jwt = require("../../util/jwt");

const group = require("../../models/group");
const user = require("../../models/user");
const { model } = require("../../models/chore");
const chore = model;
// Route        GET api/chores/
// Description  Get the Chore list for the given user
// Access       Private
// Description  Endpoint used ot return the chore list for a given user
//              Meaning, return an array of all chores for which the current user is the assigned group member
router.get("/user_chores", jwt.authenticateUser, (req, res) => {
  //TODO | Write this
  const user_ID = req.body.user_ID;
  //Each user has an array of groups
  try {
    user.getChoreList(user_ID, (err, ret) => {
      if (err)
        return res.status(404).json({
          error: err,
        });
      return res.json({
        chores: ret,
      });
    });
  } catch (err) {
    res.status(404).json({
      error: err,
    });
  }
  //
  // group.getGroupMemberArrayFromUser(user_ID);
  // chore.getUserChoreList(user_ID);
});

// Route        GET api/chores/:group_ID
// Description  Get the Chore list for a given group
// Access       Public
// Parameters
//      group_ID:   String - ID of group for which to return chore list
router.get("/:group_ID", jwt.authenticateUser, (req, res) => {
  //Do we need to verify the user on a chorelist lookup?
  const user_ID = req.body.user_ID;
  // Retrieve all chore objects from the given group_ID
  group
    .findById(req.params.group_ID)
    .then((foundGroup) => {
      //Get the groupmember for the user who made the request
      let groupMember = foundGroup.findMemberByUser_ID(user_ID);
      //Return the populated Chore list
      res.json({
        chores: foundGroup.populateChoreList(foundGroup.group_chores),
        groupMember,
        error: "",
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(404).json({
        error: "Unable to Retrieve Chore List for Group",
      });
    });
});

// Route                POST api/chores/
// Description          Adds a chore to the group.
// Access               Public I think
// Required Parameters
//      group_ID                The _id for the group adding the chore
//      chore_assigned_user:    GroupMember - The _id Group member currently assigned to the chore.
//      chore_user_pool:        [GroupMember] - Group members _ids that will rotate on this chore.
//      chore_name:             String - Name of the chore.
// Optional Parameters
//      chore_description:      String - Description of new chore
//      chore_point_value:      Number - Value of points this chore is worth completing
router.post("/add", jwt.authenticateUser, (req, res) => {
  const user_ID = req.body.user_ID;

  group
    .findById(req.body.group_ID)
    .then((g) => {
      if (!g) throw "No Group Found";

      // Verify Admin status of the user making the request
      let user_group_member = g.verifyAdmin(user_ID, (err, result) => {
        if (err)
          return res.status(404).json({
            error: err,
          });
        if (result) return result;
      });

      // Person to be assigned to the chore first and their index in the array.
      let assigned_person = req.body.chore_assigned_user;
      let assigned_index = req.body.chore_user_pool.indexOf(assigned_person);

      // If the intended assigned person was not in the user pool, put them at the end.
      if (assigned_index == -1) {
        req.body.chore_user_pool.push(assigned_person);
        assigned_index = req.body.chore_user_pool.length - 1;
      }

      // Create payload with required fields.
      const payload = {
        chore_assigned_user: assigned_person,
        chore_assigned_user_index: assigned_index,
        chore_user_pool: req.body.chore_user_pool,
        chore_name: req.body.chore_name,
      };

      // Check if non-required fields were filled out and add to payload.
      if (req.body.hasOwnProperty("chore_description"))
        payload["chore_description"] = req.body["chore_description"];
      if (req.body.hasOwnProperty("chore_point_value"))
        payload["chore_point_value"] = req.body["chore_point_value"];

      // Update the group by adding the new chore to the chore list.
      const newChore = new chore(payload);
      g.group_chores.push(newChore);
      g.save().then(
        res.json({
          chores: g.group_chores,
        })
      );
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        error: "Could Not Add Your New Chore",
      });
    });
});

// Route                DELETE api/chores/
// Desc                 Deletes the chore.
// Access               Public
// Parameters
//      chore_ID:     String - ID of the chore to be deleted
//      group_ID:     String - ID of the group
//      user_ID:      String - ID of the user trying to delete the chores
//      token:        String - Token to verify the user (Can be x-auth header instead)
router.post("/delete", jwt.authenticateUser, (req, res) => {
  group
    .findById(req.body.group_ID)
    .then(async (g) => {
      // Verify user is admin
      const adminMember = g.verifyAdmin(req.body.user_ID, (err, result) => {
        if (err)
          return res.status(401).json({
            error: err,
          });
        return result;
      });

      // Find the chore.
      let choreIndex = -1;
      for (let i in g.group_chores) {
        if (g.group_chores[i]._id == req.body.chore_ID) {
          choreIndex = i;
          break;
        }
      }

      // If we didn't find the chore.
      if (choreIndex === -1) {
        return res.status(404).json({
          error: "Could Not Remove Chore",
        });
      }

      // Remove all members from the chore. g.group_chores[choreIndex]
      for (let member of g.group_chores[choreIndex].chore_user_pool)
        chore.removeMemberFromChore(g.group_chores[choreIndex]._id, member._id);

      const chores = await group.removeChore(
        g._id,
        g.group_chores[choreIndex]._id
      );
      res.json({
        chores: chores,
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(404).json({
        error: "Could Not Delete Chore",
      });
    });
});

// Route        POST api/chores/edit
// Description  Edit chore (name, description, point value)
// Access       Public
// Parameters
//      user_ID:                  String - ID of admin editing chore
//      group_ID:                 String - ID of the group
//      chore_ID:                 String - ID of chore to be modified
//      chore_name:               String - Name of chore to be modified
//      chore_description:        String - Description of chore to be modified
//      chore_point_value:        Number - Point value of chore to be modified
router.post("/edit", jwt.authenticateUser, (req, res) => {
  group
    .findById(req.body.group_ID)
    .then(async (g) => {
      // Verify user is admin
      const adminMember = g.verifyAdmin(req.body.user_ID, (err, result) => {
        if (err)
          return res.status(401).json({
            error: "Permission Denied",
          });
        return result;
      });

      const updatedChore = await group.editChore(
        {
          group_ID: g._id,
          chore_ID: req.body.chore_ID,
        },
        {
          chore_name: req.body.chore_name,
          chore_description: req.body.chore_description,
          chore_point_value: req.body.chore_point_value,
        }
      );
      if (updatedChore == null) {
        return res.status(404).json({
          error: "Could Not Find Chore",
        });
      }

      res.json(updatedChore);
    })
    .catch((err) => {
      console.log(err);
      res.status(404).json({
        error: "Could Not Update Chore",
      });
    });
});

// Route                POST api/chores
// Desc                 Assigns a user to the chore queue.
// Access               Public
// Parameters
//      admin_user_ID:    String - ID of the group admin
//      member_ID:        String - Member ID of the user to be assigned to the chore
//      group_ID:         String - ID of the group
//      chore_ID:         String - ID of the chore
router.post("/assignUser", jwt.authenticateUser, (req, res) => {
  req.body.admin_user_ID = req.body.user_ID;
  const { chore_ID, member_ID } = req.body;

  group
    .findById(req.body.group_ID)
    .then(async (g) => {
      // Verify user is admin
      const adminMember = g.verifyAdmin(
        req.body.admin_user_ID,
        (err, result) => {
          if (err)
            return res.status(401).json({
              error: "Permission Denied",
            });
          return result;
        }
      );
      // Try to find the member object in the group by the given ID
      let member = g.group_members.id(member_ID);

      // If we did not find the user to be added.
      if (!member) {
        return res.status(404).json({
          error: "Could Not Find User in the Group",
        });
      }

      let foundChore = g.group_chores.id(chore_ID);

      // Did not find chore.
      if (!foundChore) {
        return res.status(404).json({
          error: "Could Not Find Chore",
        });
      }

      const updatedChore = foundChore.assignUser(req.body.member_ID);
      if (updatedChore.error) {
        return res.status(404).json({
          error: updatedChore.error,
        });
      }

      g.save().then(() => res.json(updatedChore));
    })
    .catch((err) => {
      console.log(err);
      res.status(404).json({
        error: "Could Not Assign User To Chore",
      });
    });
});

// Route                POST api/chores
// Desc                 Removes the user from the chore queue
// Access               Public
// Parameters
//      admin_user_ID:    String - ID of a group admin
//      member_ID:        String - Member ID of user to be removed from the chore
//      group_ID:         String - ID of the group
//      chore_ID:         String - ID of the chore
router.post("/removeUser", jwt.authenticateUser, (req, res) => {
  group
    .findById(req.body.group_ID)
    .then((g) => {
      // Verify user is admin
      const adminMember = g.verifyAdmin(
        req.body.admin_user_ID,
        (err, result) => {
          if (err)
            return res.status(401).json({
              error: "Permission Denied",
            });
          return result;
        }
      );

      // Check if user is in the group.
      let personIndex = -1;
      for (let i in g.group_members) {
        if (g.group_members[i]._id == req.body.member_ID) {
          personIndex = i;
          break;
        }
      }

      // If we did not find the user to be removed.
      if (personIndex === -1) {
        return res.status(404).json({
          error: "Could Not Find User in the Group",
        });
      }

      // Find Chore.
      let choreIndex = -1;
      for (let i in g.group_chores) {
        if (g.group_chores[i]._id == req.body.chore_ID) {
          choreIndex = i;
          break;
        }
      }

      // Did not find chore.
      if (choreIndex === -1) {
        return res.status(404).json({
          error: "Could Not Find Chore",
        });
      }

      const updatedChore = g.group_chores[choreIndex].removeUser(
        req.body.member_ID
      );
      if (updatedChore.error) {
        return res.status(404).json({
          error: updatedChore.error,
        });
      }

      g.save(updatedChore).then(() => res.json(updatedChore));
    })
    .catch((err) => {
      console.log(err);
      res.status(404).json({
        error: "Could Not Remove the User",
      });
    });
});

// Router               POST api/chores/complete
// Description          This endpoint will be hit when a user completes their chore.
// Access               Public
// Parameters
//      group_ID:     String - ID of the group
//      chore_ID:     String - ID of the chore
router.post("/complete", jwt.authenticateUser, (req, res) => {
  group
    .findById(req.body.group_ID)
    .then((g) => {
      let choreIndex = -1;
      for (let i in g.group_chores) {
        if (g.group_chores[i]._id == req.body.chore_ID) {
          choreIndex = i;
          break;
        }
      }

      if (choreIndex === -1) {
        return res.status(404).json({
          error: "Could Not Find Chore",
        });
      }

      g.group_chores[choreIndex].chore_completion_status = "COMPLETED";
      g.rotateAssignedUser(choreIndex, false);
      g.save().then(() => res.json(g.group_chores[choreIndex]));
    })
    .catch((err) => {
      console.log(err);
      res.status(404).json({
        error: "Could Not Mark the Chore as Complete",
      });
    });
});

// Route                POST api/chores
// Description          Update user chore queue
//                      This endpoint will get hit when a user skips because of points.
// Access               Public
// Parameters
//      group_ID    String - ID of the group
//      chore_ID:   String - ID of chore
router.post("/updatePool", jwt.authenticateUser, (req, res) => {
  group
    .findById(req.body.group_ID)
    .then((g) => {
      let choreIndex = -1;
      for (let i in g.group_chores) {
        if (g.group_chores[i]._id == req.body.chore_ID) {
          choreIndex = i;
          break;
        }
      }

      if (choreIndex === -1) {
        return res.status(404).json({
          error: "Could Not Find Chore",
        });
      }

      // g.group_chores[choreIndex].rotateAssignedUser(true);
      g.rotateAssignedUser(choreIndex, true);

      res.json(g.group_chores[choreIndex]);
    })
    .catch((err) => {
      console.log(err);
      res.status(404).json({
        error: "Unable to Update User Chore Pool",
      });
    });
});

// Route                POST api/chores
// Description          Updates the chore status and rotates the user if chore is finished.
//                      READ THIS: Take this logic and move it to the group.save()
// Access               Public
// Parameters
//      group_ID:     String - ID of the group
//      chore_ID:     String - ID of the chore that will have to status updated
router.post("/updateStatus", jwt.authenticateUser, (req, res) => {
  group
    .findById(req.body.group_ID)
    .then((g) => {
      let choreIndex = -1;
      for (let i in g.group_chores) {
        if (g.group_chores[i]._id == req.body.chore_ID) {
          choreIndex = i;
          break;
        }
      }

      if (choreIndex === -1) {
        return res.status(404).json({
          error: "Could Not Find Chore",
        });
      }

      g.checkCompletionStatus(choreIndex);
      res.json(g.group_chores[choreIndex]);
    })
    .catch((err) => {
      console.log(err);
      res.status(404).json({
        error: "Could Not Update the Chore Status",
      });
    });
});

module.exports = router;
