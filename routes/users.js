/*
 * All routes for Users are defined here
 * Since this file is loaded in server.js into /users,
 *   these routes are mounted onto /users
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require('express');
const bcrypt = require("bcrypt");
const userQueries = require('../db/queries/users');

const router = express.Router();

// post methods
// Log a user in
router.post("/login", (req, res) => {
  const email = req.body.email;
  const password = req.body.password;

  userQueries.getUserWithEmail(email).then((user) => {
    if (!user) {
      return res.send({ error: "error user not exists" });
    }

    if (!bcrypt.compareSync(password, user.password)) {
      return res.send({ error: "error password wrong" });
    }

    req.session.user_id = user.id;
    req.session.user_name = user.name;
    //console.log(`login as ${user.id}`);
    res.redirect("/");
  });
});

// Log a user out
router.post("/logout", (req, res) => {
  req.session.user_id = null;
  req.session.user_name = null;
  res.redirect("/");
});

// Register a new user
router.post("/register", (req, res) => {
  const user = req.body;
  user.password = bcrypt.hashSync(user.password, 12);
  userQueries
    .addUser(user)
    .then((user) => {
      if (!user) {
        return res.send({ error: "error" });
      }
      console.log(`sucessfully registered as ${user.id}`);

      res.redirect("/");
    })
    .catch((err) => res.send(err));
});


// get methods
router.get('/', (req, res) => {
  const user = {
    userId: req.session.user_id,
    userName: req.session.user_name
  };

  const templateVars = { user };
  res.render('users', templateVars);
});

router.get('/', (req, res) => {
  const userEmail = req.session.user_email;
  const user = userQueries.getUserWithEmail(userEmail);
  const templateVars = { user };
  res.render('users', templateVars);
});

router.get('/verify', (req, res) => {
  const userEmail = req.session.user_email;
  const user = userQueries.getUserWithEmail(userEmail);
  const templateVars = { user };
  res.json(templateVars);
});

router.get('/login', (req, res) => {
  const userId = req.session.user_id;
  const user = {
    userId: req.session.user_id,
    userName: req.session.user_name
  };
  //console.log(userId);

  if (userId) {
    return res.redirect("/");
  }

  const templateVars = { user };
  res.render('login', templateVars);
});

// router.get('/logout', (req, res) => {
//   const userId = req.session.user_id;
//   const user = userQueries.getUserWithId(userId);
//   const templateVars = {user};
//   res.redirect('/', templateVars);
// });

router.get("/register", (req, res) => {
  // if user is logged in, redirect to url
  const userId = req.session.user_id;
  const user = {
    userId: req.session.user_id,
    userName: req.session.user_name
  };

  if (userId) {
    return res.redirect("/");
  }

  // otherwise create a new user template
  const templateVars = { user };

  res.render('register', templateVars);
});



module.exports = router;
