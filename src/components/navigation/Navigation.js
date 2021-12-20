import { BsHouseFill, BsFillChatDotsFill, BsBagFill } from "react-icons/bs";
import { FaCog, FaClipboardList } from "react-icons/fa";
import { NavLink } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

const Navigation = () => {
  const { currentUser } = useAuth();

  const Navbar = ({ currentUser }) => {
    if (currentUser) {
      return (
        <header className="primary-nav">
          <nav className="navigation">
            <ul className="navigation-links">
              <NavLink className="nav-link" activeClassName="active-link" exact to="/">
                <BsHouseFill />
                <span>Home</span>
              </NavLink>
              <NavLink className="nav-link" activeClassName="active-link" to="/announces">
                <FaClipboardList />
                <span>Announces</span>
              </NavLink>
              <NavLink className="nav-link" activeClassName="active-link" to="/shop">
                <BsBagFill />
                <span>Shop</span>
              </NavLink>
              <NavLink className="nav-link" activeClassName="active-link" to="/messages">
                <BsFillChatDotsFill />
                <span>Messages</span>
              </NavLink>
              <NavLink className="nav-link" activeClassName="active-link" to="/settings">
                <FaCog />
                <span>Settings</span>
              </NavLink>
            </ul>
          </nav>
        </header>
      );
    } else {
      return null;
    }
  };

  return <Navbar currentUser={currentUser} />;
};

export default Navigation;
