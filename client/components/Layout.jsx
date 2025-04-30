import { useContext, useEffect } from "react"
import Navbar from "./Navbar"
import { Outlet, useNavigate } from "react-router-dom"
import { AuthContext } from "../context/Context"

const Layout = () => {
    const {currentUser} = useContext(AuthContext)
    const navigate = useNavigate()
    useEffect(() => {
        if(!currentUser){
            navigate("/login")
        }
    },[0])

    return (
        <>
            <Navbar />
            <Outlet />
        </>
    )
}

export default Layout