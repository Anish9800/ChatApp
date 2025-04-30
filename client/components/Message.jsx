import prof1 from "../public/profiles/prof1.jpg"
import {format} from "timeago.js"

const Message = ({msgData, own}) => {
    return (
        <div className={own? "message own" : "message"}>
            <div className="messageTop">
                <img className="messageImg" src={prof1} alt="profile picture"/>
                <p className="messageText">{msgData.msg}</p>
            </div>
            <div className="messageBottom">{format(msgData.createdIn)}</div>
        </div>
    )
}

export default Message