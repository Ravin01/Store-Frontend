/* eslint-disable react/prop-types */
import Cart from "./Cart";
import History from "./History";
import "../Styles/Nav.css";
import axios from "axios";
import { backendUrl } from "../../config";
import { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Nav = ({
  isProductAdded,
  setIsProductAdded,
  isCartAdded,
  isHistoryAdded,
  setSearchInput,
  searchInput,
  setIsHistoryAdded,
  bars,
  setSideNav,
  setBars
}) => {
  const { userEmail, role, accessToken } = JSON.parse(sessionStorage.getItem("user"));
  const [openAddProduct, setOpenAddProduct] = useState(false);
  const [newProduct, setNewProduct] = useState({
    productName: "",
    productType: "",
    price: "",
    image: "",
  });
  const handleAddNewProduct = (e) => {
    const { name, value } = e.target;
    setNewProduct({ ...newProduct, [name]: value });
  };
  const handleOpenAddProduct = () => {
    setOpenAddProduct(!openAddProduct);
  };
  const handleAddProduct = async (e) => {
    e.target.preventDefault;
    try {
      console.log(newProduct);
      const response = await axios.post(
        `${backendUrl}/products/${userEmail}`,
        newProduct,{
          headers : {
            "auth-token" : accessToken
          }
        }
      );
      if (response.status === 409) {
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
      } else if (response.status === 401) {
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
      } else {
        toast.success(response.data.msg, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
        });
        setNewProduct({
          productName: "",
          productType: "",
          price: "",
          image: "",
        });
        setOpenAddProduct(!openAddProduct);
        setIsProductAdded(!isProductAdded);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isHistoryOpen, setIsHistoryOpen] = useState(false);

  const handleOpenCart = () => {
    setIsCartOpen(!isCartOpen);
  };

  const handleOpenHistory = () => {
    setIsHistoryOpen(!isHistoryOpen);
  };

  const handleSearchInput = (e) => {
    setSearchInput(e.target.value);
  };

  const [cartCount, setCartCount] = useState(0)

  const getUsersCartDetailsForCount = async()=>{
    try{
        let response = await axios.get(`${backendUrl}/normalUser/${userEmail}`,{
          headers : {
            "auth-token" : accessToken
          }
        })
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
            setCartCount(response.data.cart.length)
        }
    }catch(err){
        console.log(err)
    }
}

const handleOpenSideNav = ()=>{
  if(bars === 'bars'){
    setBars('x')
    setSideNav('home-sideNav-open')
  }else{
    setBars('bars')
    setSideNav('home-sideNav')
  }
}

useEffect(()=>{
    getUsersCartDetailsForCount()
},[isCartAdded])
  return (
    <div className="nav-container">
      {/* <div className="nav-search-con"> */}
      <div className="nav-header">
<div className="nav-bars" onClick={handleOpenSideNav} >
  <i className={`fa-solid fa-${bars}`} ></i>
</div>
      <input
        type="text"
        className="nav-search-input"
        placeholder="search products"
        onChange={handleSearchInput}
        value={searchInput}
        name="searchInput"
        />
        </div>
      {/* </div> */}
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
      <div className="nav-events-con">
        {role === 1 ? (
          <div className="nav-admin-create">
            <button
              className="nav-admin-btn-add-product"
              onClick={handleOpenAddProduct}
            >
              + Add
            </button>
            {openAddProduct && (
              <div className="nav-add-product-con">
                <select
                  value={newProduct.productType}
                  onChange={handleAddNewProduct}
                  name="productType"
                  id="productType"
                  required
                  className="nav-add-product-input"
                >
                  <option value="">Select product type</option>
                  <option value="Gadget">Gadget</option>
                  <option value="Dress">Dress</option>
                  <option value="Books">Books</option>
                  <option value="Sports">Sports</option>
                  <option value="HomeProducts">Home Products</option>
                </select>
                {/* <input type="text" name="productType" id="productType" className="nav-add-product-input" placeholder="product type" onChange={handleAddNewProduct} value={newProduct.productType} /> */}
                <input
                  type="text"
                  name="productName"
                  id="productName"
                  className="nav-add-product-input"
                  placeholder="product name"
                  onChange={handleAddNewProduct}
                  value={newProduct.productName}
                  required
                />
                <input
                  type="text"
                  name="price"
                  id="price"
                  className="nav-add-product-input"
                  placeholder="product price"
                  onChange={handleAddNewProduct}
                  value={newProduct.price}
                  required
                />
                <input
                  type="text"
                  name="image"
                  id="image"
                  className="nav-add-product-input"
                  placeholder="Product image url"
                  onChange={handleAddNewProduct}
                  value={newProduct.image}
                  required
                />
                <button
                  className="nav-add-product-btn"
                  onClick={handleAddProduct}
                >
                  Add
                </button>
              </div>
            )}
          </div>
        ) : (
          <div className="nav-normal"></div>
        )}
        <div className="nav-cart-con" onClick={handleOpenCart}>
          <i className="fa-solid fa-cart-shopping">
            {isCartOpen && (
                <Cart
                setIsCartOpen={setIsCartOpen}
                isCartOpen={isCartOpen}
                isHistoryAdded={isHistoryAdded}
                setIsHistoryAdded={setIsHistoryAdded}
                />
                )}
          </i>
                <p className="nav-cart-count">{cartCount}</p>
        </div>
        <div className="nav-history-con" onClick={handleOpenHistory}>
          <i className="fa-solid fa-clock-rotate-left">
            {isHistoryOpen && (
              <History
                isHistoryAdded={isHistoryAdded}
                setIsHistoryOpen={setIsHistoryOpen}
                isHistoryOpen={isHistoryOpen}
              />
            )}
          </i>
        </div>
      </div>
    </div>
  );
};

export default Nav;
