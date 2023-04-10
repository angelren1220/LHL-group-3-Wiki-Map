const express = require('express');
const mapsQueries = require('../db/queries/maps');

const router = express.Router();

// get methods
router.get('/', (req, res) => {
  mapsQueries.getMaps().then((data) => {
    const templateVars = { mapURLs: data };
    return res.render('maps_index', templateVars);
  });
});

router.get('/new', (req, res) => {
  
  res.render('maps_new');
});

module.exports = router;
