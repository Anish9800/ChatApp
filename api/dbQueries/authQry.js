export const checkUserQry = () => {
    const qry = `SELECT * FROM chat.users WHERE mobile = ?`
    return qry
}

export const registerUserQry = () => {
    const qry = `INSERT INTO chat.users (Name,Mobile,Password) VALUES(?,?,?)`
    return qry
}

export const testQry = () => {
    const qry = `SELECT * FROM chat.users WHERE mobile = ?`
    return qry
}