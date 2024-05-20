// CLIENT_SEND_MESSAGE
const formSendData = document.querySelector(".chat .inner-form");
if(formSendData) {
  const inputContent = formSendData.querySelector("input[name='content']");
  formSendData.addEventListener("submit", (event) => {
    event.preventDefault();
    const content = inputContent.value;
    if(content) {
      socket.emit("CLIENT_SEND_MESSAGE", content);
      inputContent.value = "";
    }
  });
}
// End CLIENT_SEND_MESSAGE

// SERVER_SEND_MESSAGE
socket.on("SERVER_SEND_MESSAGE", (data) => {
    const body = document.querySelector(".chat .inner-body");
    const myId = document.querySelector("[my-id]").getAttribute("my-id");
  
    const div = document.createElement("div");
    let htmlFullName = "";
  
    if(myId != data.userId) {
      div.classList.add("inner-incoming");
      htmlFullName = `<div class="inner-name">${data.fullName}</div>`;
    } else {
      div.classList.add("inner-outgoing");
    }
  
    div.innerHTML = `
      ${htmlFullName}
      <div class="inner-content">${data.content}</div>
    `;
  
    body.appendChild(div);
    body.scrollTop = body.scrollHeight;
  })
  // End SERVER_SEND_MESSAGE
  
  // Scroll Chat To Bottom
  const bodyChat = document.querySelector(".chat .inner-body");
  if(bodyChat) {
    bodyChat.scrollTop = bodyChat.scrollHeight;
  }
  // End Scroll Chat To Bottom