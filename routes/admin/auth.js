const express = require("express");
const router = express.Router();
const { signup, signin } = require("../../controllers/admin/auth");
const { requireSignin,userMiddleware,adminMiddleware } = require("../../middlewares")
const { createUser,createMessage } = require("../../controllers/admin/create")
const { readUser, readRoom } = require("../../controllers/admin/read")
const { deleteUser,deleteConversation,deleteMessages } = require("../../controllers/admin/delete")

const { updateUser,updateRoom } = require("../../controllers/admin/update")
const {    createRoom,getMessages  } = require("../../controllers/chat");

router.post("/admin/signup", signup);

router.post("/admin/signin", signin);

router.post("/admin",requireSignin,adminMiddleware,(req,res) => {

    return res.status(200).json({ error: "no error" });
});

router.post("/admin/messages/add", createMessage);
router.post("/admin/messages/read", getMessages);
router.post("/admin/messages/delete", deleteMessages);

router.post("/admin/user/add", createUser);
router.post("/admin/user/read", readUser);
router.post("/admin/user/update", updateUser);
router.post("/admin/user/delete", deleteUser);

router.post("/admin/rooms/add", createRoom);
router.post("/admin/rooms/read", readRoom);
router.post("/admin/rooms/update", updateRoom);
router.post("/admin/rooms/delete", deleteConversation);

module.exports = router;
