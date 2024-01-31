/* eslint-disable react/prop-types */
import "../Styles/SideNav.css";
import { Link } from "react-router-dom";

const SideNav = ({
  selectedPrice,
  setSelectedPrice,
  selectedType,
  setSelectedType,
}) => {
  const { userName } = JSON.parse(sessionStorage.getItem("user"));
  const handleChangePriceButtons = (e) => {
    let checkboxValue = e.target.value;
    setSelectedPrice((prevPrice) =>
      prevPrice === checkboxValue ? "" : checkboxValue
    );
  };

  const handleChangeTypeButtons = (e) => {
    console.log(e.target.value);
    let checkboxValue = e.target.value;
    setSelectedType((prevPrice) =>
      prevPrice === checkboxValue ? "" : checkboxValue
    );
  };

  const handleLogout = () => {
    sessionStorage.removeItem("user");
  };


  return (
    <div className="sideNav-container">
      <div className="sideNav-header-con">
        <h3>Store</h3>
        <div className="sideNav-header-profile">
          <img
            src="https://media.istockphoto.com/id/1316420668/vector/user-icon-human-person-symbol-social-profile-icon-avatar-login-sign-web-user-symbol.jpg?s=612x612&w=0&k=20&c=AhqW2ssX8EeI2IYFm6-ASQ7rfeBWfrFFV4E87SaFhJE="
            alt=""
            className="sideNav-header-profile-img"
          />
          <h5>{userName}</h5>
        </div>
      </div>
      <div className="sideNav-filters-con">
        <div className="sideNav-filters-header">
          <h4>Filters</h4>
        </div>
        <div className="sideNav-filters">
          <div className="sideNav-filter-body">
            <h6>Price</h6>
            <ul>
              <li className="sideNav-filter-list">
                <label htmlFor="">
                  <input
                    type="checkbox"
                    className="sideNav-filter-input"
                    onChange={handleChangePriceButtons}
                    value={500}
                    checked={selectedPrice === "500"}
                  />
                  Under 500
                </label>
              </li>
              <li className="sideNav-filter-list">
                <label htmlFor="">
                  <input
                    type="checkbox"
                    className="sideNav-filter-input"
                    onChange={handleChangePriceButtons}
                    value={2000}
                    checked={selectedPrice === "2000"}
                  />
                  Under 2000
                </label>
              </li>
              <li className="sideNav-filter-list">
                <label htmlFor="">
                  <input
                    type="checkbox"
                    className="sideNav-filter-input"
                    onChange={handleChangePriceButtons}
                    value={10000}
                    checked={selectedPrice === "10000"}
                  />
                  Under 10000
                </label>
              </li>
              <li className="sideNav-filter-list">
                <label htmlFor="">
                  <input
                    type="checkbox"
                    className="sideNav-filter-input"
                    onChange={handleChangePriceButtons}
                    value={50000}
                    checked={selectedPrice === "50000"}
                  />
                  Under 50000
                </label>
              </li>
            </ul>
          </div>
          <div className="sideNav-filter-body">
            <h6>Category</h6>
            <ul>
              <li className="sideNav-filter-list">
                <label htmlFor="">
                  <input
                    type="checkbox"
                    className="sideNav-filter-input"
                    onChange={handleChangeTypeButtons}
                    value="Gadget"
                    checked={selectedType === "Gadget"}
                  />
                  Gadgets
                </label>
              </li>
              <li className="sideNav-filter-list">
                <label htmlFor="">
                  <input
                    type="checkbox"
                    className="sideNav-filter-input"
                    onChange={handleChangeTypeButtons}
                    value="Dress"
                    checked={selectedType === "Dress"}
                  />
                  Dress
                </label>
              </li>
              <li className="sideNav-filter-list">
                <label htmlFor="">
                  <input
                    type="checkbox"
                    className="sideNav-filter-input"
                    onChange={handleChangeTypeButtons}
                    value="Books"
                    checked={selectedType === "Books"}
                  />
                  Books
                </label>
              </li>
              <li className="sideNav-filter-list">
                <label htmlFor="">
                  <input
                    type="checkbox"
                    className="sideNav-filter-input"
                    onChange={handleChangeTypeButtons}
                    value="Sports"
                    checked={selectedType === "Sports"}
                  />
                  Sports
                </label>
              </li>
              <li className="sideNav-filter-list">
                <label htmlFor="">
                  <input
                    type="checkbox"
                    className="sideNav-filter-input"
                    onChange={handleChangeTypeButtons}
                    value="HomeProducts"
                    checked={selectedType === "HomeProducts"}
                  />
                  Home, Kitchen
                </label>
              </li>
            </ul>
          </div>
        </div>
      </div>
        <Link
          className="sideNav-logout-con"
          onClick={handleLogout}
          to={"/auth/login"}
        >
          <h6>log out</h6>
          <i className="fa-solid fa-right-from-bracket"></i>
        </Link>
    </div>
  );
};

export default SideNav;
