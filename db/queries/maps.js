const db = require('../connection');

const getMaps = () => {
  return db.query('SELECT * FROM maps;')
  .then(data => {
    return data.rows;
  })
  .catch(err => {
    res
      .status(500)
      .json({ error: err.message });
  });
};

const getPinsByMapId = (mapId) => {
  return db.query(
    `SELECT *
    FROM pins
    WHERE map_id = $1;`,
    [Number(mapId)]
  )
    .then((data) => {
      return data.rows;
    })
    .catch(err => console.log(err.message));
};

const getAvgLatLng = (mapId) => {
  return db.query(
    `SELECT avg(lat), avg(lng)
    FROM pins
    GROUP BY map_id
    WHERE map_id = $1;`,
    [mapId]
  )
    .then((data) => {
      return data.rows;
    })
    .catch(err => console.log(err.message));
};

const getMapObj = (mapId) => {
  return db.query(
    `SELECT *
    FROM maps
    WHERE id = $1;`,
    [mapId]
  )
    .then((data) => {
      return data.rows[0];
    })
    .catch(err => console.log(err.message));
};

const getMapsWithUserEmail = (email) => {
  return db.
  query(
    `SELECT maps.id AS id, maps.zoom AS zoom, maps.name AS name FROM maps
    JOIN users ON user_id = users.id
    WHERE users.email = $1;`,
    [email])
  .then(data => {
    return data.rows;
  })
  .catch(err => {
    res
      .status(500)
      .json({ error: err.message });
  });
};

const addMap = (map) => {
  return db.
  query(
    `INSERT INTO maps (user_id, name, zoom)
     VALUES ($1, $2, $3)
     RETURNING *;`,
    [map.user_id, map.name, map.zoom])
  .then(() => {
    return "Add new map successfully";
  })
  .catch((err) => {
    console.log(err.message);
  });
};


module.exports = {
  getMaps,
  getPinsByMapId,
  getAvgLatLng,
  getMapObj,
  getMapsWithUserEmail,
  addMap
};


