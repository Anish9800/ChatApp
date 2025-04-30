import prof1 from "../public/profiles/prof1.jpg"
import "../css/component.scss"

const Conversation = ({name}) => {
    return (
        <div className="conversation">
            <img className="conversationImg" src={prof1} alt="profile picture"/>
            <span className="conversationName">{name}</span>
        </div>
    )
}

export default Conversation