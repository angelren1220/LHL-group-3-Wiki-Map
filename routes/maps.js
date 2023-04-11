const express = require('express');
const mapsQueries = require('../db/queries/maps');
const userQueries = require('../db/queries/users');

const router = express.Router();

// get methods
router.get('/list', (req, res) => {
  mapsQueries.getMaps().then((data) => {
    const userEmail = req.session.user_email;
    const user = userQueries.getUserWithEmail(userEmail);
    const templateVars = { mapData: data, user };
    return res.render('maps_list', templateVars);
  });
});

router.get('/new', (req, res) => {
  const userEmail = req.session.user_email;
  const user = userQueries.getUserWithEmail(userEmail);
  const templateVars = { user };
  res.render('maps_new', templateVars);
});

router.get('/test', (req, res) => {
  res.render('maps_display');
});

router.get('/pins/:id', (req, res) => {
  const mapId = req.params.id
  mapsQueries.getPinsByMapId(mapId).then((data) => {
    const templateVars = data;
    res.json( {templateVars} );
  }).catch((err) => {'🐠',err});
});

router.get('/:id', (req, res) => {
  const mapId = req.params.id
  mapsQueries.getPinsByMapId(mapId).then((data) => {
    const templateVars = data;
    res.render('maps_display', templateVars);
  }).catch((err) => {'🐠',err});
});



module.exports = router;
