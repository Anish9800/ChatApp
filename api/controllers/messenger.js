import jwt from "jsonwebtoken"
import { getConversations, getUserName, getMessagesById, addNewMessage, addNewConversation, getNewConversation } from "../dal/messengerDal.js"

export const messages = async (req,res) => {
    const token = req.cookies.access_token
    if(!token){
        return res.status(400).json("Token is not available.")
    }
    jwt.verify(token,"jwtkey", async (error,userInfo) => {
        if(error){
            return res.status(401).json("Unauthorised user.")
        }
        if(!req.params.id){
            return res.status(400).json("Parameter is missing.")
        }
        const response = await getMessagesById(req.params.id)
        if(response.error){
            return res.status(500).json("SQL server error!")
        }
        return res.status(200).json(response.data)
    })
}

export const conversations = async (req,res) => {
    const token = req.cookies.access_token
    if(!token){
        return res.status(400).json("Token is not available.")
    }
    jwt.verify(token,"jwtkey", async (error,userInfo) => {
        if(error){
            return res.status(401).json("Unauthorised user.")
        }
        const response = await getConversations(userInfo.Id)
        if(response.error){
            return res.status(500).json("SQL server error!")
        }
        const responseArr =  await Promise.all(response.data.map(async (item) => {
                let friendId
                if(item.senderId == userInfo.Id){
                    friendId = item.receiverId
                }
                else {
                    friendId = item.senderId
                }
                const resName = await getUserName(friendId)
                if(resName.error){
                    return {error:"SQL server error!"}
                }
                return {id:item.id,friendId,friendName:resName.data}
            })
        )
        return res.status(200).json(responseArr)
        
    })
    
}

export const addConversation = async (req, res) => {
    const response = await addNewConversation(req)
    if(response.error){
        return res.status(500).json("SQL server error!")
    }
    return res.status(200).json("New conversation has been added.")
}

export const newConversation = async (req, res) => {
    const response = await getNewConversation(req)
    if(response.error){
        return res.status(500).json("SQL server error!")
    }
    return res.status(200).json(response.data)
}

export const friendOnline = (req,res) => {
    res.json("auth router res")
}

export const newMessage = async (req,res) => {
    const response = await addNewMessage(req)
    if(response.error){
        return res.status(500).json("SQL server error!")
    }
    res.status(200).json("New message has been created.")
}