const express = require("express")
const router = express.Router()
const { db } = require("../firebase");

router.post("/orders/add", async function (req, res) {
  const new_order_info = {
    order_status: req.body.orderStatus,
    item_id: req.body.itemId,
    user_id: req.body.userId,
    order_qty: req.body.orderQty,
    order_price: req.body.orderPrice,
    payment: {
        card_number: req.body.payment.cardNumber,
        security_code: req.body.payment.securityCode,
        expiry: req.body.payment.expiry,
        cardholder_name: req.body.payment.cardholderName
    }
  };

  
  try {
    console.log("Attempting to create Order to DB.....");
    await db
      .collection("orders")
      .add(new_order_info)
      .then(() => {
        console.log("Created new Order record in firestore");
        res.status(200).send({
          status: "Success",
          message: "Successfully created new Order",
        });
      });
  } catch (err) {
    console.log(err);
    res.status(400).send({
      status: "Failed",
      message: "Failed to create Order.",
    });
  }
});

router.get("/order/get", async (req, res) => {
  const order = await orderData.get()
  res.send({ data: order })
})

module.exports = router
return router