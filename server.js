const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')

const app = express()

//Bodyparser
app.use(bodyParser.json())

