

import {Link} from "react-router-dom"
import "./index.css"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBook, faBookOpen, faCartShopping, faUser,faHouse} from '@fortawesome/free-solid-svg-icons';



const Header=()=>(
    <nav className="header-container">
        <Link to="/"  className="header-link"> 
        <div className="logo-container">
            <FontAwesomeIcon className="header-icon" icon={faBookOpen} />
        <h1 className="logo-title">BookStore</h1>
        </div>
        </Link>
        
        <ul className="header-list-container">
            <Link to="/"  className="header-link">
            <li className="header-list-item">
                    <FontAwesomeIcon className="header-list-item-icon" icon={faHouse} />
                    <p className="header-list-item-text">Home</p>
                </li>
            </Link>
            <Link to="/Book"  className="header-link"><li className="header-list-item">
                <FontAwesomeIcon className="header-list-item-icon" icon={faBook} />
                <p className="header-list-item-text">BookList</p>
            </li></Link>
            <Link to="/cart"  className="header-link">
            <li className="header-list-item"> 
                <FontAwesomeIcon className="header-list-item-icon" icon={faCartShopping} />
                <p className="header-list-item-text">Cart</p>
            </li></Link>
            <Link to="/user"  className="header-link"><li className="header-list-item">
                <FontAwesomeIcon className="header-list-item-icon" icon={faUser} />
                <p className="header-list-item-text">User</p>
            </li></Link>
            
        </ul>

    </nav>

)

export default Header