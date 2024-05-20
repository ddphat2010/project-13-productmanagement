import * as Popper from 'https://cdn.jsdelivr.net/npm/@popperjs/core@^2/dist/esm/index.js';


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

  // Show Icon Chat
const buttonIcon = document.querySelector('.button-icon');

if(buttonIcon) {
  const tooltip = document.querySelector('.tooltip');
  Popper.createPopper(buttonIcon, tooltip);

  // Show Tooltip
  buttonIcon.addEventListener("click", () => {
    tooltip.classList.toggle('shown');
  });

  // Insert Icon To Input
  const emojiPicker = document.querySelector("emoji-picker");
  const inputChat = document.querySelector(".chat .inner-form input[name='content']");

  emojiPicker.addEventListener('emoji-click', event => {
    const icon = event.detail.unicode;
    inputChat.value = inputChat.value + icon;
  });
}
// End Show Icon Chat