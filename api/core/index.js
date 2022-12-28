const mysql = require('mysql2/promise');
const api = require('lambda-api')();

api.get('/', async (req, res) => {
    res.status(200).json("Hello!");
});

api.get('/users', async (req, res) => {
    try {
        const connection = await mysql.createConnection(process.env.DATABASE_URL);
        const [rows] = await connection.execute('SELECT * FROM users');
        res.status(200).json(rows);
    } catch (error) {
        console.error(error);
        res.error();
    }
});


api.get('/user/:id', async (req, res) => {
    try {
        const connection = await mysql.createConnection(process.env.DATABASE_URL);
        const [rows] = await connection.execute(`SELECT * FROM users WHERE id='${req.params.id}'`);
        res.status(200).json(rows);
    } catch (error) {
        console.error(error);
        res.error();
    }
});


api.put('/user', async (req, res) => {
    try {
        const first_name = req.body.first_name;
        const last_name = req.body.last_name;
        const email = req.body.email;

        const connection = await mysql.createConnection(process.env.DATABASE_URL);
        await connection.execute(`INSERT INTO users (first_name, last_name, email) VALUES('${first_name}','${last_name}','${email}')`);
        res.status(200).json();
    } catch (error) {
        console.error(error);
        res.error();
    }
});


api.delete('/user/:id', async (req, res) => {
    try {
        const connection = await mysql.createConnection(process.env.DATABASE_URL);
        await connection.execute(`DELETE FROM users WHERE id='${req.params.id}'`);
        res.status(200).json();
    } catch (error) {
        console.error(error);
        res.error();
    }
});


exports.handler = async (event, context) => {
    return await api.run(event, context);
};