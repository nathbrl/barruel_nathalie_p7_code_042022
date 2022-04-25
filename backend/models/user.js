const { Pool } = require('pg');

const getUsers = (req, res) => {
    Pool.query('SELECT * FROM public."user"', (error, results) => {
        if (error) {
            console.log(error);
        }
        res.status(200).json(results.rows)
    })
  }

module.exports = { getUsers }