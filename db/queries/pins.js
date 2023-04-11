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
  if(!id) {
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

module.exports = {
  getPins,
  getPinsWithUserId
};
