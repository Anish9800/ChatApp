import { redirect } from "react-router-dom"

export const isActiveUser = () => {
    return localStorage.getItem("user") ? redirect("/") : redirect("/login")
}