// [GET] /chat/
module.exports.index = async (req, res) => {
    // socketio
    _io.on("connection", (socket) => {
        console.log("Kết nối thành công !", socket.id);
      })
    // end socketio
    res.render("client/pages/chat/index", {
      pageTitle: "Chat",
    });
  };