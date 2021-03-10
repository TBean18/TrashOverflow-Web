// Set up routes for all group related end points.
const express = require("express");
const router = express.Router();

const group = require("../../models/group");

// Route        POST api/groups/
// Description  Create a new group
// Access       Public
router.post('/createGroup', (req, res) => {
    // Create new payload.
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

module.exports = router;