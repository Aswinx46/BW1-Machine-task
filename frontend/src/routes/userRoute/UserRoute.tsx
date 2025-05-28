import Login from "@/components/login/Login"
import { Route, Routes } from "react-router-dom"

function UserRoute() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
    </Routes>
  )
}

export default UserRoute
