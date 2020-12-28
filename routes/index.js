const express = require('express');
const router = express.Router();
const multer = require('multer');
const upload = multer();

// Models
const Account = require('../models/Account');

router.post('/signUp', upload.none(), (req, res) => {
  const {name, surname, username, password} = req.body;
  Account.find({username: username}, (err, object) => {
    if(!err && !object[0]){
      const AccountData = new Account({
        name: name,
        surname: surname,
        username: username,
        password: password
      });
      AccountData.save((err, newObject) => {
        if(!err && newObject){
          const data = {
            status: 200,
            username: newObject.username,
            id: newObject._id
          }
          res.send(data);
        }else{
          const data = {
            status: 500,
            error: 'serverError'
          }
          res.send(data);
        }
      });
    }else{
      const data = {
        status: 500,
        error: 'username'
      }
      res.send(data);
    }
  });
});

router.post('/signIn', upload.none(), (req, res) => {
  const {username, password} = req.body;
  Account.find({username: username, password: password}, (err, object) => {
    if(!err && object[0]){
      const data = {
        status: 200,
        username: object[0].username,
        id: object[0]._id
      }
      res.send(data);
    }else{
      const data = {
        status: 500
      }
      res.send(data);
    }
  });
});

module.exports = router;