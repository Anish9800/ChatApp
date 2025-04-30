import {useState, useEffect, useContext, useRef} from "react"
import "../css/messenger.scss"
import Conversation from "../components/Conversation"
import Message from "../components/Message"
import ChatOnline from "../components/ChatOnline"
import {AuthContext} from "../context/Context.jsx"
import axios from "axios"
import {io} from "socket.io-client"

const Messenger = () => {
    const {currentUser} = useContext(AuthContext)
    const [conversation, setConversation] = useState([])
    const [currentConversation, setCurrrentConversation] = useState(null)
    const [messages, setMessages] = useState([])
    const [newMessage, setNewMessage] = useState("")
    const msgScroller = useRef(null)
    const socket = useRef(null)
    const newConversationRef = useRef(null)
    const [socketMsg, setSocketMsg] = useState({})
    const [onlineFriend, setOnlineFriend] = useState([])

    useEffect(() => {
        socket.current = (io("ws://localhost:8900"))
        socket.current.on("getMessage", (msgFromSocket)=>{
            setSocketMsg({
                conversationId:currentConversation?.id, 
                msg:msgFromSocket.msg, 
                senderId:msgFromSocket.senderId, 
                receiverId: msgFromSocket.receiverId
            })
        })
    },[])

    useEffect(() => {
        socket.current.emit("addUser", currentUser.Id)
        socket.current.on("getUsers", users => {
            const getUserfromDb = async () => {
                try{
                    if(users){
                        const response = await axios.post(`/user`, users, {withCredentials: true})
                        setOnlineFriend(response.data)
                    }
                }
                catch(err){
                    console.log(err)
                }
            }
            getUserfromDb()
        })
    },[currentUser])


    useEffect(() => {
        socketMsg && currentConversation?.friendId==socketMsg.senderId && 
        setMessages(prev => {
            return [...prev, socketMsg]
        })
    },[socketMsg])

    useEffect(()=>{
        const getConversation = async() => {
            try{
                const response = await axios.get("/messenger/conversations", {withCredentials: true})
                setConversation(response.data)
            }
            catch(err){
                console.log(err)
            }
        }
        getConversation()
    },[currentUser?.Id, newConversationRef.current])
    
    useEffect(() => {
        const  getMessages = async () => {
            try{
                const response = await axios.get(`/messenger/messages/${currentConversation?.id}`, {withCredentials: true})
                setMessages(response.data)
            }
            catch(err){
                console.log(err)
            }
        }
        getMessages()
    },[currentConversation])

    const handleChange = (e) => {
        const {value} = e.currentTarget
        setNewMessage(value)
    }

    const handleSubmit = async () => {
        let payload
        if(!currentConversation.id){
            let payloadForNewCon = {
                senderId:currentUser.Id, 
                receiverId: currentConversation.friendId
            }

            try{
                await axios.post("/messenger/conversations",payloadForNewCon, {withCredentials: true})
                const response = await axios.get("/messenger/conversations", {withCredentials: true})
                const responseId = await axios.post("/messenger/newConversation", payloadForNewCon, {withCredentials: true})
                setConversation(response.data)
                let newConversationId = responseId.data[0]["id"]

                payload = {
                    conversationId:newConversationId, 
                    msg:newMessage, 
                    senderId:currentUser.Id, 
                    receiverId: currentConversation.friendId
                }
                newConversationRef.current = newConversationId
                setCurrrentConversation(prev => {
                    return {...prev, id: newConversationId}
                })
            }
            catch(err){
                console.log(err)
            }
        }
        else{
            payload = {
                conversationId:currentConversation.id, 
                msg:newMessage, 
                senderId:currentUser.Id, 
                receiverId: currentConversation.friendId
            }
        }
        

        const msgToSocket = {
            senderId:currentUser.Id, 
            receiverId: currentConversation.friendId,
            msg: newMessage
        }

        socket.current.emit("sendMessage", msgToSocket)

        try{
            await axios.post(`/messenger/messages/`,payload, {withCredentials: true})
            setMessages(prev => {
                return [... prev, payload]
            })
            setNewMessage("")
        }
        catch(err){
            console.log(err)
        }
    }

    useEffect(() => {
        msgScroller.current?.scrollIntoView({behavior: "smooth"})
    }, [messages])

    const setNewConFromOnline = (item) => {
        setCurrrentConversation({friendId: item.Id, friendName: item.Name})
        conversation.forEach(conv => {
            if(conv.friendId == item.Id){
                setCurrrentConversation(conv)
            }
        })
    }

    return (
        <div className="messenger">
            <div className="chatMenu">
                <div className="chatMenuWrapper">
                    <input type="text" placeholder="Search for friends" className="chat-menu-input"/>
                    {conversation && conversation.map(item => {
                        return (
                            <div key={item.id} onClick={() => {setCurrrentConversation(item)}}>
                                <Conversation key={item.id} name={item.friendName}/>
                            </div>
                        )
                    })}
                </div>
            </div>
            <div className="chatBox">
                <div className="chatBoxWrapper">
                    {
                        currentConversation? 
                        <>
                            <div className="chatBoxTop">
                                {messages && messages.map(item => {
                                    let ownMsg = false
                                    if(item.senderId == currentUser.Id){
                                        ownMsg=true
                                    }
                                    return (
                                        <div key={item.id} ref={msgScroller}>
                                            <Message key={item.id} msgData={item} own={ownMsg}/>
                                        </div>
                                    )
                                })}
                            </div>
                            <div className="chatBoxBottom">
                                <textarea className="chatMessageInput" placeholder="write something..." value={newMessage} onChange={handleChange}></textarea>
                                <button onClick={handleSubmit} className="chatSubmitButton">Send</button>
                            </div>
                        </>   : <span>Select a conversation to start</span> 
                    }
                </div>
            </div>
            <div className="chatOnline">
                <div className="chatOnlineWrapper">
                    {onlineFriend && onlineFriend.map(item => {
                        if(item.Id!=currentUser.Id){
                            return (
                                <div key={item.Id} onClick={()=>{setNewConFromOnline(item)}}>
                                    <ChatOnline key={item.Id} id = {item.Id} name={item.Name}/>
                                </div>
                            )
                        }
                    })}
                </div>
            </div>
        </div>
    )
}

export default Messenger