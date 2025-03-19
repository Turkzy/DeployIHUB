const express = require("express");
const { createAccount, login, getUser, getAllUsers, addUser, editUser, deleteUser } = require("../controllers/authController");
const { authenticateToken } = require("../utils/authMiddleware");

const router = express.Router();

router.post("/create-account", createAccount);
router.post("/login", login);
router.get("/get-user", authenticateToken, getUser);


//CRUD
router.get("/all-users", getAllUsers);
router.post("/add-user", addUser);
router.put("/edit-user/:id", editUser);
router.delete("/delete-user/:id", deleteUser);



module.exports = router;