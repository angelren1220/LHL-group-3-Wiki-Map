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

// Route to log a user in
router.post("/login", (req, res) => {
  // Extract email and password from the request body
  const email = req.body.email;
  const password = req.body.password;

  // Call getUserWithEmail function to get the user from the database
  userQueries.getUserWithEmail(email).then((user) => {
    if (!user) { // If user is not found, return error message
      return res.status(403).send("Invalid login! <a href='/users/login'>back</a>");
    }

    // Compare password in the request with the password from the database
    if (!bcrypt.compareSync(password, user.password)) {
      return res.status(403).send("Invalid login! <a href='/users/login'>back</a>");
    }

    // Store user id and name in the session and redirect to /maps/list
    req.session.user_id = user.id;
    req.session.user_id = user.id;
    req.session.user_name = user.name;
    res.redirect("/maps/list");
  });
});

// Route to log a user out
router.post("/logout", (req, res) => {
  // Clear user id and name from the session and redirect to home page
  req.session.user_id = null;
  req.session.user_name = null;
  res.redirect("login");
});

// Route to register a new user
router.post("/register", (req, res) => {
  const user = req.body;
  if (!(user.name && user.email && user.password)) { // Check if all required fields are filled in
    return res.status(400).send("Cannot register with empty string! <a href='/users/register'>back</a>");
  }

   // Hash password and add the user to the database
  user.password = bcrypt.hashSync(user.password, 12);
  userQueries
    .addUser(user)
    .then((user) => {
      if (!user) {
        return res.send({ error: "error" });
      }

      // Store user id and name in the session and redirect to home page
      req.session.user_id = user.id;
      req.session.user_name = user.name;
      res.redirect("/maps/new");
    })
    .catch((err) => res.send(err));
});


// Route to render user page
router.get('/', (req, res) => {
  const user = {
    userId: req.session.user_id,
    userName: req.session.user_name
  };

  const templateVars = { user };
  res.render('users', templateVars);
});

// Route to render login page
router.get('/login', (req, res) => {
  const userId = req.session.user_id;
  const user = {
    userId: req.session.user_id,
    userName: req.session.user_name
  };

  if (userId) {
    return res.redirect("/");
  }

  const templateVars = { user };
  res.render('login', templateVars);
});

// Route to render register page
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
