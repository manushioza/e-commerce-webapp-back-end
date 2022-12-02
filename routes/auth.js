const express = require("express");
const router = express.Router();
const { db } = require("../firebase");

router.post("/login", async function (req, res) {
  const login_info = {
    username: req.body.username,
    password: req.body.password,
  };
  var user = [];

  try {
    console.log("Attempting login....")
    const usersRef = db.collection("users");
    const snapshot = await usersRef.where("password", "==", login_info.password).get();
    if (!snapshot.empty) {
      snapshot.forEach((doc) => {
        var data = doc.data();
        data["id"] = doc.id;
          user.push(data);
        });
      
      
      res.status(200).send(user);
      console.log("Login successfull")
    }
    else{
      res.status(200).send(user);
      console.log("Login Failed")
    }
  } catch (err) {
    console.log(err);
    res.status(404).send({
      status: "Error",
      message: `Error Logging in: ${error}`,
    });X
  }
});



//Get seller info - done
router.post('/', async function (req, res) {
  const user_info = {
    email: req.body.email    
  }
  try {
    const userRef = db.collection("users");
    const users = await userRef.where("email", "==", user_info.email).get();
    let user = {}
    for (const doc of users.docs) {
      console.log(doc.id, " => ", doc.data());
      user = doc.data()
    }

    if (!user) {
      res.status(404).send({
        status: "Failed",
        message: "User not found",
      });
    }
    res.status(200).send({
      status: "Success",
      data: user
    });
  } catch (err) {
    console.log("error =", err)
    res.status(400).send({
      status: "Failed",
      message: "Failed to get user info.",
    });
  }
})

//Add new buyer
router.post("/addBuyer", async function (req, res) {
 
  const buyer_info = {
    first_name: req.body.first_name,
    last_name: req.body.last_name,
    email: req.body.email,
    username: req.body.username,
    password: req.body.password,
    phone_number: req.body.phone_number,
    address: req.body.address,
    opt_in: req.body.opt_in,
    type: "Buyer",
    store_name: null,
    store_id: null,
  };

  try {
    console.log("Attempting to add Buyer to DB.....");
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
    first_name: req.body.first_name,
    last_name: req.body.last_name,
    email: req.body.email,
    username: req.body.username,
    password: req.body.password,
    phone_number: req.body.phone_number,
    address: req.body.address,
    opt_in: req.body.opt_in,
    type: "Seller",
    store_name: req.body.store_name,
    store_id: req.body.store_id,
  };
  try {
    console.log("Attempting to add Seller to DB.....");
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
