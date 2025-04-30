import express from "express"
import { messages, conversations, friendOnline, newMessage, addConversation, newConversation } from "../controllers/messenger.js"

const router = express.Router()

router.get("/messages/:id",messages)
router.get("/conversations",conversations)
router.post("/newConversation",newConversation)
router.post("/conversations",addConversation)
router.get("/friendOnline",friendOnline)
router.post("/messages",newMessage)

export default router