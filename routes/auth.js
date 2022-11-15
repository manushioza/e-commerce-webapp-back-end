const express = require("express");
const router = express.Router();
const { db } = require("../firebase");


router.get("/login", async function (req, res) {
 
});

//Add new buyer
router.post("/addBuyer", async function (req, res) {
  const buyer_info = {
    first_name: req.body.firstName,
    last_name: req.body.lastName,
    email: req.body.email,
    username: req.body.username,
    password: req.body.password,
    phone_number: req.body.phoneNumber,
    address: req.body.address,
    opt_in: req.body.optIn,
    type: "Buyer"
  };

  try {
    console.log("Attempting to add Buyer to DB.....")
    await db
      .collection("users")
      .add(buyer_info)
      .then(() => {
        console.log("Created new Buyer record in firestore");
        // See the UserRecord reference doc for the contents of userRecord.
        res.status(200).send({
          status: "Success",
          message: "Successfully added new Buyer",
        });
      });
  } catch (err) {
    console.log(err);
    res.status(400).send({
      status: "Failed",
      message: "Failed to add Buyer.",
    });
  }
});

//Add new seller
router.post("/addSeller", async function (req, res) {
  const seller_info = {
    first_name: req.body.firstName,
    last_name: req.body.lastName,
    email: req.body.email,
    username: req.body.username,
    password: req.body.password,
    phone_number: req.body.phoneNumber,
    address: req.body.address,
    opt_in: req.body.optIn,
    type: "Seller",
    store_name: req.body.storeName,
    store_id: req.body.storeId

  };
  try {
    console.log("Attempting to add Seller to DB.....")
    await db
      .collection("users")
      .add(seller_info)
      .then(() => {
        console.log("Created new Seller record in firestore");
        // See the UserRecord reference doc for the contents of userRecord.
        res.status(200).send({
          status: "Success",
          message: "Successfully added new Seller",
        });
      });
  } catch (err) {
    console.log(err);
    res.status(400).send({
      status: "Failed",
      message: "Failed to add Seller.",
    });
  }
});


module.exports = router;
