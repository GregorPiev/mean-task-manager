const express = require('express');
const router = express.Router();
const Users = require('../models/users');
const { body, validationResult } = require('express-validator');

console.log('Router account');

router.post('/login',
    [
        body('username', 'Please enter username value').not().isEmpty(),
        body('password', 'Please enter password value').exists()
    ],
    async (req, res) => {
        console.log('Login login:', req.body);
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(500).json({ error: errors.array() })
        }

        try {
            let user = Users.findOne(
                {
                    where: {
                        userName: req.body.userName,
                        password: req.body.password
                    }
                }
            )

            if (!user) {
                return res.status(400).json({ error: [{ msg: 'Invalid credentials' }] })
            } else {
                return res.status(202).json({ msg: 'Success' });
            }
        } catch (err) {
            console.log('Server Error:', err.message);
            return res.status(500).json({ error: errors.array() });
        }

    });

module.exports = router;