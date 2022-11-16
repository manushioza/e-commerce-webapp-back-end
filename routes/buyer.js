const express = require("express");
const router = express.Router();
const { db } = require("../firebase");

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
  const order_id = {
    id: "2n6OO2LGmRUogwwZfmUy"
  };

  try {
    const orderRef = db.collection("orders").doc(order_id.id);
    const snapshot_order = await orderRef.get();
    if (!snapshot_order.exists) {
      res.status(404).send({
        status: "Failed",
        message: "Order not found",
      });
    } else {
      res.send({ data: snapshot_order.data() })
    }
  } catch (err) {
    res.status(400).send({
      status: "Failed",
      message: "Failed to get order.",
    });
  }

})

router.post("/editProfile", async (req, res) => {
  const profile = {
    name: req.body.name,
    password: req.body.password,
    address: req.body.address,
    email: "annakendrick@ak.ca",
    phonenumber: req.body.phoneNumber,
    emailoptin: req.body.emailOptIn
  }

  try {
    db.collection("users").where("email", "==", profile.email)
      .get()
      .then(function (querySnapshot) {
        querySnapshot.forEach(function (doc) {
          console.log(doc.id, " => ", doc.data());
          doc.ref.update({ opt_in: emailoptin })
        })
      })
    res.status(200).send({
      status: "Success",
      message: "Successfully added edited Profile",
    });
  } catch (err) {
    res.status(400).send({
      status: "Failed",
      message: "Failed to complete order.",
    });
  }
})

module.exports = router
return router