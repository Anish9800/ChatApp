import "../css/register.scss"
import axios from "axios"
import { Link, useNavigate} from "react-router-dom"
import { useState } from "react"

const Register = () => {
    const [user, setUser] = useState({fname:"",mobile:"",password:""})
    const [errMsg, setErrMsg] = useState({msg:""})
    const navigate = useNavigate()

    const handleChange = (e) => {
        const {value, name} = e.currentTarget
        setUser(prev => {
            return {...prev, [name]: value}
        })

        setErrMsg({msg:""})
    }

    const handleSubmit = async (e) => {
        try{
            const response = await axios.post("http://localhost:3000/api/auth/register", user)
            navigate("/login")
            
        }
        catch(err){
            setErrMsg({msg: err.response ?.data || "Something went wrong! Try again."})
        }
    }
    return (
        <div className="registerContainer">
            <div className="register">
                <form action={handleSubmit} className="registerForm">
                    <input required type="text" placeholder="Full name" name="fname" value={user.fname} onChange={handleChange}/>
                    <input required type="tel" placeholder="mobile number" name="mobile" value={user.mobile} onChange={handleChange}/>
                    <input required type="password" placeholder="password" name="password" value={user.password} onChange={handleChange}/>
                    <button>Register</button>
                    <span className="error-msg">{errMsg.msg ? errMsg.msg : null}</span>
                    <span>Already have an account? <Link to="/login">Log in</Link></span>
                </form>
            </div>
        </div>
    )
}

export default Register