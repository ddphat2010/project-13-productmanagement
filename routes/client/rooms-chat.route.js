const express = require("express");
const router = express.Router();

const controller = require("../../controllers/client/rooms-chat.controller");

// const chatMiddleware = require("../../middlewares/client/chat.middleware");

router.get(
    "/", 
    // chatMiddleware.isAccess, 
    controller.index
);

module.exports = router;