const RoomChat = require("../../models/rooms-chat.model");
const User = require("../../models/user.model");

module.exports = (res) => {
  _io.once("connection", (socket) => {
    // Khi A gửi yêu cầu cho B
    socket.on("CLIENT_ADD_FRIEND", async (userIdB) => {
      const userIdA = res.locals.user.id;

      // Thêm id của A vào acceptFriends của B
      const existUserAInB = await User.findOne({
        _id: userIdB,
        acceptFriends: userIdA
      });

      if(!existUserAInB) {
        await User.updateOne({
          _id: userIdB
        }, {
          $push: { acceptFriends: userIdA }
        });
      }

    //  Lấy độ dài acceptFriends của B trả về cho B
    const infoUserB = await User.findOne({
        _id: userIdB
    }).select("acceptFriends");

    const lengthAcceptFriendsB = infoUserB.acceptFriends.length;

    socket.broadcast.emit("SERVER_RETURN_LENGTH_ACCEPT_FRIEND", {
        userId: userIdB,
        lengthAcceptFriends: lengthAcceptFriendsB
    })

    // Lấy thông tin của A để trả về cho B
    const infoUserA = await User.findOne({
        _id: userIdA
    }).select("id fullName avatar")

    socket.broadcast.emit("SERVER_RETURN_INFO_ACCEPT_FRIEND", {
        userIdB: userIdB,
        infoUserA: infoUserA
    })

      // Thêm id của B vào requestFriends của A
      const existUserBInA = await User.findOne({
        _id: userIdA,
        requestFriends: userIdB
      });

      if(!existUserBInA) {
        await User.updateOne({
          _id: userIdA
        }, {
          $push: { requestFriends: userIdB }
        });
      }
    });

    // Khi A hủy gửi yêu cầu cho B
    socket.on("CLIENT_CANCEL_FRIEND", async (userIdB) => {
      const userIdA = res.locals.user.id;

        // Xóa id của A trong acceptFriends của B
        await User.updateOne({
        _id: userIdB
        }, {
        $pull: { acceptFriends: userIdA }
        });

        // Xóa id của B trong requestFriends của A
        await User.updateOne({
        _id: userIdA    
        }, {
        $pull: { requestFriends: userIdB }
        });

        // Lấy độ dài acceptFriends của B để trả về cho B
        const infoUserB = await User.findOne({
        _id: userIdB
        }).select("acceptFriends");

        const lengthAcceptFriendsB = infoUserB.acceptFriends.length;

        socket.broadcast.emit("SERVER_RETURN_LENGTH_ACCEPT_FRIEND", {
            userId: userIdB,
            lengthAcceptFriends: lengthAcceptFriendsB
        })

        // Lấy userId của A trả về cho B
        socket.broadcast.emit("SERVER_RETURN_ID_CANCEL_FRIEND", {
            userIdB: userIdB,
            userIdA: userIdA
            
        })

    });

    // Khi B từ chối kết bạn của A
    socket.on("CLIENT_REFUSE_FRIEND", async (userIdA) => {
        const userIdB = res.locals.user.id;
    
        console.log("userIdA", userIdA);
        console.log("userIdB", userIdB);
    
        // Xóa id của A trong acceptFriends của B
        await User.updateOne({
            _id: userIdB
        }, {
            $pull: { acceptFriends: userIdA }
        });
    
        // Xóa id của B trong requestFriends của A
        await User.updateOne({
            _id: userIdA    
        }, {
            $pull: { requestFriends: userIdB }
        });
    });

    // Khi B chấp nhận kết bạn của A
    socket.on("CLIENT_ACCEPT_FRIEND", async (userIdA) => {
        const userIdB = res.locals.user.id;
    
        console.log("userIdA", userIdA);
        console.log("userIdB", userIdB);

        // Tạo phòng chat mới
        const roomChat = new RoomChat({
          typeRoom: "friend",
          users: [
            {
              user_id: userIdA,
              role: "superAdmin"
            },{
              user_id: userIdB,
              role: "superAdmin"
            }
          ]
        })

        await roomChat.save();

        // Hết Tạo phòng chat mới
    
        // Thêm {user_id, room_chat_id} của A vào friendsList của B
        // Xóa id của A trong acceptFriends của B
        await User.updateOne({
            _id: userIdB
          }, {
            $push: { 
                friendsList: {
                    user_id: userIdA, 
                    room_chat_id: roomChat.id
                } 
            },
            $pull: { acceptFriends: userIdA }
          });

        // Thêm {user_id, room_chat_id} của B vào friendsList của A
        // Xóa id của B trong acceptFriends của A
        await User.updateOne({
            _id: userIdA
          }, {
            $push: { 
                friendsList: {
                    user_id: userIdB, 
                    room_chat_id: roomChat.id
                } 
            },
            $pull: { requestFriends: userIdB }
          });

    });
  });
}

