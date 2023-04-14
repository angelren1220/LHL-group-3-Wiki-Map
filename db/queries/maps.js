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

const getMapsWithUserId = (id) => {
  return db.
  query(
    `SELECT maps.id AS id, maps.name AS name FROM maps
    JOIN users ON user_id = users.id
    WHERE users.id = $1;`,
    [id])
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

const addMap = (map) => {
  return db.
    query(
      `INSERT INTO maps (user_id, name)
     VALUES ($1, $2)
     RETURNING *;`,
      [map.user_id, map.name])
    .then(() => {
      return "Add new map successfully";
    })
    .catch((err) => {
      console.log(err.message);
    });
};

const getUserAndMap = (mapId) => {
  return db.query(
    `SELECT users.id, users.name, email, password, maps.name AS mapname
    FROM users
    LEFT JOIN maps ON maps.user_id = users.id
    WHERE maps.id = $1
    GROUP BY maps.id, users.id;`,
    [mapId]
  )
    .then((data) => {
      return data.rows[0];
    })
    .catch(err => console.log('🤺', err.message));
};

const getMapData = (mapId) => {
  return db.query(
    `SELECT *
    FROM maps
    WHERE id = $1;`,
    [mapId]
  )
    .then((data) => {
      return data.rows[0];
    })
    .catch(err => console.log('👑', err.message));
};

const deleteMap = (mapId) => {
  return db.
  query(
    `DELETE FROM maps WHERE id = $1`,
    [Number(mapId)])
  .then(() => {
    return "Delete map successfully";
  })
  .catch((err) => {
    console.log(err.message);
  });
};

module.exports = {
  getMaps,
  getMapsWithUserId,
  getPinsByMapId,
  getAvgLatLng,
  getMapObj,
  addMap,
  deleteMap,
  getUserAndMap,
  getMapData,
};


