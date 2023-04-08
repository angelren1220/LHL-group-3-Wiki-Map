const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  res.render('maps_index');
});

router.get('/new', (req, res) => {
  res.render('maps_new');
});

module.exports = router;
