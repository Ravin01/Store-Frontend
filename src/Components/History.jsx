/* eslint-disable react/prop-types */
import axios from "axios"
import { useEffect, useState } from "react"
import { backendUrl } from "../../config"
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import '../Styles/Cart.css'

const History = ({isHistoryAdded, setIsHistoryOpen, isHistoryOpen}) => {

    const {userEmail, accessToken} = JSON.parse(sessionStorage.getItem('user'))

    const [usersCart, setUsersCart] = useState([])

    const getUsersCartDetails = async()=>{
        try{
            let response = await axios.get(`${backendUrl}/normalUser/${userEmail}`,{
              headers : {
                "auth-token" : accessToken
              }
            })
            console.log(response)
            if(response.status === 409){
                console.log(response.data.msg)
                toast.error(response.data.msg, {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "dark",
                  });
            }else if(response.status === 401){
                toast.error(response.data.msg, {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "dark",
                  });
            }else{
                setUsersCart(response.data.productBought)
                console.log(response.data.cart)
            }
        }catch(err){
            console.log(err)
        }
    }

    let handleCloseHistory = ()=>{
      setIsHistoryOpen(!isHistoryOpen)
  }
    useEffect(()=>{
        getUsersCartDetails()
    },[isHistoryAdded])
  return (
    <div className="cart-con" >
        <h4>History</h4>
        <div className="cart-items">
            {usersCart.length === 0 ? 
            <div className="cart-empty">
                <p>Your History is empty</p>
            </div>
            :
            usersCart.map((d,i)=>(
              <div className="cart-item" key={i}>
              <img src={d.image} alt="loading" className="cart-item-img" />
              <div className="cart-item-price-con">
              <h4 className="" >{d.productName}</h4>
              <h6>&#8377;{d.price}</h6>
              </div>
              <h6>{d.productType}</h6>
              {/* <button className="cart-item-btn">Buy Now</button> */}
          </div>
            ))}
        </div>
        <button className="cart-x" onClick={handleCloseHistory}>
        <i className="fa-solid fa-x"></i>
        </button>
        <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
    </div>
  )
}

export default History