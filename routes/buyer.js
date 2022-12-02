//Import modules
const express = require("express");
const router = express.Router();
const { db } = require("../firebase");

//Edit Buyer Profile
router.post("/edit", async (req, res) => {
  console.log(req.body);
  const profile = {
    first_name: req.body.first_name,
    last_name: req.body.last_name,
    email: req.body.email,
    username: req.body.username,
    password: req.body.password,
    phone_number: req.body.phone_number,
    address: req.body.address,
    opt_in: req.body.opt_in,
  };

  try {
    db.collection("users")
      .where("email", "==", profile.email)
      .get()
      .then(function (querySnapshot) {
        querySnapshot.forEach(function (doc) {
          console.log(doc.id, " => ", doc.data());
          doc.ref.update(profile);
        });
      });
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
});

//API to add new order -> addd to orders collection
router.post("/order/new", async (req, res) => {
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
      security_code: req.body.securityCode,
    },
  };

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
});

//API to get orders
router.post("/order/get", async (req, res) => {
  const order_id = {
    account_id: req.body.account_id,
  };

  try {
    const ordersRef = db.collection("orders");
    const order = await ordersRef.where("user_id", "==", order_id.account_id);

    var orders = [];
    const snapshot = await order.get();

    if (!snapshot.empty) {
      snapshot.forEach((doc) => {
        var data = doc.data();
        data["id"] = doc.id;
        orders.push(data);
      });
      res.status(200).send({
        status: "Success",
        data: JSON.stringify(orders),
      });
    } else {
      res.status(404).send({
        status: "Failed",
        message: "Order not found",
      });
    }
  } catch (err) {
    res.status(400).send({
      status: "Failed",
      message: "Failed to get order.",
    });
    console.log(err);
  }
});

//Add Item to items[] in user's cart
router.post("/cart/add", async (req, res) => {
  const new_item_cart = {
    account_id: req.body.account_id,
    item_id: req.body.item_id,
  };

  var cart_id = "";

  try {
    const cartRef = db.collection("cart");
    const snapshot = await cartRef
      .where("account_id", "==", new_item_cart.account_id)
      .get();
    if (!snapshot.empty) {
      snapshot.forEach((doc) => {
        cart_id = doc.id;
      });
      db.collection("cart")
        .doc(cart_id)
        .collection("items")
        .add({ item_id: new_item_cart.item_id });

      res.status(200).send(true);
      console.log("Successfully added item to cart");
    }
  } catch (err) {
    res.status(400).send({
      status: "Failed",
      message: "Failed to add item to cart.",
    });
    console.log(err);
  }
});

router.post("/cart/get", async (req, res) => {
  console.log("Attempting to get items from cart....");
  var items = [];
  var item_details = [];

  try {
    const cRef = db
      .collection("cart")
      .doc(String(req.body.cart_id.trim()))
      .collection("items");
    const collections = await cRef.get();
    collections.forEach((collection) => {
      var data = collection.data();
      items.push(data["item_id"]);
    });

    const itemRef = db.collection("items");

    var snapshot = await itemRef.get();

    snapshot.forEach((doc) => {
      var data = doc.data();
      if (items.includes(doc.id)) {
        data["id"] = doc.id;
        item_details.push(data);
      }
    });

    res.status(200).send(item_details);
  } catch (err) {
    res.status(400).send({
      status: "Failed",
      message: "Failed to complete order.",
    });
    console.log(err);
  }
});

module.exports = router;
return router;
