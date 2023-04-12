const express = require('express');
const mapsQueries = require('../db/queries/maps');
const userQueries = require('../db/queries/users');

const router = express.Router();

// get methods
router.get('/', (req, res) => {
  mapsQueries.getMaps().then((data) => {
    const userId = req.session.user_id;
    const user = userQueries.getUserWithId(userId);
    const templateVars = { mapURLs: data, user };
    return res.render('maps_index', templateVars);
  });
});

router.get('/new', (req, res) => {
  const userId = req.session.user_id;
  const user = userQueries.getUserWithId(userId);
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
  mapsQueries.getMapName(mapId).then((data) => {
    const templateVars =  data ;
    // console.log('💫',templateVars)
    res.render('maps_display', templateVars);
  }).catch((err) => {'🐠',err});
});



module.exports = router;
