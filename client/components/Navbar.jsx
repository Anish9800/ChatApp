import prof1 from "../public/profiles/prof1.jpg"
import { Link } from "react-router-dom"
import { AuthContext } from "../context/Context"
import { useContext } from "react"

const Navbar = () => {
    const {currentUser, logout} = useContext(AuthContext)

    return (
        <div className="navbar">
            <div className="profile">
                <img src={prof1} alt="profile picture"/>
            </div>
            <Link to="/logout">Logout</Link>
        </div>
    )
}

export default Navbar