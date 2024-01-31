/* eslint-disable react/prop-types */
import axios from "axios";
import { useEffect, useState } from "react";
import { backendUrl } from "../../config";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../Styles/Products.css";

const Products = ({
  isProductAdded,
  setIsCartAdded,
  isCartAdded,
  isHistoryAdded,
  setIsHistoryAdded,
  searchInput,
  selectedPrice,
  selectedType,
}) => {
  const { userEmail, role, accessToken } = JSON.parse(sessionStorage.getItem("user"));
  const [products, setProducts] = useState([]);
  const [productData, setProductsData] = useState([]);
  const getAllProducts = async () => {
    try {
      const response = await axios.get(`${backendUrl}/products`,{
        headers : {
          "auth-token" : accessToken
        }
      })
      if (response.status === 401) {
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
        setProducts(response.data);
        setProductsData(response.data);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const [updateProduct, setUpdateProduct] = useState({});

  const [isUpdateOpen, setIsUpdateOpen] = useState(false);

  const handleUpdateOldProduct = (e) => {
    const { name, value } = e.target;
    setUpdateProduct({ ...updateProduct, [name]: value });
  };

  const getSingleProduct = async (id) => {
    try {
      let findResponse = await axios.get(
        `${backendUrl}/products/${userEmail}/${id}`,{
          headers : {
            "auth-token" : accessToken
          }
        }
      );
      setUpdateProduct(findResponse.data);
    } catch (err) {
      console.log(err);
    }
  };

  const handleUpdateOpen = async (id) => {
    {
      confirm("Do you want to edit this product") &&
        (await getSingleProduct(id));
      setIsUpdateOpen(!isUpdateOpen);
    }
  };

  const handleUpdateProducts = async (id) => {
    try {
      console.log(id);
      if (updateProduct.productId === id) {
        let response = await axios.put(
          `${backendUrl}/products/${userEmail}/${id}`,
          updateProduct,{
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
        } else if (response.status === 402) {
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
          setIsUpdateOpen(!isUpdateOpen);
          getAllProducts();
        }
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handleDeleteProducts = async (id) => {
    try {
      {
        confirm("Do you want to delete this product") &&
          (await axios.delete(`${backendUrl}/products/${userEmail}/${id}`,{
            headers : {
              "auth-token" : accessToken
            }
          }));
        getAllProducts();
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getAllProducts();
  }, [isProductAdded]);

  
  const handleAddCart = async (id) => {
    try {
      let findResponse = await axios.get(
        `${backendUrl}/products/${userEmail}/${id}`,{
          headers : {
            "auth-token" : accessToken
          }
        }
      );
      if (findResponse.status === 402) {
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
      } else {
        let cartResponse = await axios.post(
          `${backendUrl}/normalUser/cart/${userEmail}`,
          findResponse.data,{
            headers : {
              "auth-token" : accessToken
            }
          }
        );
        console.log(cartResponse);
        if (cartResponse.status === 409) {
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
        } else if (cartResponse.status === 402) {
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
        } else {
          setIsCartAdded(!isCartAdded);
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
    } catch (err) {
      console.log(err);
      toast.error("Already Added", {
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
  };

  const handleAddHistory = async (id) => {
    try {
      let findResponse = await axios.get(
        `${backendUrl}/products/${userEmail}/${id}`,{
          headers : {
            "auth-token" : accessToken
          }
        }
      );
      if (findResponse.status === 402) {
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
      } else {
        let cartResponse = await axios.post(
          `${backendUrl}/normalUser/history/${userEmail}`,
          findResponse.data,{
            headers : {
              "auth-token" : accessToken
            }
          }
        );
        console.log(cartResponse);
        if (cartResponse.status === 409) {
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
        } else if (cartResponse.status === 402) {
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
        } else {
          setIsHistoryAdded(!isHistoryAdded);
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
    } catch (err) {
      console.log(err);
    }
  };




  useEffect(() => {
    if (searchInput !== "" || selectedPrice !== "" || selectedType !== "") {
      const filteredProducts = productData
        .filter((item) => 
          searchInput !== "" ? item.productName.toLowerCase().includes(searchInput.toLowerCase())  ||  
          item.productType.toLowerCase().includes(searchInput.toLowerCase()) : true
        )
        .filter((item) => selectedPrice !== "" ? parseFloat(item.price) <= parseFloat(selectedPrice)  : true
         ) 
        .filter((item) =>
          selectedType !== "" ? item.productType === selectedType : true
        );
      setProducts(filteredProducts);
    } else {
      setProducts(productData);
    }
  }, [searchInput, selectedPrice, selectedType]);



  return (
    <div className="products-container">
      {products.length === 0 ? (
        <div className="products-con-empty">No products are available</div>
      ) : (
        <div className="product-items">
          {products.map((d, i) => (
            <div className="product-item" key={i}>
              <img src={d.image} alt="" className="product-item-img" />
              <div className="product-item-price-con">
                <h4 className="">{d.productName}</h4>
                <h6>&#8377;{d.price}</h6>
                <p className="product-item-type-res" >{d.productType}</p>
              </div>
              <div className="product-item-admin-con">
                <p className="product-item-type-desk" >{d.productType}</p>
                {role === 1 && (
                  <button
                    className="product-item-btn"
                    onClick={() => handleUpdateOpen(d.productId)}
                  >
                    <i className="fa-solid fa-pen-to-square"></i>
                  </button>
                )}
                {role === 1 && (
                  <button
                    className="product-item-btn"
                    onClick={() => handleDeleteProducts(d.productId)}
                  >
                    <i className="fa-solid fa-trash"></i>
                  </button>
                )}
              </div>
              <div className="product-item-buttons">
                <button
                  className="product-item-btn"
                  onClick={() => handleAddCart(d.productId)}
                >
                  Add to cart
                </button>
                <button
                  className="product-item-btn-buy"
                  onClick={() => handleAddHistory(d.productId)}
                >
                  Buy Now
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
      {isUpdateOpen && (
        <div className="product-item-update-con">
          <select
            value={updateProduct.productType}
            onChange={handleUpdateOldProduct}
            name="productType"
            id="productType"
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
            onChange={handleUpdateOldProduct}
            value={updateProduct.productName}
          />
          <input
            type="text"
            name="price"
            id="price"
            className="nav-add-product-input"
            placeholder="product price"
            onChange={handleUpdateOldProduct}
            value={updateProduct.price}
          />
          <input
            type="text"
            name="image"
            id="image"
            className="nav-add-product-input"
            placeholder="Product image url"
            onChange={handleUpdateOldProduct}
            value={updateProduct.image}
          />
          <button
            className="nav-add-product-btn"
            onClick={() => handleUpdateProducts(updateProduct.productId)}
          >
            Update
          </button>
        </div>
      )}
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
  );
};

export default Products;
