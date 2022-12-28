const mysql = require('mysql2/promise');
const api = require('lambda-api')();

api.get('/', async(req, res) => {
    res.status(200).json("Hello!");
});

api.get('/users', async(req, res) => {
    try {
        const connection = await mysql.createConnection(process.env.DATABASE_URL);
        const [rows] = await connection.execute('SELECT * FROM users');
        res.status(200).json(rows);
    } catch (error) {
        console.error(error);
        res.error();
    }
});


exports.handler = async (event, context) => {
    return await api.run(event, context);
};