const express = require('express');
const mapsQueries = require('../db/queries/maps');
const userQueries = require('../db/queries/users');
const pinsQueries = require('../db/queries/pins');

const router = express.Router();

// get methods
router.get('/list', (req, res) => {
  const userId = req.session.user_id;
  const user = {
    userId,
    userName: req.session.user_name
  };

  if (!userId) {
    return res.redirect('/');
  }
  mapsQueries.getMapsWithUserId(user.user_name).then((data) => {
    const templateVars = { maps: data, user };
    res.render('maps_list', templateVars);
  });
});

router.get('/api/list', (req, res) => {
  const userId = req.session.user_id;
  if (!userId) {
    return res.redirect('/');
  }
  console.log(`sending data for user id: ${userId}`);
  mapsQueries.getMapsWithUserId(userId).then((data) => {
    res.json(data);
  });

});

router.get('/new', (req, res) => {
  const user = {
    userId: req.session.user_id,
    userName: req.session.user_name
  };
  const templateVars = { user };
  res.render('maps_new', templateVars);
});

router.get('/pins/new', (req, res) => {
  const user = {
    userId: req.session.user_id,
    userName: req.session.user_name
  };
  const templateVars = { user };
  res.render('pins_new', templateVars);
});

// router.get('/api/new', (req, res) => {
//   const userEmail = req.session.user_email;
//   const user = userQueries.getUserWithEmail(userEmail);
//   if (!user) {
//     return res.redirect('/');
//   }
//   userQueries.getUserIDWithEmail(userEmail).then((data) => {
//     res.json(data);
//   });

// });



router.get('/mapdata/:id', (req, res) => {
  const mapId = req.params.id;
  const user = {
    userId: req.session.user_id,
    userName: req.session.user_name
  };

  if (!mapId) {
    return null;
  };
  mapsQueries.getMapData(mapId).then((data) => {
    const templateVars = { data, user };
    console.log('🐹', templateVars);
    res.json(templateVars);
  });
});

router.get('/test', (req, res) => {
  res.render('maps_display', templateVars);
});

router.get('/pins/:id', (req, res) => {
  const mapId = req.params.id;
  const user = {
    userId: req.session.user_id,
    userName: req.session.user_name
  };

  mapsQueries.getPinsByMapId(mapId).then((data) => {
    const templateVars = { data, user };
    res.json({ templateVars });
  }).catch((err) => { '🐠', err; });
});

router.get('/editmode/:id', (req, res) => {
  const user = {
    userId: req.session.user_id,
    userName: req.session.user_name,
    mapId: req.params.id
  };
  console.log('🏓', user);
  mapsQueries.getMapData(user.mapId).then((data) => {
    if (data.user_id !== user.userId) {
      res.redirect(`/maps/${data.id}`);
    }
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

// post method
router.post("/new", (req, res) => {
  let map = req.body;
  map.user_id = req.session.user_id;

  //console.log(map);
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

router.post("/pins/new", (req, res) => {
  let pin = req.body;
  pin.user_id = req.session.user_id;
  console.log(pin);
  pinsQueries
    .addPin(pin)
    .then((pin) => {
      if (!pin) {
        return res.send({ error: "error" });
      }
      res.redirect("/maps/list");
    })
    .catch((err) => res.send(err));
});

router.post("/pins/edit/:id", (req, res) => {
  let pin = req.body;
  pin.user_id = req.session.user_id;
  pin.id = req.params.id;
  let mapId = pinsQueries.getPinObjWithId(pin.id).then((pinData) => {
    console.log('🥝', pinData);
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

router.post("/delete/:id", (req, res) => {
  const id = req.params.id;
  mapsQueries.deleteMap(id).then(() => {
    res.redirect("/maps/list");
  });

});

module.exports = router;
