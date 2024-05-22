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

// SERVER_RETURN_LENGTH_ACCEPT_FRIEND
socket.on("SERVER_RETURN_LENGTH_ACCEPT_FRIEND", (data) => {
    const badgeUsersAccept = document.querySelector(`[badge-users-accept='${data.userId}']`);
    if(badgeUsersAccept) {
        badgeUsersAccept.innerHTML = data.lengthAcceptFriends;
    }
})
// End SERVER_RETURN_LENGTH_ACCEPT_FRIEND

// SERVER_RETURN_INFO_ACCEPT_FRIEND
socket.on("SERVER_RETURN_INFO_ACCEPT_FRIEND", (data) => {
    const dataUsersAccept = document.querySelector(`[data-users-accept='${data.userIdB}']`);
    if(dataUsersAccept) {
        const newBoxUser = document.createElement("div");
        newBoxUser.classList.add("col-6")
        newBoxUser.setAttribute("user-id", data.infoUserA._id);

        newBoxUser.innerHTML = `
        <div class="box-user">
            <div class="inner-avatar">
                <img src="https://robohash.org/hicveldicta.png" alt="${data.infoUserA.fullName}" />
            </div>
            <div class="inner-info">
                <div class="inner-name">
                    ${data.infoUserA.fullName}
                </div>
                <div class="inner-buttons">
                    <button 
                        class="btn btn-sm btn-primary mr-1" 
                        btn-accept-friend="${data.infoUserA._id}">
                        Chấp nhận
                    </button>
                    
                    <button 
                        class="btn btn-sm btn-secondary mr-1" 
                        btn-refuse-friend="${data.infoUserA._id}">
                        Xóa
                    </button>

                    <button 
                        class="btn btn-sm btn-secondary mr-1" 
                        btn-deleted-friend="" 
                        disabled="">
                        Đã xóa
                    </button>
                        
                    <button 
                        class="btn btn-sm btn-secondary mr-1" 
                        btn-accepted-friend="" 
                        disabled="">
                        Đã chấp nhận
                    </button>
                </div>
            </div>
        </div>
    
        `;

        dataUsersAccept.appendChild(newBoxUser);

        // Xóa lời mời kết bạn
        const buttonRefuse = newBoxUser.querySelector("[btn-refuse-friend]");
        buttonRefuse.addEventListener("click", () => {
            buttonRefuse.closest(".box-user").classList.add("refuse");
      
            const userId = buttonRefuse.getAttribute("btn-refuse-friend");
      
            socket.emit("CLIENT_REFUSE_FRIEND", userId);
          });
        // End Xóa lời mời kết bạn

        // Chấp nhận lời mời kết bạn
        const buttonAccept = newBoxUser.querySelector("[btn-accept-friend]");
        buttonAccept.addEventListener("click", () => {
            buttonAccept.closest(".box-user").classList.add("accepted");
      
            const userId = buttonAccept.getAttribute("btn-accept-friend");
      
            socket.emit("CLIENT_ACCEPT_FRIEND", userId);
          });
        // Hết Chấp nhận lời mời kết bạn
    }

      // Khi A gửi kết bạn cho B, danh sách người dùng của B xóa đi A
      const dataUsersNotFriend = document.querySelector(`[data-users-not-friend="${data.userIdB}"]`);
      if(dataUsersNotFriend) {
        const boxUserDelete = dataUsersNotFriend.querySelector(`[user-id="${data.infoUserA._id}"]`)
        dataUsersNotFriend.removeChild(boxUserDelete);
      }
    
})
// End SERVER_RETURN_INFO_ACCEPT_FRIEND

// SERVER_RETURN_ID_CANCEL_FRIEND
socket.on("SERVER_RETURN_ID_CANCEL_FRIEND", (data) => {
  console.log(data);
  const dataUsersAccept = document.querySelector(`[data-users-accept='${data.userIdB}']`);
  if(dataUsersAccept) {
    const boxUserA = dataUsersAccept.querySelector(`[user-id='${data.userIdA}']`);
    if(boxUserA) {
      dataUsersAccept.removeChild(boxUserA);
    }
  }
})
// End SERVER_RETURN_ID_CANCEL_FRIEND