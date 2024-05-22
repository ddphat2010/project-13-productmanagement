const RoomChat = require("../../models/rooms-chat.model");

module.exports.isAccess = async (req, res, next) => {
    const roomChatId = req.params.roomChatId;
    const userId = res.locals.user.id;

    try {
        const isAccessRoomChat = await RoomChat.findOne({
            _id: roomChatId,
            "users.user_id": userId,
            deleted: false
        })
    
        if(isAccessRoomChat) {
            next()
        } else {
        res.redirect("/")
        }
    } catch (error) {
        res.redirect("/")
    }


}