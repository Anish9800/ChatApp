import { getUserById } from "../dal/userDal.js"

export const user = async (req,res) => {
    const users = req.body
    if(!users){
        return res.status(400).json("Invalid user parameter!")
    }
    const response = await getUserById(users)
    if(response.error){
        return res.status(500).json("SQL server error!")
    }
    return res.status(200).json(response.data)
}
