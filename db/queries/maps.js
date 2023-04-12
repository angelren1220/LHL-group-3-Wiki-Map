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
}


module.exports = {
  getMaps,
  getPinsByMapId,
  getAvgLatLng,
  getMapsWithUserEmail
};


