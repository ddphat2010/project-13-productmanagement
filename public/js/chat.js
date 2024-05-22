import * as Popper from 'https://cdn.jsdelivr.net/npm/@popperjs/core@^2/dist/esm/index.js';

// Upload image
const upload = new FileUploadWithPreview.FileUploadWithPreview('upload-images', {
  multiple: true,
  maxFileCount: 6
});
// End Upload image


// CLIENT_SEND_MESSAGE
const formSendData = document.querySelector(".chat .inner-form");
if(formSendData) {
  const inputContent = formSendData.querySelector("input[name='content']");
  formSendData.addEventListener("submit", (event) => {
    event.preventDefault();
    const content = inputContent.value;
    const images = upload.cachedFileArray || [];

    if(content || images.length > 0) {
      socket.emit("CLIENT_SEND_MESSAGE", {
        content: content,
        images: images 
      });
      inputContent.value = "";
    //   socket.emit("CLIENT_SEND_TYPING", "hidden");
      upload.resetPreviewPanel(); // clear all selected images
    }
  });
}
// End CLIENT_SEND_MESSAGE

// SERVER_SEND_MESSAGE
socket.on("SERVER_SEND_MESSAGE", (data) => {
    const body = document.querySelector(".chat .inner-body");
    // const elementListTyping = body.querySelector(".inner-list-typing");
    const myId = document.querySelector("[my-id]").getAttribute("my-id");
  
    const div = document.createElement("div");
    let htmlFullName = "";
    let htmlContent = "";
    let htmlImages = "";
  
    if(myId != data.userId) {
      div.classList.add("inner-incoming");
      htmlFullName = `<div class="inner-name">${data.fullName}</div>`;
    } else {
      div.classList.add("inner-outgoing");
    }

    if(data.content) {
      htmlContent = `
        <div class="inner-content">${data.content}</div>  
      `;
    }
    if(data.images.length > 0) {
      htmlImages += `<div class="inner-images">`;
  
      for (const image of data.images) {
        htmlImages += `
          <img src="${image}">
        `;
      }
  
      htmlImages += `</div>`;
    }

    div.innerHTML = `
      ${htmlFullName}
      ${htmlContent}
      ${htmlImages}
    `;
  
  
    body.appendChild(div);
    // body.insertBefore(div, elementListTyping);

    body.scrollTop = body.scrollHeight;

    const gallery = new Viewer(div);
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

    // Icon
    emojiPicker.addEventListener('emoji-click', event => {
        const icon = event.detail.unicode;
        inputChat.value = inputChat.value + icon;

    // Show Typing
    // var timeOut;

    inputChat.addEventListener("keyup", () => {
      socket.emit("CLIENT_SEND_TYPING", "show");

    })
    // clearTimeout(timeOut);

    // timeOut = setTimeout(() => {
    //     socket.emit("CLIENT_SEND_TYPING", "hidden");
    // }, 3000);
    // });
  });
}
// End Show Icon Chat

// // SERVER_RETURN_TYPING
// const elementListTyping = document.querySelector(".chat .inner-body .inner-list-typing");

// socket.on("SERVER_RETURN_TYPING", (data) => {
//   if(data.type == "show") {
//     const existTyping = elementListTyping.querySelector(`.box-typing[user-id="${data.userId}"]`);

//     if(!existTyping) {
//       const boxTyping = document.createElement("div");
//       boxTyping.classList.add("box-typing");
//       boxTyping.setAttribute("user-id", data.userId);
//       boxTyping.innerHTML = `
//         <div class="inner-name">${data.fullName}</div>
//         <div class="inner-dots">
//           <span></span>
//           <span></span>
//           <span></span>
//         </div>
//       `;

//       elementListTyping.appendChild(boxTyping);
//     }
//   } else {
//     const boxTypingRemove = elementListTyping.querySelector(`.box-typing[user-id="${data.userId}"]`);

//     if(boxTypingRemove) {
//       elementListTyping.removeChild(boxTypingRemove);
//     }
//   }
// });
// // End SERVER_RETURN_TYPING

// Preview Image
if(bodyChat) {
  const gallery = new Viewer(bodyChat);
}
// End Preview Image