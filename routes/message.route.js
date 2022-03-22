const { Router } = require('express');
const router = Router();
const auth = require('../middleware/auth.middleware');
const config = require('config');
const mysql = require('mysql');
const connection = mysql.createConnection(config.get('mysqlConfig'));

router.post(
    '/',
    auth,
    async (req, res) => {
        try {

            const { value } = req.body;
            const { userId, userName } = req.user;

            const insertQuery = 'INSERT INTO ?? VALUES (default,?,?,?,NOW())';
            const formatInsertQuery = mysql.format(insertQuery, ["messager", userId, userName, value]);

            connection.query(formatInsertQuery, (err) => {
                    if (err) {
                        res.status(400);
                        res.send({message: 'Что-то пошло не так'})
                    }; 
                    res.status(201);
                    res.send({message: "Сообщение отправлено"});                 
                }
            )
            
        } catch (error) {
            res.status(500).json({ message: "Что-то пошло не так, попробуй снова."})
        }
});

router.get(
        '/', 
        async (req, res) => {
    try {

        const { email, password } = req.body;

        const selectQuery = 'SELECT * FROM ??';
        const formatSelectQuery = mysql.format(selectQuery, ["messager"])

        connection.query(formatSelectQuery, (err, result) => {
            if (err) {
                res.status(400);
                res.send({message: 'Сообщений не найдено'})
            }

            if (result.length) {
                res.status(200);
                res.send(JSON.stringify(result));
            };
        });

    } catch (error) {
        res.status(500).json({ message: "Что-то пошло не так, попробуй снова."})
    }        

});

module.exports = router;