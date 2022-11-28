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

//Edit Seller info - done
router.post('/edit', async function (req, res) {
    const seller = {
      store_name:  req.body.storeName,
      email: req.body.email,
      phone_number: req.body.phoneNumber,
      address: req.body.address,
      opt_in: req.body.optIn
    }

    try {
      const usersRef = db.collection("users")
      const users = await usersRef.where("email", "==", seller.email).get();
      for (const doc of users.docs) {
        console.log(doc.id, " => ", doc.data());
        doc.ref.update(seller)
      } 

      res.status(200).send({
        status: "Success",
        message: seller,
      });
    } catch (err) {
      res.status(400).send({
        status: "Failed",
        message: "Failed to update seller info.",
      });
    }
});

//Add new seller - done
router.post('/add', async function (req, res) {
    const seller = {
      store_name:  req.body.storeName,
      email: req.body.email,
      phone_number: req.body.phoneNumber,
      address: req.body.address,
      opt_in: req.body.optIn,
      type: 'Seller'
    }

    try {
      const usersRef = db.collection("users")
      await usersRef.add(seller);

      res.status(200).send({
        status: "Success",
        message: seller,
      });
    } catch (err) {
      res.status(400).send({
        status: "Failed",
        message: "Failed to update seller info.",
      });
    }
});
//------------

//Edit item 
// TODO: figure out which collection
router.post('/editItem', async function (req, res) {
  const item = {
    item_name:  req.body.item_name,
    item_description: req.body.item_description,
    item_price: req.body.item_price,
    item_quantity: req.body.item_quantity,
    item_number: req.body.item_number,
    picture: req.body.picture,
    account_id: req.body.account_id
  }

    try {
      const inventoryRef = db.collection("items")
      const items = await inventoryRef.where("item_name", "==", item.item_name).get();
      for (const doc of items.docs) {
        console.log(doc.id, " => ", doc.data());
        doc.ref.update(item)
      }

      res.status(200).send({
        status: "Success",
        message: "Successfully edited item",
      });
    } catch (error) {
      console.log("---error", error)
      res.status(400).send({
        status: "Failed",
        message: "Failed to edit item.",
      });
    }
  })
    

//Add new item - done
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
