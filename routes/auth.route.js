const { Router } = require('express');
const crypt = require('bcryptjs');
const { check, validationResult } = require('express-validator');
const webToken = require('jsonwebtoken');
const User = require('../models/User');
const router = Router();
const config = require('config');

router.post(
        '/register',
        [
            check('email', 'Incorrectly email').isEmail(),
            check('password', 'Incorrectly password').isLength({ min: 3 })
        ],
         async (req, res, next) => {
            try {
                const errors = validationResult(req);
                if (!errors.isEmpty()) {
                    return res.status(400).json({
                        errors: errors.array(),
                        message: 'Incorrectly data'
                    })
                }
                
                const { email, password } = req.body;

                const condidate = await User.findOne({ email });
                
                if (condidate) {
                    return res.status(400).json({ message: 'Такой пользователь уже существует.' });
                }

                const hashedPassword = await crypt.hash(password, 12);

                const user = new User({ email, password: hashedPassword });

                await user.save();
                res.status(201).json({ message: 'Пользователь создан.'});

            } catch (error) {
                res.status(500).json({ message: "Что-то пошло не так, попробуй снова."})
            }
            next();
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
        if (errors.isEmpty()) {
            return res.status(400).json({
                errors: errors.array(),
                message: 'Incorrectly data, change email or pussword'
            })
        }

        const { email, password } = req.body;

        const condidate = await User.findOne({ email });

        if (!condidate) {
            return res.status(400).json({ message: 'Такой пользователь не найден.' });
        }

        const isMuch = await crypt.compare(password, condidate.password);

        if (!isMuch) {
            return res.status(400).json({ message: 'Введите правильный пароль.' });
        }

        const token = webToken.sign(
            {userId: condidate.id}, 
            config.get('webTokenSecret'),
            { expiresIn: '3h'});

        res.json({ token, userId: condidate.id});
    } catch (error) {
        res.status(500).json({ message: "Что-то пошло не так, попробуй снова."})
    }        

});

module.exports = router;