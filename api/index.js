import express from "express"
import cors from "cors"
import cookieParser from "cookie-parser"
import authRouters from "./routes/authRouter.js"
import userRouters from "./routes/userRouter.js"
import messengerRouters from "./routes/messengerRouter.js"
import "./db.js"

const app = express()
const port = process.env.PORT || 3000
const corsOptions = {
    origin: 'http://localhost:5173',
    credentials: true,
    optionSucessStatus:200
}

//body-parser (parses incoming requests with JSON payload)
app.use(express.json())
app.use(cors(corsOptions))
app.use(cookieParser())

app.use("/api/auth", authRouters)
app.use("/api/user", userRouters)
app.use("/api/messenger", messengerRouters)

app.listen(port,()=>{
    console.log("server is running")
})