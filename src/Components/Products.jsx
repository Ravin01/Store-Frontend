/* eslint-disable react/prop-types */
import axios from "axios";
import { useEffect, useState } from "react";
import { backendUrl } from "../../config";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Products = ({ isProductAdded }) => {
  const { userEmail, role } = JSON.parse(sessionStorage.getItem("user"));
  const [products, setProducts] = useState([]);
  const getAllProducts = async () => {
    try {
      const response = await axios.get(`${backendUrl}/products`);
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
      }
    } catch (err) {
      console.log(err);
    }
  };

  const [updateProduct, setUpdateProduct] = useState({});

  const [isUpdateOpen, setIsUpdateOpen] = useState(false)


const handleUpdateOldProduct = (e)=>{
    const {name, value} = e.target
    setUpdateProduct({...updateProduct, [name] : value})
}

  const getSingleProduct = async(id)=>{
    try {
        let findResponse = await axios.get(`${backendUrl}/products/${userEmail}/${id}`)
        setUpdateProduct(findResponse.data)
} catch (err) {
    console.log(err);
}
  }

  const handleUpdateOpen = async(id)=>{
    {
        confirm('Do you want to edit this product') &&
        await getSingleProduct(id)
        setIsUpdateOpen(!isUpdateOpen)
    }
  }

  const handleUpdateProducts = async (id) => {
      
      try {
            console.log(id);
            if(updateProduct.productId === id){
                let response = await axios.put(`${backendUrl}/products/${userEmail}/${id}`, updateProduct)
                if(response.status === 409){
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
                }else if(response.status === 402){
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
                      setIsUpdateOpen(!isUpdateOpen)
                      getAllProducts()
                }
                
            }

     
    } catch (err) {
        console.log(err);
    }
};

  const handleDeleteProducts = async (id) => {
    try {
        {
            confirm('Do you want to delete this product') && 
            await axios.delete(`${backendUrl}/products/${userEmail}/${id}`);
            getAllProducts();
        }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getAllProducts();
  }, [isProductAdded]);
  return (
    <div className="products-container">
      {products.map((d, i) => (
        <div className="product-item" key={i}>
          <img src={d.image} alt="" />
          <h4>{d.productName}</h4>
          <p>{d.productType}</p>
          <h6>{d.price}</h6>
          <div className="product-item-buttons">
            <button className="product-item-btn">Add to cart</button>
            <button className="product-item-btn">Buy Now</button>
            {role === 1 && (
              <button
                className="product-item-btn"
                onClick={()=> handleUpdateOpen(d.productId) }
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
                {/* {setUpdateProduct(d)} */}
              </button>
            )}
          </div>
        </div>
      ))}
      {isUpdateOpen && 
      <div className="product-item-update-con">
         <select value={updateProduct.productType} onChange={handleUpdateOldProduct} name="productType" id="productType" >
          <option value="">Select product type</option>
          <option value="Gadget">Gadget</option>
          <option value="Dress">Dress</option>
          <option value="Books">Books</option>
          <option value="Sports">Sports</option>
          <option value="HomeProducts">Home Products</option>
        </select>
                {/* <input type="text" name="productType" id="productType" className="nav-add-product-input" placeholder="product type" onChange={handleAddNewProduct} value={newProduct.productType} /> */}
                <input type="text" name="productName" id="productName" className="nav-add-product-input" placeholder="product name" onChange={handleUpdateOldProduct} value={updateProduct.productName} />
                <input type="text" name="price" id="price" className="nav-add-product-input" placeholder="product price" onChange={handleUpdateOldProduct} value={updateProduct.price} />
                <input type="text" name="image" id="image" className="nav-add-product-input" placeholder="Product image url" onChange={handleUpdateOldProduct} value={updateProduct.image} />
                <button className="nav-add-product-btn" onClick={()=> handleUpdateProducts(updateProduct.productId)} >Update</button>
      </div>
      }
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
