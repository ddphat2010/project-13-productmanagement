const Chat = require("../../models/chat.model");
const uploadToCloudinary = require("../../helpers/uploadToCloudinary.helper");

module.exports = (req, res) => {
    const userId = res.locals.user.id;
    const fullName = res.locals.user.fullName;
    const roomChatId = req.params.roomChatId;

    _io.once("connection", (socket) => {
        socket.join(roomChatId);
        // Người dùng gửi tin nhắn lên server
        socket.on("CLIENT_SEND_MESSAGE", async (data) => {

          const images = []

          for (const image of data.images) {
            const url = await uploadToCloudinary(image);
            images.push(url);
          }

          // Lưu data và database
          const chat = new Chat({
            user_id: userId,
            room_chat_id: roomChatId,
            content: data.content,
            images: images
          });
    
          await chat.save();
    
          // Trả data ra giao diện realtime
          _io.to(roomChatId).emit("SERVER_SEND_MESSAGE", {
            userId: userId,
            fullName: fullName,
            content: data.content,
            images: images
          })
        });

        //  Typing
        // socket.on("CLIENT_SEND_TYPING", (type) => {
        //     console.log(type);
        //     socket.broadcast.emit("SERVER_RETURN_TYPING", {
        //         userId: userId,
        //         fullName: fullName,
        //         type: type
        //     });
        // });
    });
}
