const express = require('express');
const router = express.Router();
const { db } = require("../firebase");


//Get Seller info
router.get('/', async function (req, res) {
    const seller_info = {
      store_name:  req.body.storeName,
      email: req.body.email,
      phone_number: req.body.phoneNumber,
      address: req.body.address,
      opt_in: req.body.optIn
    }

    try {
      res.status(200).send({
        status: "Success",
        message: seller_info,
      });
    } catch (err) {
      res.status(400).send({
        status: "Failed",
        message: "Failed to update seller info.",
      });
    }
})

//Edit Seller info
router.post('/edit', async function (req, res) {
    const new_seller_info = {
      store_name:  req.body.storeName,
      email: req.body.email,
      phone_number: req.body.phoneNumber,
      address: req.body.address,
      opt_in: req.body.optIn
    }

    try {
      res.status(200).send({
        status: "Success",
        message: new_seller_info,
      });
    } catch (err) {
      res.status(400).send({
        status: "Failed",
        message: "Failed to update seller info.",
      });
    }
});

//Add new seller
router.post('/add', async function (req, res) {
    const seller_info = {
      store_name:  req.body.storeName,
      email: req.body.email,
      phone_number: req.body.phoneNumber,
      address: req.body.address,
      opt_in: req.body.optIn
    }

    try {
      res.status(200).send({
        status: "Success",
        message: seller_info,
      });
    } catch (err) {
      res.status(400).send({
        status: "Failed",
        message: "Failed to update seller info.",
      });
    }
});

//Add new item
router.post('/items/add', async function (req, res) {
  const item_info = {
    item_name: req.body.itemName, 
    item_description: req.body.itemDescription, 
    item_price: req.body.itemPrice,
    item_quantity: req.body.itemQty, 
    picture_url: req.body.pictureUrl, 
    account_id: req.body.accountId
  }

  try {
    console.log("Attempting to create Item to DB.....");
    await db
      .collection("items")
      .add(item_info)
      .then(() => {
        console.log("Created new item record in firestore");
        res.status(200).send({
          status: "Success",
          message: "Successfully created new Item",
        });
      });
  } catch (err) {
    console.log(err);
    res.status(400).send({
      status: "Failed",
      message: "Failed to create itemc.",
    });
  }
});

//Add new item
router.get('/items/get', async function (req, res) {
  

  try {
    
  } catch (err) {
    console.log(err);
    res.status(400).send({
      status: "Failed",
      message: "Failed to create itemc.",
    });
  }
});


  module.exports = router;
