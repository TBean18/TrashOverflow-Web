//SET UP THE ROUTES FOR ALL USER RELATED API ENDPOINTS
const express = require('express');
const router = express.Router();

//Item Model
const user = require('../../models/user');

// ROUTE    GET api/users
// DESC     GET All Users
// ACCESS   Public
router.get('/', (req, res) => {
    user.find()
        .then(items => res.json(items))
        .catch(err => console.log(err))
});

// ROUTE    POST api/users
// DESC     ADD A new User
// ACCESS   Public
router.post('/', (req, res) => {
    const newUser = new user({
        name: req.body.name,
        password_hash: req.body.password_hash,
        phone_number: req.body.phone_number,
        email: req.body.email.toLowerCase()
    });

    newUser.save()
        .then( item => res.json(item))
        .catch(err => console.log(err))

});


module.exports = router;