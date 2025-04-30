const io = require("socket.io")(8900, {
    cors : {
        origin: "http://localhost:5173"
    }
})

let users = []

const addUser = (userId, socketId) => {
    !users.some(user => user.userId == userId) && users.push({userId,socketId})
}

const removeUser = (socketId) => {
    users = users.filter(user => user.socketId!=socketId)
}

const getReceiverSocketId = (userId) => {
    console.log(users)
    return users.find(user => user.userId == userId)
}

//when a user connects
io.on("connection", (socket) => {
    console.log("a user connected.")
    //to receive an event from client, use socket.on
    socket.on("addUser", userId => {
        addUser(userId,socket.id)
        //to emit an event to all client, use io.emmit
        io.emit("getUsers", users)
    })

//send or receive messages
    socket.on("sendMessage", ({senderId, receiverId, msg}) => {
        const user = getReceiverSocketId(receiverId)
        console.log(user)
        //to send a message to a specfic user id (privately)
        io.to(user?.socketId).emit("getMessage", {
            senderId,
            receiverId,
            msg
        })
    })

//when a user disconnects
    socket.on("disconnect", () => {
        console.log("a user has been disconnected!")
        removeUser(socket.id)
        io.emit("getUsers", users)
    })
})

