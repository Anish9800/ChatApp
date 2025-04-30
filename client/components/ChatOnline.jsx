import prof1 from "../public/profiles/prof1.jpg"
import "../css/component.scss"

const ChatOnline = ({Id, name}) => {
    return (
        <div className="chatOnline">
            <div className="chatOnlineFriend">
                <div className="chatOnlineImgContainer">
                    <img className="chatOnlineImg" src={prof1} alt="profile picture"/>
                    <div className="chatOnlineBadge"></div>
                </div>
                <span className="chatOnlineName">{name}</span>
            </div>
        </div>
    )
}

export default ChatOnline