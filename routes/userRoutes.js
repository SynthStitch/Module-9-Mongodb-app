let express = require("express");
let router = express.Router();
let Controllers = require("../controllers"); // index.js

// http://localhost:8180/api/users


// Adds a GET route to return all users
router.get('/', (req, res) => {
    Controllers.userController.getUsers(res);
})
// Adds a POST route to create a new user
// http://localhost:8180/api/users/create
router.post('/create', (req, res) => {
    Controllers.userController.createUser(req.body, res);
})

// http://localhost:8180/api/users/:id
// Adds a DELETE route to delete a user by ID
router.delete('/:id', (req, res) => {
    Controllers.userController.deleteUser(req, res);
})

// Adds a PUT route to update a user by ID
router.put('/:id', (req, res) => {
    Controllers.userController.updateUser(req, res);
})



module.exports = router;