const createUser = (req, res) => {
    Pool.query('INSERT INTO public."user" (colonnes à définir) VALUES', (error, results) => {
        if (error) {
            console.log(error);
        }
        res.status(200).json(results.rows)
    })
}

/* const query = {
    text: 'INSERT INTO users(name, email) VALUES($1, $2)',
    values: ['brianc', 'brian.m.carlson@gmail.com'],
} */

module.exports = { createUser }

// librairie UUID dans node