const express = require('express');
const mapsQueries = require('../db/queries/maps');
const pinsQueries = require('../db/queries/pins');

const router = express.Router();

// Handle GET request to '/list' route
router.get('/list', (req, res) => {
  const userId = req.session.user_id;
  const user = {
    userId,
    userName: req.session.user_name
  };


  // If user is not logged in, redirect to homepage
  if (!userId) {
    return res.redirect('/');
  }

  // Get maps data from database and render template with user and map data
  mapsQueries.getMapsWithUserId(userId).then((data) => {
    const templateVars = { maps: data, user };
    res.render('maps_list', templateVars);
  });
});

// Handle GET request to '/api/list' route
router.get('/api/list', (req, res) => {
  const userId = req.session.user_id;

  // If user is not logged in, redirect to homepage
  if (!userId) {
    return res.redirect('/');
  }

  // Get maps data from database and send as JSON response
  mapsQueries.getMapsWithUserId(userId).then((data) => {
    res.json(data);
  });

});

// Get pins list for a map
router.get('/:id/pins', (req, res) => {
  const userId = req.session.user_id;
  const mapId = req.params.id;
  const user = {
    userId,
    userName: req.session.user_name
   };

  // Redirect to homepage if user is not logged in
  if (!userId) {
    return res.redirect('/');
  }

  // Get pins data for the given map id and render the pins list template
  mapsQueries.getPinsByMapId(mapId).then((data) => {
    const templateVars = { maps: data, user };
    res.render('pins_list', templateVars);
  });
});

// Get pins list data for a map in API format
router.get('/api/:id/pins', (req, res) => {
  const mapId = req.params.id;

  // Get pins data for the given map id and send it as a JSON response
  mapsQueries.getPinsByMapId(mapId).then((data) => {

    res.json(data);

  });

});

// route to render new map page
router.get('/new', (req, res) => {
  const user = {
    userId: req.session.user_id,
    userName: req.session.user_name
  };
  const templateVars = { user };
  res.render('maps_new', templateVars);
});

// route to render new pins page
router.get('/pins/new', (req, res) => {
  const user = {
    userId: req.session.user_id,
    userName: req.session.user_name
  };
  const templateVars = { user };
  res.render('pins_list', templateVars);
});

// route to render map_display
router.get('/mapdata/:id', (req, res) => {
  const mapId = req.params.id;

  // Get the user data from the session cookie
  const user = {
    userId: req.session.user_id,
    userName: req.session.user_name
  };

  if (!mapId) {
    return null;
  };

  // Get the map data from the database and render the map_display template
  mapsQueries.getMapData(mapId).then((data) => {
    const templateVars = { data, user };
    res.json(templateVars);
  });
});

// route to get pins
router.get('/pins/:id', (req, res) => {
  const mapId = req.params.id;
  const user = {
    userId: req.session.user_id,
    userName: req.session.user_name
  };

  // Get the pins for the map from the database and return as JSON data
  mapsQueries.getPinsByMapId(mapId).then((data) => {
    const templateVars = { data, user };
    res.json({ templateVars });
  }).catch((err) => { '🐠', err; });
});

// route to eidtmode for map
router.get('/editmode/:id', (req, res) => {
  const user = {
    userId: req.session.user_id,
    userName: req.session.user_name,
    mapId: req.params.id
  };

  // Get the map data from the database
  mapsQueries.getMapData(user.mapId).then((data) => {

    if (data.user_id !== user.userId) {
      res.redirect(`/maps/${data.id}`);
    }

    // Render the maps_editmode template
    const templateVars = { user };
    res.render('maps_editmode', templateVars);
  });
});

//display map with given map id, user info passed for navbar
router.get('/:id', (req, res) => {
  const user = {
    userId: req.session.user_id,
    userName: req.session.user_name
  };
  const templateVars = { user };
  res.render('maps_display', templateVars);
});

// route to create new map
router.post("/new", (req, res) => {
  let map = req.body;
  map.user_id = req.session.user_id;

  // use queries script to add map
  mapsQueries
    .addMap(map)
    .then((map) => {
      if (!map) {
        return res.send({ error: "error" });
      }
      res.redirect("list");
    })
    .catch((err) => res.send(err));
});

// route to create new pin
router.post("/:id/pins/new", (req, res) => {
  let pin = req.body;
  const mapId = req.params.id;
  pin.map_id = mapId;
  pin.user_id = req.session.user_id;

  // use queries script to add pin
  pinsQueries
    .addPin(pin)
    .then((pin) => {
      if (!pin) {
        return res.send({ error: "error" });
      }
      res.redirect(`/maps/${mapId}/pins`);
    })
    .catch((err) => res.send(err));
});

// route to edit pin
router.post("/pins/edit/:id", (req, res) => {
  let pin = req.body;
  pin.user_id = req.session.user_id;
  pin.id = req.params.id;
  let mapId = pinsQueries.getPinObjWithId(pin.id).then((pinData) => {
    pinsQueries
      .editPin(pin)
      .then((pin) => {
        if (!pin) {
          return res.send({ error: "error" });
        }
        res.redirect(`/maps/editmode/${pinData.map_id}`);
      })
      .catch((err) => res.send(err));

  });

});

// route to delete the map
router.post("/delete/:id", (req, res) => {
  const id = req.params.id;

  // use queries script to delete map
  mapsQueries.deleteMap(id).then(() => {
    res.redirect("/maps/list");
  });

});

module.exports = router;
