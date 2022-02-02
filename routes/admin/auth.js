const express = require("express");
const router = express.Router();
const { signup, signin } = require("../../controllers/admin/auth");
const { requireSignin,userMiddleware,adminMiddleware } = require("../../middlewares")
const { createUser } = require("../../controllers/admin/create")
const { readUser, readRoom } = require("../../controllers/admin/read")

const { updateUser } = require("../../controllers/admin/update")
const {    createRoom  } = require("../../controllers/chat");

router.post("/admin/signup", signup);

router.post("/admin/signin", signin);

router.post("/admin",requireSignin,adminMiddleware,(req,res) => {

    return res.status(200).json({ error: "no error" });
});


router.post("/admin/user/add", createUser);

router.post("/admin/user/read", readUser);


router.post("/admin/user/update", updateUser);

router.post("/admin/rooms/add", createRoom);
router.post("/admin/rooms/read", readRoom);

module.exports = router;
