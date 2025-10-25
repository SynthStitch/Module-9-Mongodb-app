const express = require("express")
const router = express.Router()
const Controllers = require("../controllers")

// http://localhost:8180/api/posts/:uid
router.get('/:uid', (req, res)=> {
  Controllers.postController.getUserPosts(req, res)
})

// http://localhost:8180/api/posts/create
router.post('/create', (req, res)=> {
  Controllers.postController.createPost(req, res)
})

module.exports = router;