const User = require("../../models/user.model");
const usersSocket = require("../../sockets/client/users.socket");


// [GET] /users/not-friend
module.exports.notFriend = async (req, res) => {
    // SocketIO
    usersSocket(res);
    // End SocketIO

    const userId = res.locals.user.id;

    const requestFriends = res.locals.user.requestFriends;
    const acceptFriends = res.locals.user.acceptFriends;
    const friendsListId = res.locals.user.friendsList.map(item => item.user_id);

    const users = await User.find({
    $and: [
        { _id: { $ne: userId } },
        { _id: { $nin: requestFriends } },
        { _id: { $nin: acceptFriends } },
        { _id: { $nin: friendsListId } }
    ],
    status: "active",
    deleted: false
    }).select("id fullName avatar");

    res.render("client/pages/users/not-friend", {
        pageTitle: "Danh sách người dùng",
        users: users
    });
};

// [GET] /users/request
module.exports.request = async (req, res) => {
    // SocketIO
    usersSocket(res);
    // End SocketIO
  
    const requestFriends = res.locals.user.requestFriends;
  
    const users = await User.find({
        _id: { $in: requestFriends },
        status: "active",
        deleted: false
    }).select("id fullName avatar");
  
    console.log(users);
  
    res.render("client/pages/users/request", {
        pageTitle: "Lời mời đã gửi",
        users: users
    });
};

// [GET] /users/accept
module.exports.accept = async (req, res) => {
    // SocketIO
    usersSocket(res);
    // End SocketIO
  
    const acceptFriends = res.locals.user.acceptFriends;
  
    const users = await User.find({
        _id: { $in: acceptFriends },
        status: "active",
        deleted: false
    }).select("id fullName avatar");
    
    res.render("client/pages/users/accept", {
        pageTitle: "Lời mời đã nhận",
        users: users
    });
};

// [GET] /users/friends
module.exports.friends = async (req, res) => {
    const friendsList = res.locals.user.friendsList
    const friendsListId = res.locals.user.friendsList.map(item => item.user_id)

    const users = await User.find({
        _id: { $in: friendsListId },
        status: "active",
        deleted: false
    }).select("id fullName avatar statusOnline")

    // for (const user of users) {
    //     const infoUser = friendsList.find(item => item.user_id == user.id);
    //     user.roomChatId = infoUser.room_chat_id;
    // }

    res.render("client/pages/users/friends", {
        pageTitle: "Danh sách bạn bè",
        users: users
    });
}