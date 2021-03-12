//Import NPM Packages
const express = require('express')
const mongoose = require('mongoose')
require('dotenv').config()

//Import Self-Defined Files
const user = require('./routes/api/users')
const group = require('./routes/api/groups')

const app = express()

//Bodyparser
app.use(express.json())

//Connecting to DataBase
mongoose.connect(process.env.MONGO_URI, {useNewUrlParser: true, useUnifiedTopology: true})
    .then(() => {
        console.log('MongoDB Connected!')
    })
    .catch(err => {
        console.log(err);
    })

// USE API ROUTES
app.use('/api/user', user)
app.use('/api/groups', group)

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server Started on Port ${port}`));
