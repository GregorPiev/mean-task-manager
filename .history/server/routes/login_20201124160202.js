console.log('Router login');
const { Router } = require('express');
const { Users } = require('../models/tasksManager');
const { body, validationResult } = require('express-validator');
const router = Router();

router.get('/login', (req, res) => {
    res.status(200).json({ msg: 'Loading' })
});
router.post('/login',
    [
        body('username', 'Please enter username value').exists(),
        body('password', 'Please enter password value').exists()
    ],
    async (res, req) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(500).json({ error: errors.array() })
        }

        const { username, password } = req.body;
        try {
            let user = Users.findOne(
                {
                    where: {
                        userName: username,
                        password: password
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
            return res.status(500).json({ error: errors.array() };
        }

    });

module.exports = router;