console.log('Router login');
const { Router } = require('express');
const { Users } = require('../models/tasksManager');
const router = Router();

router.get('/login', (req, res) => {
    res.status(200).json({ msg: 'Loading' })
});
router.post('/login', async (res, req) => {

});

module.exports = router;