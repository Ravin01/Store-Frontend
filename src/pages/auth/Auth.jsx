import { Route, Routes } from "react-router-dom"
import Login from "../../Components/Login"
import Register from "../../Components/Register"


const Auth = () => {
  return (
    <div>
        <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
        </Routes>
    </div>
  )
}

export default Auth