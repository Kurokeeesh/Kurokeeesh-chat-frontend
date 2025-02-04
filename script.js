const socket = io("https://kurokeeesh-chat-backend-production.up.railway.app/"); // Connexion au serveur
socket.on("connect", () => {
    console.log("Connecté au serveur !");
});

const chatBox = document.getElementById("chat-box");
const messageInput = document.getElementById("message-input");
const sendBtn = document.getElementById("send-btn");

sendBtn.addEventListener("click", () => {
    let message = messageInput.value.trim(); // Supprime les espaces
    if (message !== "") {
        console.log("Envoi du message :", message);
        socket.emit("message", message);
        messageInput.value = ""; // Vide le champ après l'envoi
    }
});


socket.on("message", (msg) => {
    console.log("Message reçu :", msg);
    const msgElement = document.createElement("p");
    msgElement.textContent = msg;
    chatBox.appendChild(msgElement);
    chatBox.scrollTop = chatBox.scrollHeight;
});

