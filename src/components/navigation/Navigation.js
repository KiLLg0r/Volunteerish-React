import { BsHouseFill, BsFillChatDotsFill, BsBagFill } from "react-icons/bs";
import { FaCog, FaClipboardList } from "react-icons/fa";
import { NavLink } from "react-router-dom";

const Navigation = () => {
  return (
    <header className="primary-nav">
      <nav className="navigation">
        <ul className="navigation-links">
          <NavLink to="/" className={(navLink) => (navLink.isActive ? "nav-link active-link" : "nav-link")}>
            <BsHouseFill />
            <span>Home</span>
          </NavLink>
          <NavLink className={(navLink) => (navLink.isActive ? "nav-link active-link" : "nav-link")} to="/announces">
            <FaClipboardList />
            <span>Announces</span>
          </NavLink>
          <NavLink className={(navLink) => (navLink.isActive ? "nav-link active-link" : "nav-link")} to="/shop">
            <BsBagFill />
            <span>Shop</span>
          </NavLink>
          <NavLink className={(navLink) => (navLink.isActive ? "nav-link active-link" : "nav-link")} to="/messages">
            <BsFillChatDotsFill />
            <span>Messages</span>
          </NavLink>
          <NavLink className={(navLink) => (navLink.isActive ? "nav-link active-link" : "nav-link")} to="/settings">
            <FaCog />
            <span>Settings</span>
          </NavLink>
        </ul>
      </nav>
    </header>
  );
};

export default Navigation;
