import Dashboard from "@/components/dashBoard/Dashboard"
import Login from "@/components/login/Login"
import ProtectedRoute from "@/components/protectedRoute/ProtectedRoute"
import SignUp from "@/components/signup/SignUp"
import { Route, Routes } from "react-router-dom"

function UserRoute() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/dashBoard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
    </Routes>
  )
}

export default UserRoute
