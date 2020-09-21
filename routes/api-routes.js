'use strict'

require('dotenv').config()
const path = require('path')
const express = require('express');
const apirouter = express.Router()
const axios = require("axios");
const _url = "https://covid-19-statistics.p.rapidapi.com/reports/total"
const key = process.env.API_KEY

apirouter
  .get('/api/covid', (req, res) => {
    axios({
      "method": "get",
      "url": _url,
      "headers": {
        "content-type": "application/octet-stream",
        "x-rapidapi-host": "covid-19-statistics.p.rapidapi.com",
        "x-rapidapi-key": key,
        "useQueryString": true
      },
      "params": req.query
    })
      .then((response) => {
        let resObj = response.data.data
        res.json(resObj)
      })
      .catch((error) => {
        console.log(error)
        if (error) {
          res.json(error)
        }
      })
  })

module.exports = apirouter;

