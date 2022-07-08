const express = require('express')

const { userById,
    allUser,
    getUser,
    updateUser,
    deleteUser,
    userPhoto } = require('../controllers/user')

const { requireSignin } = require('../controllers/auth')

const router = express.Router()

router.get('/users', allUser);

router.get('/user/:userId', requireSignin, getUser);

router.get('/user/photo/:userId', userPhoto);

router.put('/user/:userId', requireSignin, updateUser);

router.delete('/user/:userId', requireSignin, deleteUser);

router.param("userId", userById)


module.exports = router;