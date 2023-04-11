const express = require('express');
const router  = express.Router();
const pinQueries = require('../db/queries/pins');

router.get('/', (req, res) => {
  pinQueries.getPins()
    .then(pins => {
      res.json({ pins });
    })
    .catch(err => {
      res
        .status(500)
        .json({ error: err.message });
    });
});

module.exports = router;
