/*
 * All routes for Users are defined here
 * Since this file is loaded in server.js into /users,
 *   these routes are mounted onto /users
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require('express');
const bcrypt = require("bcrypt");
const userQueries = require('../db/queries/users');

const router  = express.Router();

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

    req.session.userId = user.id;
    res.send({
      user: {
        name: user.name,
        email: user.email,
        id: user.id,
      }
    });
  });
});

// Log a user out
router.post("/logout", (req, res) => {
  req.session.userId = null;
  res.send({});
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

      req.session.userId = user.id;
      res.send("🤗");
    })
    .catch((err) => res.send(err));
});


// get methods
router.get('/', (req, res) => {
  const userId = req.session.userId;
  const user = userQueries.getUserWithId(userId);
  const templateVars = {user};
  console.log(user);
  res.render('users', templateVars);
});

router.get('/login', (req, res) => {
  const userId = req.session.userId;
  const user = userQueries.getUserWithId(userId);
  const templateVars = {user};
  res.render('login', templateVars);
});

router.get('/logout', (req, res) => {
  const userId = req.session.userId;
  const user = userQueries.getUserWithId(userId);
  const templateVars = {user};
  res.redirect('/', templateVars);
});

router.get("/register", (req, res) => {
  // if user is logged in, redirect to url
  /***to do!!!! now getUserWithID returns a promise (true) so it will redirect to  homepage ***/
  const userId = req.session.userId;
  const user = userQueries.getUserWithId(userId);
  if (userQueries.getUserWithId(userId)) {
    return res.redirect("/users");
  }

  // otherwise create a new user template
  const templateVars = {
    id: req.body.id,
    email: req.body.email,
    password: req.body.password,
    user
  };

  res.render('register', templateVars);
});



module.exports = router;
