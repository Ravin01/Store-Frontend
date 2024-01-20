import { useState } from "react"
import Nav from "../../Components/Nav"
import Products from "../../Components/Products"
import SideNav from "../../Components/SideNav"
import '../../Styles/Home.css'

const Home = () => {
  const [isProductAdded, setIsProductAdded] = useState(false)
  return (
    <div className="home-container">
      <div className="home-sideNav">
        <SideNav />
      </div>
      <div className="home-main">
      <Nav isProductAdded={isProductAdded} setIsProductAdded={setIsProductAdded} />
      <Products isProductAdded={isProductAdded} />
      </div>
    </div>
  )
}

export default Home