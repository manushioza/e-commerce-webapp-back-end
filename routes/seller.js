const express = require('express');
const router = express.Router();


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




  module.exports = router;