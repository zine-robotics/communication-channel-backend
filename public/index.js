// vars for testing

var socket = io();

var userid = document.getElementById("userid");
var roomid = document.getElementById("roomid");
var msg = document.getElementById("msg");
var send = document.getElementById("send");
var join = document.getElementById("join");
var chatForm = document.getElementById("chat-form");
var joinForm = document.getElementById("join-form");
var chat = document.getElementById("chat");
var roomId, userId, name;

const acknowledgement = (ack) => {
  if (ack) {
    alert(ack);
  }
};

joinForm.addEventListener("submit", (e) => {
  e.preventDefault();
  roomId = e.target.elements.roomid.value;
  userId = e.target.elements.userid.value;
  name = e.target.elements.name.value;
  socket.emit("join-room", { userId, name, roomId }, acknowledgement);
});

socket.on("message", (data) => {
  var mtag = document.createElement("p");
  var msg = document.createTextNode(
    `${data.sender} & senderid: ${data.userId} message: ${data.message}`
  );
  mtag.appendChild(msg);
  chat.appendChild(mtag);
});

chatForm.addEventListener("submit", (e) => {
  e.preventDefault();
  message = e.target.elements.msg.value;
  socket.emit("message", { userId, message }, acknowledgement);
});
