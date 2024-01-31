import { Link, Route, Routes } from "react-router-dom";


import "../../Styles/Auth.css";
import Register from "../../Components/Register";
import Login from "../../Components/Login";

const Auth = () => {
  return (
    <div className="auth-con">
      <div className="auth-base">
      <i className="fa-solid fa-cart-shopping auth-base-icon"></i>
        <h4>Store</h4>
        <div className="auth-media">
          <Link to="/auth/login" target="_blank" className="auth-media-icon">
            <i className="fa-brands fa-github"  ></i>
          </Link>
          <Link to="/auth/login" target="_blank" className="auth-media-icon">
            <i className="fa-brands fa-square-twitter"></i>
          </Link>
          <Link to="/auth/login" target="_blank" className="auth-media-icon">
            <i className="fa-brands fa-linkedin"></i>
          </Link>
          <Link to="/auth/login" target="_blank" className="auth-media-icon">
            <i className="fa-brands fa-discord"></i>
          </Link>
        </div>
      </div>
      <div className="auth-main">
        <Routes>
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </div>
    </div>
  );
};

export default Auth;
