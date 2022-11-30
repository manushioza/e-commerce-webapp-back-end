const express = require('express');
const router = express.Router();
const { db } = require("../firebase");

//Get seller info - done
router.get('/', async function (req, res) {
    const seller_info = {
      email: req.body.email    
    }
    try {
      const sellerRef = db.collection("users");
      const sellers = await sellerRef.where("email", "==", seller_info.email).where("type", "==", "Seller").get();
      let seller = {}
      for (const doc of sellers.docs) {
        console.log(doc.id, " => ", doc.data());
        seller = doc.data()
      }

      if (!seller) {
        res.status(404).send({
          status: "Failed",
          message: "Seller not found",
        });
      }
      res.status(200).send({
        status: "Success",
        data: seller
      });
    } catch (err) {
      console.log("error =", err)
      res.status(400).send({
        status: "Failed",
        message: "Failed to get seller info.",
      });
    }
})

//Edit Seller info - done
router.patch('/', async function (req, res) {
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

//Edit item - done
router.patch('/items', async function (req, res) {
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

//Get item by item name
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

//View all items for seller - done
router.get('/items/view', async function (req, res) {
 
  const seller_info = {
    email: req.body.email    
  }
  try {
    const sellersCollection = db.collection("users");
    const sellers = await sellersCollection
                      .where("email", "==", seller_info.email)
                      .where("type", "==", "Seller").get();
    let sellerId = null
    for (const doc of sellers.docs) {
      console.log(doc.id, " => ", doc.data());
      sellerId = doc.id
    }

    const sellerRef = sellersCollection.doc(sellerId);


    const itemsRef = db.collection("items");
    const itemsSnapshot = await itemsRef
                      .where("posted_by", "==", sellerRef)
                      .get()

    const items = []
    for (const doc of itemsSnapshot.docs) {
      console.log(doc.id, " => ", doc.data());
      items.push(doc.data())
    }
    res.status(200).send({
      status: "Success",
      data: items
    });
  } catch (err) {
    console.log("error =", err)
    res.status(400).send({
      status: "Failed",
      message: "Failed to get items for seller.",
    });
  }

});

module.exports = router;
