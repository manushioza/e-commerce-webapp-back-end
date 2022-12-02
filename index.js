//import nessecary modules
const express = require('express')
var bodyParser = require("body-parser");
var cors = require('cors')
const app = express()
//Set port to 3030
const port = 3030
//Import auth, buyer and seller modules
const auth_routes = require('./routes/auth');
const buyer_routes = require('./routes/buyer');
const seller_routes = require('./routes/seller');

//Set app to use above modules
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({extended: false,})); // support encoded bodies
app.use(cors())


app.get('/', (req, res) => {
  res.send('Hello World!')
})

//Set patch to auth, buyer and seller
app.use("/auth", auth_routes);
app.use("/buyer", buyer_routes);
app.use("/seller", seller_routes);

//Start app,listen on port 3030
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})