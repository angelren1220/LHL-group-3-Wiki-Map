const express = require('express');
const router = express.Router();
const db = require('../db/connection');
const getMapsHelper = require('../db/queries/maps');

router.get('/', (req, res) => {
  getMapsHelper.getMaps().then((data) => {
    const templateVars = { mapURLs: data };
    return res.render('maps_index', templateVars);
  });
});

router.get('/new', (req, res) => {
  res.render('maps_new');
});

module.exports = router;
