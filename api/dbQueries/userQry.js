export const getUserByIdQry = (userIds) => {
    const qry = `SELECT u.Id, u.Name, u.Img FROM chat.users as u WHERE u.Id IN (${userIds})`;
    return qry
}