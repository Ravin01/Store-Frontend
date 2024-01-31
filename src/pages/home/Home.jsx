import { useState } from "react";
import Nav from "../../Components/Nav";
import Products from "../../Components/Products";
import SideNav from "../../Components/SideNav";
import "../../Styles/Home.css";

const Home = () => {
  const [isProductAdded, setIsProductAdded] = useState(false);
  const [isCartAdded, setIsCartAdded] = useState(false);
  const [isHistoryAdded, setIsHistoryAdded] = useState(false);
  const [searchInput, setSearchInput] = useState("");
  const [selectedPrice, setSelectedPrice] = useState('');
  const [selectedType, setSelectedType] = useState("");

  const [sideNav, setSideNav] = useState('home-sideNav')

  const [bars, setBars] = useState('bars')

  return (
    <div className="home-container">
      <div className={`${sideNav}`}>
        <SideNav
          selectedPrice={selectedPrice}
          setSelectedPrice={setSelectedPrice}
          selectedType={selectedType}
          setSelectedType={setSelectedType}
        />
      </div>
      <div className="home-main">
        <Nav
          isProductAdded={isProductAdded}
          setIsProductAdded={setIsProductAdded}
          isCartAdded={isCartAdded}
          isHistoryAdded={isHistoryAdded}
          setSearchInput={setSearchInput}
          searchInput={searchInput}
          setIsHistoryAdded={setIsHistoryAdded}
          bars={bars}
          setBars={setBars}
          setSideNav={setSideNav}
        />
        <Products
          isProductAdded={isProductAdded}
          setIsCartAdded={setIsCartAdded}
          isCartAdded={isCartAdded}
          isHistoryAdded={isHistoryAdded}
          setIsHistoryAdded={setIsHistoryAdded}
          searchInput={searchInput}
          selectedPrice={selectedPrice}
          selectedType={selectedType}
        />
      </div>
    </div>
  );
};

export default Home;
