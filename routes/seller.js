const express = require('express');
const router = express.Router();
const or

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
//------------
//Add item 
router.post('/addItem', async function (req, res) {
  const add_item = {
    item_name:  req.body.item_name,
    item_description: req.body.item_description,
    item_price: req.body.item_price,
    item_quantity: req.body.item_quantity,
    item_number: req.body.item_number,
    picture: req.body.picture,
    account_id: req.body.account_id
  }

  try {
    res.status(200).send({
      status: "Success",
      message: addItem,
    });
  } catch (err) {
    res.status(400).send({
      status: "Failed",
      message: "Failed to update add Item.",
    });
  }
})

//Edit item 
router.post('/editItem', async function (req, res) {
  const new_add_item = {
    item_name:  req.body.item_name,
    item_description: req.body.item_description,
    item_price: req.body.item_price,
    item_quantity: req.body.item_quantity,
    item_number: req.body.item_number,
    picture: req.body.picture,
    account_id: req.body.account_id
  }

  try {
    res.status(200).send({
      status: "Success",
      message: editItem,
    });
  } catch (err) {
    res.status(400).send({
      status: "Failed",
      message: "Failed to update edit Item.",
    });
  }
})

  module.exports = router;
