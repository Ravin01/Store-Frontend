/* eslint-disable react/prop-types */
import axios from "axios"
import { useEffect, useState } from "react"
import { backendUrl } from "../../config"
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import '../Styles/Cart.css'

const Cart = ({ setIsCartOpen, isCartOpen, isHistoryAdded, setIsHistoryAdded}) => {

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
                setUsersCart(response.data.cart)
            }
        }catch(err){
            console.log(err)
        }
    }

    let handleCloseCart = ()=>{
        setIsCartOpen(!isCartOpen)
    }
    const handleBuyProduct = async(id) =>{
        try{
            let findResponse = await axios.get(`${backendUrl}/products/${userEmail}/${id}`,{
              headers : {
                "auth-token" : accessToken
              }
            })
            if(findResponse.status === 402){
              toast.error(findResponse.data.msg, {
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
              let cartResponse = await axios.post(`${backendUrl}/normalUser/history/${userEmail}`, findResponse.data,{
                headers : {
                  "auth-token" : accessToken
                }
              })
              console.log(cartResponse)
              if(cartResponse.status === 409){
                toast.error(cartResponse.data.msg, {
                  position: "top-right",
                  autoClose: 5000,
                  hideProgressBar: false,
                  closeOnClick: true,
                  pauseOnHover: true,
                  draggable: true,
                  progress: undefined,
                  theme: "dark",
                });
              }else if(cartResponse.status === 402){
                toast.error(cartResponse.data.msg, {
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
                setIsHistoryAdded(!isHistoryAdded)
                toast.success(cartResponse.data.msg, {
                  position: "top-right",
                  autoClose: 5000,
                  hideProgressBar: false,
                  closeOnClick: true,
                  pauseOnHover: true,
                  draggable: true,
                  progress: undefined,
                  theme: "dark",
                });
              }
            }
        }catch(err){
            console.log(err)
        }
    }
    useEffect(()=>{
        getUsersCartDetails()
    },[])
  return (
    <div className="cart-con" >
        <h4>Cart</h4>
        <div className="cart-items">
            {usersCart.length === 0 ? 
            <div className="cart-empty">
                <p>Your cart is empty</p>
            </div>
            :
            usersCart.map((d,i)=>(
                <div className="cart-item" key={i}>
                    <img src={d.image} alt="loading" className="cart-item-img" />
                    <div className="cart-item-price-con">
                    <h4 className="" >{d.productName}</h4>
                    <h6>&#8377;{d.price}</h6>
                    </div>
                    <p>{d.productType}</p>
                    <button className="cart-item-btn" onClick={() => handleBuyProduct(d.productId)} >Buy Now</button>
                </div>
            ))}
        </div>
        <button className="cart-x" onClick={handleCloseCart}>
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

export default Cart