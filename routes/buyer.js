const express = require("express");
const router = express.Router();
const { db } = require("../firebase");

router.put("/newOrder", async (req, res) => {
  const new_order = {
    item_id: req.body.item_id,
    order_id: req.body.order_id,
    order_status: req.body.order_status,
    payment_id: req.body.payment_id,
    user_id: req.body.user_id
  }

  try {
    await db
      .collection("orders")
      .add(new_order)
      .then(() => {
        console.log("Created new Order record in firestore");
        // See the UserRecord reference doc for the contents of userRecord.
        res.status(200).send({
          status: "Success",
          message: "Successfully added new Buyer",
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
    first_name: req.body.firstName,
    last_name: req.body.lastName,
    email: req.body.email,
    username: req.body.username,
    password: req.body.password,
    phone_number: req.body.phoneNumber,
    address: req.body.address,
    opt_in: req.body.optIn,
    type: req.body.type,
    store_name: req.body.storeName,
    store_id: req.body.storeId,
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