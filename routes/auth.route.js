const { Router } = require('express');
const crypt = require('bcryptjs');
const { check, validationResult } = require('express-validator');
const webToken = require('jsonwebtoken');
const router = Router();
const config = require('config');
const mysql = require('mysql');
const connection = mysql.createConnection(config.get('mysqlConfig'));

router.post(
    '/register',
    [
        check('email', 'Incorrectly email').isEmail(),
        check('password', 'Incorrectly password').isLength({ min: 3 }),
        check('nickname', 'Incorrectly nickname').notEmpty()
    ],
     async (req, res) => {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({
                    errors: errors.array(),
                    message: 'Incorrectly data'
                })
            }

            const { nickname, firstname, lastname, phone, email, password } = req.body;

            const hashedPassword = await crypt.hash(password, 12);

            const insertQuery = 'INSERT INTO ?? VALUES (default,?,?,?,?,?,?,NOW(),NOW())';
            const formatInsertQuery = mysql.format(insertQuery, ["users", nickname, firstname, lastname, phone, email, hashedPassword]);

            connection.query(formatInsertQuery, (err) => {
                    if (err) {
                        res.status(400);
                        res.send({message: 'Такой пользователь уже существует'})
                    }; 
                    res.status(201);
                    res.send({message: "Пользователь создан"});                 
                }
            )
            
        } catch (error) {
            res.status(500).json({ message: "Что-то пошло не так, попробуй снова."})
        }
});

router.post(
        '/login',
        [
            check('email', 'Take correct email').normalizeEmail().isEmail(),
            check('password', 'Take correct password').exists()
        ], 
        async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({
                errors: errors.array(),
                message: 'Incorrectly data, change email or pussword'
            })
        }

        const { email, password } = req.body;

        const selectQuery = 'SELECT ??,??,??,?? FROM ?? WHERE ??=?';
        const formatSelectQuery = mysql.format(selectQuery, ["id", "nicname", "email", "password", "users", "email", email])

        connection.query(formatSelectQuery, (err, result) => {
            if (err) {
                res.status(400);
                res.send({message: 'Такой пользователь не найден.'})
            }

            if (result.length) {
                const user = result[0];
                
                const isMuch = crypt.compare(password, user.password);
                if (!isMuch) {
                    res.status(400);
                    res.send({message: 'Введите правильный пароль.'})
                }
                const token = webToken.sign(
                    {userId: user.id, userName: user.nicname}, 
                    config.get('webTokenSecret'),
                    { expiresIn: '3h'});

                res.send({ token, userId: user.id, userName: user.nicname});
            };
        });

    } catch (error) {
        res.status(500).json({ message: "Что-то пошло не так, попробуй снова."})
    }        

});

module.exports = router;