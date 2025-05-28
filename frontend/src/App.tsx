import { ToastContainer } from "react-toastify"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import UserRoute from "./routes/userRoute/UserRoute"

function App() {

  return (
    <BrowserRouter>
      <ToastContainer />
      <Routes>
        <Route path="/*" element={<UserRoute />} />
      </Routes>
    </BrowserRouter>

  )
}

export default App
