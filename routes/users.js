const express = require('express');
const router = express.Router();
const data = require('../data');
const userData = data.userData;
router.get('/', (req, res) => {
    if (req.session.user) {
      res.redirect('/private');
    } else {
      res.redirect('/login')
    }
  })

router.get('/login',(req, res) =>{
    res.render('login');
  });

router.get('/private',(req,res)=> {
    try {
      if(req.session.user){
        res.render('private',{username:req.session.user.username});
      }
      else{res.render('private');}
    } catch (e) {
      res.status(500).json({
        error: e.message
      });
    }
  });

router.get('/signup',(req, res) => {
    res.render('signup');
  });


router.post('/signup',async (req, res) => {
    const {
      username,
      password
    } = req.body;
    try{
    try {
      await userData.createUser(username, password);
      res.redirect('/');
    } catch (e) {
      //console.log(e);
      res.status(400).render('signup',{error:e});
    }}catch(e){
      res.status(500).json({error:"Internal Server Error"})
    }
  })
router.post('/login', async (req, res) => {
    const {
      username,
      password
    } = req.body;
    try{
      await userData.checkUser(username, password);
      try {
        req.session.user = {
          username: username
        };
        res.render('private',{username:username});
    } catch (e) {
      res.status(500).json({error:e.message});
    }}catch(e){
      res.status(400).render('login',{error:e});
    }
  });
  router.get('/logout', async (req, res) => {
    req.session.destroy();
    res.redirect('/login')
  });

  module.exports = router;