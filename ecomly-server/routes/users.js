const express = require("express");
const router = express.Router();

const usersController = require("../controllers/users");
// const wishlistController = require('../controllers/wishlists');
// const cartController = require('../controllers/cart');

router.get("/", usersController.getUsers);
router.get("/:id", usersController.getUserById);
router.put("/:id", usersController.updateUser);

module.exports = router;
