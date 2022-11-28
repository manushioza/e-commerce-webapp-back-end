const express = require("express");
const router = express.Router();
const { db } = require("../firebase");

router.put("/newOrder", async (req, res) => {
  const new_order = {
    item_id: req.body.itemId,
    order_price: req.body.orderPrice,
    order_status: req.body.order_status,
    order_qty: req.body.orderQty,
    user_id: req.body.user_id,
    payment: {
      card_number: req.body.cardNumber,
      cardholder_name: req.body.cardholderName,
      expiry: req.body.expiry,
      security_code: req.body.securityCode
    }
  }

  try {
    await db
      .collection("orders")
      .add(new_order)
      .then(() => {
        res.status(200).send({
          status: "Success",
          message: "Successfully added new Order",
        });
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
    user_id: req.body.userId
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
    first_name: req.body.firstName,
    last_name: req.body.lastName,
    email: req.body.email,
    username: req.body.username,
    password: req.body.password,
    phone_number: req.body.phoneNumber,
    address: req.body.address,
    opt_in: req.body.optIn,
    type: req.body.type,
    store_name: null,
    store_id: null,
  };

  try {
    db.collection("users").where("email", "==", profile.email)
      .get()
      .then(function (querySnapshot) {
        querySnapshot.forEach(function (doc) {
          console.log(doc.id, " => ", doc.data());
          doc.ref.update(profile)
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