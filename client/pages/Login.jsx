import "../css/login.scss"
import { Link, useNavigate } from "react-router-dom"
import { useState, useContext } from "react"
import { AuthContext } from "../context/Context"

const Login = () => {

    const [userInfo, setUserInfo] = useState({mobile:"",password:""})
    const [errMsg, setErrMsg] = useState({msg:""})
    const navigate = useNavigate()
    const {login} = useContext(AuthContext)
    const handleChange = (e) => {
        const {value, name} = e.currentTarget
        setUserInfo(prev => {
            return {...prev, [name]: value}
        })
    }

    const handleSubmit = async () => {
        try{
            await login(userInfo)
            navigate("/")
        }
        catch(err){
            setErrMsg({msg: err.response ?.data || "Something went wrong! Try again."})
        } 
    }

    return (
        <div className="loginContainer">
            <div className="login">
                <form action={handleSubmit} className="loginForm">
                    <input required type="tel" placeholder="mobile number" name="mobile" value={userInfo.mobile} onChange={handleChange}/>
                    <input required type="password" placeholder="password" name="password" value={userInfo.password} onChange={handleChange}/>
                    <button>Log in</button>
                    <span>{errMsg.msg?errMsg.msg:null}</span>
                    <span>Don't have an account? <Link to="/register">Register</Link></span>
                </form>
            </div>
        </div>
    )
}

export default Login