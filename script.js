const socket = io("https://kurokeeesh-chat-backend-production.up.railway.app");

const chatBox = document.getElementById("chat-box");
const messageInput = document.getElementById("message-input");
const sendBtn = document.getElementById("send-btn");
const usernameInput = document.getElementById("username");
const setUsernameBtn = document.getElementById("set-username");

let username = "";

// Définir le pseudo avant d'envoyer des messages
setUsernameBtn.addEventListener("click", () => {
    const enteredUsername = usernameInput.value.trim();
    if (enteredUsername) {
        username = enteredUsername;
        usernameInput.disabled = true;
        setUsernameBtn.disabled = true;
        alert("Pseudo défini : " + username);
    } else {
        alert("Veuillez entrer un pseudo valide !");
    }
});

// Envoyer un message avec le pseudo
sendBtn.addEventListener("click", () => {
    const message = messageInput.value.trim();
    if (message && username) {
        socket.emit("message", { username, message });
        messageInput.value = "";
    } else if (!username) {
        alert("Veuillez d'abord entrer un pseudo !");
    }
});

// Recevoir et afficher les messages
socket.on("message", (data) => {
    const msgElement = document.createElement("p");
    msgElement.innerHTML = `<strong>${data.username}:</strong> ${data.message}`;
    chatBox.appendChild(msgElement);
    chatBox.scrollTop = chatBox.scrollHeight;
});