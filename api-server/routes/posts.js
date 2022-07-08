const express = require('express')

const { getPosts,
    getPost,
    createPost,
    postedByUser,
    postById,
    isPoster,
    deletePost,
    updatePost,
    postImage } = require('../controllers/posts')

const { requireSignin } = require('../controllers/auth')

const { userById } = require('../controllers/user')

const router = express.Router()


router.get('/posts', requireSignin, getPosts);

router.get('/post/:postId', requireSignin, getPost);

router.post('/post/new/:userId', requireSignin, createPost);

router.get('/post/by/:userId', requireSignin, postedByUser);

router.get('/post/img/:postId', postImage);

router.put('/post/:postId', requireSignin, isPoster, updatePost);

router.delete('/post/:postId', requireSignin, isPoster, deletePost);

router.param("userId", userById)

router.param("postId", postById)

module.exports = router;