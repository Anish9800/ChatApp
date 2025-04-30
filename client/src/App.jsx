import {createBrowserRouter, RouterProvider} from "react-router-dom"
import Messenger from "../pages/Messenger"
import Register from "../pages/Register"
import Login from "../pages/Login"
import Layout from "../components/Layout"
import Logout from "../components/Logout"
import "../css/main.scss"
//import { isActiveUser } from "../loaders/loader"

function App() {
  const router = createBrowserRouter([
    {
      path : "/",
      element: <Layout />,
      children: [
        {
          index: true,
          element: <Messenger />
        }
      ]
    },
    {
      path : "/register",
      element: <Register />
    },
    {
      path : "/login",
      element: <Login />
    },
    {
      path : "/logout",
      element: <Logout />
    }
  ])

  return (
    <div>
        <RouterProvider router={router}/>
    </div>
  )
}

export default App
