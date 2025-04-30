import { Link } from "react-router-dom"
import { useEffect, useContext } from "react"
import { AuthContext } from "../context/Context"
import "../css/logout.scss"

const Logout = () => {
    const {logout} = useContext(AuthContext)
    useEffect(()=>{
        const logoutUser = async () => {
            try{
                await logout()
            }
            catch(err){
                console.log(err)
            }
        }
        logoutUser()
    },[0])
    return(
        <div className="logout">
            <h1>You have been logged out</h1>
            <Link to="/login">Click to log in</Link>
        </div>
    )
}

export default Logout