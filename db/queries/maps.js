const db = require('../connection');

const getMaps = () => {
  return db.query('SELECT url FROM maps;')
  .then(data => {
    return data.rows;
  })
  .catch(err => {
    res
      .status(500)
      .json({ error: err.message });
  });
};

module.exports = { getMaps };
