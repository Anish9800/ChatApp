export const getConversationsQry = () => {
    const qry = "SELECT * FROM chat.conversation as co WHERE (co.receiverId = ? OR co.senderId = ?) ORDER BY co.createdIn DESC";
    return qry
}

export const addNewConversationQry = () => {
    const qry = "INSERT INTO chat.conversation (senderId, receiverId, createdIn) VALUES(?,?,now())";
    return qry
}

export const getNewConversationQry = () => {
    const qry = "SELECT id FROM chat.conversation as co WHERE (co.senderId = ? AND co.receiverId = ?)";
    return qry
}

export const getUserNameQry = () => {
    const qry = "SELECT u.Name FROM chat.users as u WHERE u.Id = ?";
    return qry
}

export const getMessagesByIdQry = () => {
    const qry = "SELECT * FROM chat.messages m WHERE m.conversationId = ?";
    return qry
}

export const addNewMessageQry = () => {
    const qry = "INSERT INTO chat.messages (conversationId, msg, senderId, receiverId, createdIn) VALUES(?,?,?,?,now())";
    return qry
}