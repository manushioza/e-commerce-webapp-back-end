const express = require('express');
const router = express.Router();

router.get('/', async function (req, res) {
  res.status(200).send({
    status: 'Good',
    message: 'goodjob'
  })
})
//Add new seller
router.post('/addseller', async function (req, res) {
  const seller_info = {
    store_name:  req.body.storeName,
    username:  req.body.userName,
    password: req.body.password,
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


//Add new buyer
router.post('/addbuyer', async function (req, res) {
    const buyer_info = {
      username:  req.body.userName,
      password: req.body.password,  
      email: req.body.email,
      phone_number: req.body.phoneNumber,
      address: req.body.address,
      opt_in: req.body.optIn,
      account_id: req.body.account_Id
    }

    try {
      res.status(200).send({
        status: "Success",
        message: buyer_info,
      });
    } catch (err) {
      res.status(400).send({
        status: "Failed",
        message: "Failed to update buyer info.",
      });
    }
});

module.exports = router;
