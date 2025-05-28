import Login from "@/components/login/Login"
import SignUp from "@/components/signup/SignUp"
import { Route, Routes } from "react-router-dom"

function UserRoute() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/signup" element={<SignUp/>} />
    </Routes>
  )
}

export default UserRoute
