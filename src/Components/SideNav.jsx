import '../Styles/SideNav.css'

const SideNav = () => {
    const { userName} = JSON.parse(sessionStorage.getItem('user'))
  return (
    <div className="sideNav-container" >
        <div className="sideNav-header-con">
            <h3>Store</h3>
            <div className="sideNav-header-profile">
                <img src="https://media.istockphoto.com/id/1316420668/vector/user-icon-human-person-symbol-social-profile-icon-avatar-login-sign-web-user-symbol.jpg?s=612x612&w=0&k=20&c=AhqW2ssX8EeI2IYFm6-ASQ7rfeBWfrFFV4E87SaFhJE=" alt="" className="sideNav-header-profile-img" />
                <h5>{userName}</h5>
            </div>
        </div>
        <div className="sideNav-filters-con">
            <div className="sideNav-filters-header">
                <h4>Filters</h4>
                <button className="sideNav-filter-apply-btn">Apply</button>
            </div>
            <div className="sideNav-filters">
                <div className="sideNav-filter-body">
                    <h6>Price</h6>
                    <ul>
                        <li className="sideNav-filter-list">
                            <label htmlFor="">
                            <input type="checkbox" className="sideNav-filter-input" />
                            under 100
                            </label>
                        </li>
                        <li className="sideNav-filter-list">
                            <label htmlFor="">
                            <input type="checkbox" className="sideNav-filter-input" />
                            under 500
                            </label>
                        </li>
                        <li className="sideNav-filter-list">
                            <label htmlFor="">
                            <input type="checkbox" className="sideNav-filter-input" />
                            under 2000
                            </label>
                        </li>
                        <li className="sideNav-filter-list">
                            <label htmlFor="">
                            <input type="checkbox" className="sideNav-filter-input" />
                            under 5000
                            </label>
                        </li>
                    </ul>
                </div>
                <div className="sideNav-filter-body">
                    <h6>Category</h6>
                    <ul>
                        <li className="sideNav-filter-list">
                            <label htmlFor="">
                            <input type="checkbox" className="sideNav-filter-input" />
                            Gadgets
                            </label>
                        </li>
                        <li className="sideNav-filter-list">
                            <label htmlFor="">
                            <input type="checkbox" className="sideNav-filter-input" />
                            Books
                            </label>
                        </li>
                        <li className="sideNav-filter-list">
                            <label htmlFor="">
                            <input type="checkbox" className="sideNav-filter-input" />
                            Dress
                            </label>
                        </li>
                        <li className="sideNav-filter-list">
                            <label htmlFor="">
                            <input type="checkbox" className="sideNav-filter-input" />
                            Sports
                            </label>
                        </li>
                        <li className="sideNav-filter-list">
                            <label htmlFor="">
                            <input type="checkbox" className="sideNav-filter-input" />
                            Home products
                            </label>
                        </li>
                    </ul>
                </div>
            </div>
            <div className="sideNav-logout-con">
                <h6>log out</h6>
                <i className="fa-solid fa-right-from-bracket"></i>
            </div>
        </div>
    </div>
  )
}

export default SideNav