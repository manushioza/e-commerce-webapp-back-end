const express = require('express')
var bodyParser = require("body-parser");
var cors = require('cors')
const app = express()
const port = 3030

app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({extended: false,})); // support encoded bodies
app.use(cors())

// const seller_routes = require('./routes/seller');
const buyer_routes = require('./routes/buyer');
const auth_routes = require('./routes/auth');
const seller_routes = require('./routes/seller');

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.use("/auth", auth_routes);
app.use("/buyer", buyer_routes);
app.use("/seller", seller_routes);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})