// SET UP THE ROUTES FOR ALL USER RELATED API ENDPOINTS
const express = require('express');
const router = express.Router();

// Item Model
const user = require('../../models/user');

// ROUTE    GET api/users
// DESC     GET All Users
// ACCESS   Public
router.get('/', (req, res) => {
    user.find()
        .then(items => res.json(items))
        .catch(err => console.log(err));
});

// ROUTE    POST api/users/register
// DESC     Register a user
// ACCESS   Public
router.post('/register', (req, res) => {
    const newUser = new user({
        name: req.body.name,
        password_hash: req.body.password_hash,
        phone_number: req.body.phone_number,
        email: req.body.email.toLowerCase()
    });

    newUser.save()
        .then(item => res.json(item))
        .catch(err => console.log(err));

});

// ROUTE    GET api/users/login
// DESC     GET Login User Info
// ACCESS   Public
router.get('/login', (req, res) => {
    user.find({
            email: req.body.email,
            password_hash: req.body.password_hash
        })
        .then(items => res.json(items))
        .catch(err => console.log(err));
});

// ROUTE    POST api/users/edit
// DESC     Change Login User Info 
// ACCESS   Public
router.post('/edit', (req, res) => {
    user.findByIdAndUpdate(req.body._id, {
            name: req.body.name,
            password_hash: req.body.password_hash,
            phone_number: req.body.phone_number,
            email: req.body.email.toLowerCase()
        }, {
            new: true
        })
        .then(items => res.json(items))
        .catch(err => console.log(err));
});

<<<<<<< HEAD
// ROUTE    
// DESC     
=======
// ROUTE    POST api/users/delete
// DESC     Deletes the users account
>>>>>>> 43379a000197c6f2bf61d666efed592c6172de12
// ACCESS   Public
router.post('/delete', (req, res) => {
    user.deleteOne({ _id : req.body._id })
        .then(() => console.log("User Deleted"))
        .catch(err => console.log(err));
});

module.exports = router;