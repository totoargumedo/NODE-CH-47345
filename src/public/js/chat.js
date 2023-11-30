const socket = io();

//renderizar mensajes
socket.on("messages", (messages) => {
  renderMessages(messages);
});

//renderizar mensajes
const renderMessages = (messages) => {
  if (messages.length === 0) {
    messagesTable.innerHTML = `<div class="d-flex flex-column p-5 justify-content-center"
          <p class="text-light">No hay mensajes</p>
        </div>`;
  } else {
    const html = messages
      .map((message) => {
        return `
      <div class="d-flex flex-column p-3">
          <p class="text-light">${message.user}</p>
          <div class="chat ml-2 p-3">${message.message}</div>
        </div>
    `;
      })
      .join(" ");
    messagesTable.innerHTML = html;
  }
};

//capturar usuario
const messagesTable = document.getElementById("messagesTable");
const inputMessage = document.getElementById("inputMessage");
const inputUser = document.getElementById("inputUser");
let user = null;

inputMessage.addEventListener("keyup", (event) => {
  event.preventDefault();
  if (event.keyCode === 13) {
    //enviar mensaje
    if (!user) {
      if (inputUser.value === "") {
        inputUser.value = "Anonimo";
      }
      user = inputUser.value;
      inputUser.classList.add("d-none");
    } else {
      inputUser.classList.add("d-none");
    }
    const message = inputMessage.value.trim("/n");
    const newMessage = {
      user: user,
      message: message,
    };
    socket.emit("newMessage", newMessage);
    inputMessage.value = "";
    inputMessage.focus();
  }
});
