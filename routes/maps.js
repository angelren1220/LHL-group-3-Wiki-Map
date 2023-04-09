const express = require('express');
const router = express.Router();
const db = require('../db/connection');

router.get('/', (req, res) => {
  db.query('SELECT url FROM maps;')
    .then(data => {
      const templateVars = { mapURLs: data.rows };
      return res.render('maps_index', templateVars);
    })
    .catch(err => {
      res
        .status(500)
        .json({ error: err.message });
    });
});

router.get('/new', (req, res) => {
  res.render('maps_new');
});

router.get('/test', (req, res) => {
  res.render('maps_test');
});

module.exports = router;
