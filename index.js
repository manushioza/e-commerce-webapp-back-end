const express = require('express')
const app = express()
const port = 3030


const auth_routes = require('./routes/auth');

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.use("/auth", auth_routes);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})