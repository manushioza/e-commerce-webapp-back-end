const express = require('express')
var bodyParser = require("body-parser");
const app = express()
const port = 3030

app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({extended: false,})); // support encoded bodies

const seller_routes = require('./routes/seller');


app.get('/', (req, res) => {
  res.send('Hello World!')
})


app.use("/seller", seller_routes);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})