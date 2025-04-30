import pool from "../db.js"
import { getUserByIdQry } from "../dbQueries/userQry.js"

export const getUserById = async (users) => {
    const conn = await pool.getConnection()
    let response = {}
    let userIds = ""
    users.map(user => {
        userIds += user.userId + ","
    })
    userIds = userIds.slice(0, -1)
    try{
        const [rows,fields] = await conn.execute(getUserByIdQry(userIds))
        response.data = rows
    }
    catch(err){
        response.error = err
    }
    finally{
        pool.releaseConnection(conn)
    }

    return response
}