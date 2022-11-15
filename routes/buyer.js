const express = require("express")
const router = express.Router()
const orderData = require("./models/Order")

router.put("/newOrder", (req, res) => {
  const new_order = {
    itemname: req.body.itemName,
    itemdesc: req.body.itemDesc,
    itemprice: req.body.itemPrice,
    itemnumber: req.body.itemNumber,
    storename: req.body.storeName,
    orderstatus: req.body.orderStatus,
    ordernumber: req.body.orderNumber,
    lastupdated: req.body.lastUpdated,
    picture: req.body.itemName,
  }

  const payment_info = {
    cardnumber: req.body.cardNumber,
    cvc: req.body.cvc,
    expiry: req.body.expiry,
    cardholder: req.body.cardHolder
  }

  try {
    res.status(200).send({
      status: "Success",
      message: new_order, payment_info,
    });
  } catch (err) {
    res.status(400).send({
      status: "Failed",
      message: "Failed to complete order.",
    });
  }
})

router.get("/getOrder", async (req, res) => {
  const order = await orderData.get()
  res.send({ data: order })
})

router.post("/editProfile", (req, res) => {
  const profile = {
    name: req.body.name,
    password: req.body.password,
    address: req.body.address,
    email: req.body.email,
    phonenumber: req.body.phoneNumber,
    emailoptin: req.body.emailOptIn
  }

  try {
    res.status(200).send({
      status: "Success",
      message: profile,
    });
  } catch (err) {
    res.status(400).send({
      status: "Failed",
      message: "Failed to complete order.",
    });
  }
})

module.exports = router