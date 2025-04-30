import { useState, useEffect } from "react"
import { AuthContext } from "./Context.jsx"
import axios from "axios"

const AuthContextProvider = ({children}) => {

    const [currentUser, setCurrentuser] = useState( JSON.parse(localStorage.getItem("user")) || null)
    const login = async (creds) => {
        const response = await axios.post("/auth/login", creds, {withCredentials: true})
        setCurrentuser(response.data)
    }

    const logout = async () => {
        const response = await axios.post("/auth/logout",{}, {withCredentials: true})
        setCurrentuser(null)
    }

    useEffect(() => {
        localStorage.setItem("user",JSON.stringify(currentUser))
    },[currentUser])

    return(
        <AuthContext.Provider value={{login, logout, currentUser}}>
            {children}
        </AuthContext.Provider>
    )

}

export default AuthContextProvider