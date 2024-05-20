const Chat = require("../../models/chat.model");
const User = require("../../models/user.model");

// [GET] /chat/
module.exports.index = async (req, res) => {
    const userId = res.locals.user.id;
    const fullName = res.locals.user.fullName;

    // SocketIO
    _io.once("connection", (socket) => {
        // Người dùng gửi tin nhắn lên server
        socket.on("CLIENT_SEND_MESSAGE", async (content) => {
          const chat = new Chat({
            user_id: userId,
            content: content
          });
    
          await chat.save();
    
          // Trả data ra giao diện realtime
          _io.emit("SERVER_SEND_MESSAGE", {
            userId: userId,
            fullName: fullName,
            content: content
          })
        });
      });
      // End SocketIO
    
      // Lấy data từ database
      const chats = await Chat.find({
        deleted: false
      });
    
      for (const chat of chats) {
        const infoUser = await User.findOne({
          _id: chat.user_id
        }).select("fullName");
    
        chat.infoUser = infoUser;
      }
    
      console.log(chats);
      // Hết Lấy data từ database
    
      res.render("client/pages/chat/index", {
        pageTitle: "Chat",
        chats: chats
      });

  };