const db = require('../connection');

const getPins = () => {
  return db.query('SELECT * FROM pins;')
    .then(data => {
      return data.rows;
    })
    .catch(err => {
      res
        .status(500)
        .json({ error: err.message });
    });
};

const getPinsWithUserId = (id) => {
  if (!id) {
    return null;
  }
  return db.
    query(
      `SELECT * FROM users WHERE users.id = $1`,
      [Number(id)])
    .then((result) => {
      return result.rows[0];
    })
    .catch((err) => {
      console.log(err.message);
    });
};

const addPin = (pin) => {
  return db.
    query(
      `INSERT INTO pins (user_id, map_id, lat, lng, name, description, image_url)
     VALUES ($1, $2, $3, $4, $5, $6, $7)
     RETURNING *;`,
      [Number(pin.user_id), Number(pin.map_id), Number(pin.lat), Number(pin.lng), pin.name, pin.description, pin.image_url])
    .then(() => {
      return "Add new pin successfully";
    })
    .catch((err) => {
      console.log(err.message);
    });
};

module.exports = {
  getPins,
  getPinsWithUserId,
  addPin
};
