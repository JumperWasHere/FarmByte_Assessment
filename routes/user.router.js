var express = require('express');
var router = express.Router();
const user = require('../controllers/user.controller')



router.get('/', user.getAllUsers);
router.post('/', user.addUser);
router.put('/:id', user.updateUser);
router.delete('/:id', user.deleteUser);


//
router.post('/inserData', user.addData);
module.exports = router;
