import pool from "../db.js"
import { getConversationsQry, getUserNameQry, getMessagesByIdQry, addNewMessageQry, addNewConversationQry, getNewConversationQry } from "../dbQueries/messengerQry.js"

export const getConversations = async (id) => {
    const conn = await pool.getConnection()
    let response = {}
    try{
        const [rows,fields] = await conn.execute(getConversationsQry(),[id,id])
        response.data =  rows
    }
    catch(err){
        response.error = err
    }
    finally{
        pool.releaseConnection(conn)
    }

    return response

}

export const addNewConversation = async (req) => {
    const conn = await pool.getConnection()
    let response = {}
    try{
        const [rows,fields] = await conn.execute(addNewConversationQry(),[req.body.senderId, req.body.receiverId])
        response.data =  rows.affectedRows
    }
    catch(err){
        response.error = err
    }
    finally{
        pool.releaseConnection(conn)
    }

    return response

}

export const getNewConversation = async (req) => {
    const conn = await pool.getConnection()
    let response = {}
    try{
        const [rows,fields] = await conn.execute(getNewConversationQry(),[req.body.senderId, req.body.receiverId])
        response.data =  rows
    }
    catch(err){
        response.error = err
    }
    finally{
        pool.releaseConnection(conn)
    }

    return response

}

export const getUserName = async (id) => {
    const conn = await pool.getConnection()
    let response = {}
    try{
        const [rows,fields] = await conn.execute(getUserNameQry(),[id])
        const [{Name}] = rows
        response.data =  Name
    }
    catch(err){
        response.error = err
    }
    finally{
        pool.releaseConnection(conn)
    }

    return response

}

export const getMessagesById = async (id) => {
    const conn = await pool.getConnection()
    let response = {}
    try{
        const [rows,fields] = await conn.execute(getMessagesByIdQry(),[id])
        response.data =  rows
    }
    catch(err){
        response.error = err
    }
    finally{
        pool.releaseConnection(conn)
    }

    return response

}

export const addNewMessage = async (req) => {
    const conn = await pool.getConnection()
    let response = {}
    try{
        const [rows,fields] = await conn.execute(addNewMessageQry(),
        [req.body.conversationId, req.body.msg, req.body.senderId, req.body.receiverId]
    )
        response.data =  rows.affectedRows
    }
    catch(err){
        response.error = err
    }
    finally{
        pool.releaseConnection(conn)
    }

    return response

}