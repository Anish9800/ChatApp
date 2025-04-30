import bcrypt from "bcrypt"
import pool from "../db.js"
import { checkUserQry, registerUserQry } from "../dbQueries/authQry.js"

export const isUserAlreadyPresent = async (req) => {
    const conn = await pool.getConnection()
    let response = {}
    try{
        const [rows,fields] = await conn.execute(checkUserQry(),[req.body.mobile])
        response.data =  rows.length
    }
    catch(err){
        response.error = err
    }

    return response
}

export const registerUser = async (req) => {
    const password = bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(10))
    const conn = await pool.getConnection()
    let response = {}
    try{
        const [rows,fields] = await conn.execute(registerUserQry(),[req.body.fname, req.body.mobile, password])
        response.data =  rows.affectedRows
    }
    catch(err){
        response.error = err
    }

    return response
}

export const checkUserLogin = async (req) => {
    const conn = await pool.getConnection()
    let response = {}
    try{
        const [rows,fields] = await conn.execute(checkUserQry(),[req.body.mobile])
        const [{Password,Mobile, ...other}] = rows
        const isValid = bcrypt.compareSync(req.body.password, Password  )
        response.data = {isValid, userData: other}
    }
    catch(err){
        response.error = err
    }

    return response
}