const config = require('config');
const { Router } = require('express');
const auth = require('../middleware/auth.middleware');
const { check, validationResult } = require('express-validator');
const router = Router();
const mysql = require('mysql');
const connection = mysql.createConnection(config.get('mysqlConfig'));

router.post('/generate', 
    [
        check('name', 'Incorrectly name').notEmpty(),
        check('time', 'Incorrectly time').notEmpty(),
        check('place', 'Incorrectly place').notEmpty(),
        check('namber', 'Incorrectly number').optional({ checkFalsy: true }).isISO8601(),
    ],
    auth, 
    async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({
                errors: errors.array(),
                message: 'Incorrectly data'
            })
        }

        const { event, name, time, place, number, message } = req.body;
        
        const insertQuery = 'INSERT INTO ?? VALUES (default,?,?,?,?,?,?,?,?,NOW(),NOW())';
        const formatInsertQuery = mysql.format(insertQuery, ["events", req.user.userId, event, name, time, place, number, null, message]);

        connection.query(formatInsertQuery, (err) => {
            if (err) {
                res.status(400);
                res.send({message: 'Что-то пошло не так'})
            }; 
            res.status(201);
            res.send({message: "Мероприятие создано"});
        });
    }
    catch(e) {
        res.status(500).json({ message: "Что-то пошло не так, попробуй снова."})
    }
});

router.get('/:name', async (req, res) => {
    try {
        const selectQuery = 'SELECT ??,??,??,?? FROM ?? WHERE ??=?';
        const formatSelectQuery = mysql.format(selectQuery, ["id", "user_name", "events_time", "events_place", "events", "events_name", req.params.name])
        
        connection.query(formatSelectQuery, (err, result) => {
            if (err) {
                res.status(400);
                res.send({message: 'Такой мероприятия не существует.'})
            }

            if (result.length) {
                res.status(201);
                res.send(JSON.stringify(result))
            }
        });
    }
    catch(e) {
        res.status(500).json({ message: "Что-то пошло не так, попробуй снова."})
    }
})

router.get('/card/:id', async (req, res) => {
    try {
        const selectQuery = 'SELECT * FROM ?? WHERE ??=?';
        const formatSelectQuery = mysql.format(selectQuery, ["events", "id", req.params.id])

        connection.query(formatSelectQuery, (err, result) => {
            if (err) {
                res.status(400);
                res.send({message: 'Такой мероприятия не существует.'})
            }
            if (result.length) {
                res.status(201);
                res.send(JSON.parse(JSON.stringify(result)));
            }
        })
    }
    catch(e) {
        res.status(500).json({ message: "Что-то пошло не так, попробуй снова."})
    }
});

router.put('/card/:id', async (req, res) => {
    try {
        const list = req.body.userList;
        const updateQuery = 'UPDATE ?? SET ??=? WHERE ??=?';
        const formatUpdateQuery = mysql.format(updateQuery, ["events", "guest_list", list, "id", req.params.id]);
        
        connection.query(formatUpdateQuery, (err, result) => {
            if (err) {
                res.status(400);
                res.send({message: 'Такого мероприятия не существует.'})
            }

            if (result) {
                res.status(201);
                res.send({message: 'Участники добавлены.'})
            }
        })
    }
    catch(e) {
        res.status(500).json({ message: "Что-то пошло не так, попробуй снова."})
    }
})

module.exports = router;