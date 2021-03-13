const Message = require("../models/message");
const users = [];

// Join user to chat
function userJoin(id, username, room) {
  const user = { id, username, room };

  users.push(user);
  return user;
}

// Get current user
function getCurrentUser(id) {
  return users.find((user) => user.id === id);
}

// User leaves chat
function userLeave(id) {
  const index = users.findIndex((user) => user.id === id);

  if (index !== -1) {
    return users.splice(index, 1)[0];
  }
}

// Get room users
function getRoomUsers(room) {
  return users.filter((user) => user.room === room);
}

// function findUserFromDb(userId) {
//     const user = User.find.findOne({_id: })
// }
function createNewMessageInDb(userId, message, roomId, senderName) {
  const _message = new Message({
    senderId: userId,
    content: message,
    conversationId: roomId,
    senderName: senderName
  });
  /* eslint-disable */
  _message.save((error, data) => {
    /* eslint-enable */
    if (error) {
      console.log(error);
    }
  });
}
module.exports = {
  userJoin,
  getCurrentUser,
  userLeave,
  getRoomUsers,
  createNewMessageInDb,
};
