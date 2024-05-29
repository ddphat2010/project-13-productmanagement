const express = require("express");
const router = express.Router();

const controller = require("../../controllers/client/rooms-chat.controller");

// const chatMiddleware = require("../../middlewares/client/chat.middleware");

router.get(
    "/", 
    // chatMiddleware.isAccess, 
    controller.index
);

router.get(
    "/create", 
    // chatMiddleware.isAccess, 
    controller.create
);

router.post(
    "/create", 
    // chatMiddleware.isAccess, 
    controller.createPost
);

module.exports = router;