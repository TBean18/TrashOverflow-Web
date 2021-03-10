//Import NPM Packages
const express = require('express')
const mongoose = require('mongoose')

//Import Self-Defined Files
const secrets = require('./config/secrets')
const user = require('./routes/api/users')
const group = require('./routes/api/groups')

const app = express()

//Bodyparser
app.use(express.json())

//Connecting to DataBase
mongoose.connect(secrets.mongoURI, {useNewUrlParser: true, useUnifiedTopology: true})
    .then(() => {
        console.log('MongoDB Connected!')
    })
    .catch(err => {
        console.log(err);
    })

// USE API ROUTES
app.use('/api/user', user)
app.use('/api/group', group)

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server Started on Port ${port}`));
