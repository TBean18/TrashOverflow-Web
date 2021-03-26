// SET UP THE ROUTES FOR ALL USER RELATED API ENDPOINTS
const express = require('express');
const router = express.Router();

// Item Model
const user = require('../../models/user');

//JSON Web Token
const jwt = require('../../util/jwt')

// ROUTE                GET api/users
// DESC                 GET All Users
// ACCESS               Public
// Required Params      None
router.get('/', (req, res) => {
    user.find()
        .then(items => res.json(items))
        .catch(err => console.log(err));
});

// ROUTE                POST api/users/register
// DESC                 Register a user
// ACCESS               Public
// Required Params      
// ...............      name -> the name of the user
// ...............      password_hash -> the hashed password the user will use to log in
// ...............      phone_number -> the users phone number
// ...............      email -> the email the user will use to log in
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

// ROUTE                GET api/users/login
// DESC                 GET Login User Info
// ACCESS               Public
// Required Params     
// ...............      email -> the email the user is logging in with.
// ...............      password_hash -> the hashed password the user is logging in with. 
router.post('/login', (req, res) => {
    user.findOne({
            email: req.body.email,
            password_hash: req.body.password_hash
        })
        // Populates the user's groupPlaceHolders with the group infomation 
        .populate({
            path: 'groups',
            populate:{
                path: 'group_ID',
                model: 'group'
            }
        })
        .then(item => {
            let token = jwt.createToken({item});
            if(token.error !== '') throw token.error;
            let output = {
                user: item,
                token: token.accessToken,
                error: ''
            }
            res.json(output)
        })
        .catch(err => {
            console.log(err);
            res.status(404).json({error: err})
        });
});

// ROUTE                POST api/users/edit
// DESC                 Change Login User Info 
// ACCESS               Public
// Required Params
// ...............      _id (of the user)
// ...............      name -> what the users name will be changed to.
// ...............      password_hash -> the new password hash
// ...............      phone_number -> the new phone number
// ...............      email -> the new email
// Note: some of these fields may not be changed, but it may be easier to just overwrite them
// with the same thing. This can be changed if necessary.
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

// ROUTE                DELETE api/users/
// DESC                 Deletes the users account
// ACCESS               Public
// Required Params
// ...............      id (of the user)
// ...............      token (jwt)
router.delete('/:id/:token', (req, res) => {
    var email;
    user.findById(req.params.id)
        .then(item => {
            email = {"email": item.email, "delete_success": true};
            item.remove()
                .then(() => res.json(email))
        })
        .catch(err => res.status(404).json({error: "ID Not Found"}))
});

module.exports = router;