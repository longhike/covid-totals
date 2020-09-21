'use strict'

const path = require('path')
const express = require('express');
const htmlrouter = express.Router()


htmlrouter
    .get('/', (req, res) => {
        res.sendFile(__dirname, "./index.html")
    })

module.exports = htmlrouter