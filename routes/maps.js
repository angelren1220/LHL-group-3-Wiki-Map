const express = require('express');
const mapsQueries = require('../db/queries/maps');
const userQueries = require('../db/queries/users');

const router = express.Router();

// get methods
router.get('/', (req, res) => {
  mapsQueries.getMaps().then((data) => {
    const userEmail = req.session.user_email;
    const user = userQueries.getUserWithEmail(userEmail);
    const templateVars = { mapURLs: data, user };
    return res.render('maps_index', templateVars);
  });
});

router.get('/new', (req, res) => {
  const userEmail = req.session.user_email;
  const user = userQueries.getUserWithEmail(userEmail);
  const templateVars = { user };
  res.render('maps_new', templateVars);
});

router.get('/test', (req, res) => {
  res.render('maps_test');
});

module.exports = router;
