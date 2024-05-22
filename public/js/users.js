// Gửi yêu cầu kết bạn
const listBtnAddFriend = document.querySelectorAll("[btn-add-friend]");
if(listBtnAddFriend.length > 0) {
  listBtnAddFriend.forEach(button => {
    button.addEventListener("click", () => {
      button.closest(".box-user").classList.add("add");

      const userId = button.getAttribute("btn-add-friend");

      socket.emit("CLIENT_ADD_FRIEND", userId);
    });
  });
}
// Hết Gửi yêu cầu kết bạn

// Hủy gửi yêu cầu kết bạn
const listBtnCancelFriend = document.querySelectorAll("[btn-cancel-friend]");
if(listBtnCancelFriend.length > 0) {
  listBtnCancelFriend.forEach(button => {
    button.addEventListener("click", () => {
      button.closest(".box-user").classList.remove("add");

      const userId = button.getAttribute("btn-cancel-friend");

      socket.emit("CLIENT_CANCEL_FRIEND", userId);
    });
  });
}
// Hết Hủy gửi yêu cầu kết bạn

// Từ chối kết bạn
const listBtnRefuseFriends = document.querySelectorAll("[btn-refuse-friend]");
if(listBtnRefuseFriends.length > 0) {
  listBtnRefuseFriends.forEach(button => {
    button.addEventListener("click", () => {
      button.closest(".box-user").classList.add("refuse");

      const userId = button.getAttribute("btn-refuse-friend");

      socket.emit("CLIENT_REFUSE_FRIEND", userId);
    });
  });
}
// Hết từ chối kết bạn

// Chấp nhận lời mời kết bạn
const listBtnAcceptFriends = document.querySelectorAll("[btn-accept-friend]");
if(listBtnAcceptFriends.length > 0) {
  listBtnAcceptFriends.forEach(button => {
    button.addEventListener("click", () => {
      button.closest(".box-user").classList.add("accepted");

      const userId = button.getAttribute("btn-accept-friend");

      socket.emit("CLIENT_ACCEPT_FRIEND", userId);
    });
  });
}
// Hết Chấp nhận lời mời kết bạn