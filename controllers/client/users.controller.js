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

  const users = await User.find({
    $and: [
        { _id: { $ne: userId } },
        { _id: { $nin: requestFriends } },
        { _id: { $nin: acceptFriends } }
    ],
    status: "active",
    deleted: false
  }).select("id fullName avatar");

  console.log(users);

  res.render("client/pages/users/not-friend", {
    pageTitle: "Danh sách người dùng",
    users: users
  });
};