const express = require('express');
const bodyParser = require('body-parser');
const app = express()
const PORT = process.env.PORT || 8080

app.use(express.static('public'))
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json())

const htmlrouter = require('./routes/html-routes')
const apirouter = require('./routes/api-routes')
app.use(htmlrouter)
app.use(apirouter)


app.listen(PORT, () => {
    console.log(
      "==> 🌎  Listening on port %s. Visit http://localhost:%s/ in your browser.",
      PORT,
      PORT
    );
  });
