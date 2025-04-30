import { isUserAlreadyPresent, registerUser, checkUserLogin } from "../dal/authDal.js"
import jwt from "jsonwebtoken"

export const register = async (req,res) => {
    const response = await isUserAlreadyPresent(req)
    if(response.error){
        return res.status(500).json("Something Wrong. Try again!")
    }
    if(response.data){
        return res.status(403).json("User already present, please login.")
    }
    
    const reg_response = await registerUser(req)
    if(reg_response.error){
        console.log(reg_response.error)
        return res.status(500).json("Error in creating user!")
    }
    if(!reg_response.data){
        return res.status(400).json("User not created!")
    }
    res.status(200).json("User has been created sucessfully.")
}

export const login = async (req,res) => {
    const response = await isUserAlreadyPresent(req)
    if(response.error){
        return res.status(500).json("Something Wrong. Try again!")
    }
    if(!response.data){
        return res.status(403).json("User does not exist. Please register first.")
    }
    const login_response = await checkUserLogin(req)
    if(login_response.error){
        return res.status(500).json("Error in logging in user!")
    }
    if(!login_response.data.isValid){
        return res.status(400).json("Wrong password entered!")
    }
    const {Id} = login_response.data.userData
    const token = jwt.sign({Id},"jwtkey")
    res.cookie("access_token",token,{
        httpOnly: true
    }).status(200).json(login_response.data.userData)
}

export const logout = async (req,res) => {
    res.clearCookie("access_token",{
        sameSite:"none",
        secure:true
    }).status(200).json("User has been logged out")
}
