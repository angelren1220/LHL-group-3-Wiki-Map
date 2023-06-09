const db = require('../connection');

const getUserWithEmail = (email) => {
  if (!email) {
    return null;
  }

  return db.
  query(
    `SELECT * FROM users WHERE users.email = $1;`,
    [email.toLowerCase()])
  .then((result) => {
    return result.rows[0];
  })
  .catch((err) => {
    console.log(err.message);
  });
};

const addUser = (user) => {
  return db.
  query(
    `INSERT INTO users (name, email, password)
     VALUES ($1, $2, $3)
     RETURNING *;`,
    [user.name, user.email.toLowerCase(), user.password])
  .then((result) => {
    return result.rows[0];
  })
  .catch((err) => {
    console.log(err.message);
  });
};

const getUserWithId = (id) => {
  if(!id) {
    return null;
  }
  return db.
  query(
    `SELECT * FROM users WHERE users.id = $1;`,
    [Number(id)])
  .then((result) => {
    return result.rows[0];
  })
  .catch((err) => {
    console.log(err.message);
  });
};

const getUserIDWithEmail = (email) => {
  if(!email) {
    return null;
  }

  return db.
  query(
    `SELECT maps.id FROM maps
    JOIN users ON user_id = users.id where users.email = $1`,
    [email.toLowerCase()]
  )
  .then((result) => {
    return result.rows[0];
  })
  .catch((err) => {
    console.log(err.message);
  });
};

module.exports = {
  getUserWithEmail,
  addUser,
  getUserWithId,
  getUserIDWithEmail
};
