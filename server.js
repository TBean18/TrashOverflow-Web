//Import NPM Packages
const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')

//Import Self-Defined Files
const secrets = require('./config/secrets')
const user = require('./routes/api/users')

const app = express()

//Bodyparser
app.use(express.json())

mongoose.connect(secrets.mongoURI, {useNewUrlParser: true, useUnifiedTopology: true})
    .then(() => {
        console.log('MongoDB Connected!')
    })
    .catch(err => {
        console.log(err);
    })

//USE API ROUTES
app.use('/api/user', user)

const port = secrets.PORT || 5000;

app.listen(port, () => console.log(`Server Started on Port ${port}`));
