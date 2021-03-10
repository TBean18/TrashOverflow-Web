// Set up routes for all group related end points.
const express = require("express");
const router = express.Router();

const group = require("../../models/group");

// Route        POST api/groups/
// Description  Create a new group
// Access       Public
router.post('/createGroup', (req, res) => {
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
        .catch(err => console.log(err));
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

module.exports = router;