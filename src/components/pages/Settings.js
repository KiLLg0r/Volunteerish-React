import { useHistory } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { useState } from "react";
import { NavLink } from "react-router-dom";
import { BiChevronRight, BiLogOut, BiUserCircle, BiHelpCircle, BiInfoCircle } from "react-icons/bi";

const Settings = () => {
  const { logout } = useAuth();
  const [error, setError] = useState("");
  const history = useHistory();

  async function handleLogOut() {
    setError("");

    try {
      await logout();
      history.push("/login");
    } catch {
      setError("Failed to log out");
    }
  }

  return (
    <section className="settings">
      <div className="title">Settings</div>
      <div>{error}</div>
      <nav className="settings-links">
        <hr className="line" />
        <NavLink className="settings-link" to="/account">
          <span>
            <BiUserCircle />
            Account
          </span>
          <BiChevronRight />
        </NavLink>
        <hr className="line" />
        <NavLink className="settings-link" to="/help">
          <span>
            <BiHelpCircle />
            Help &#38; Support
          </span>
          <BiChevronRight />
        </NavLink>
        <hr className="line" />
        <NavLink className="settings-link" to="/about">
          <span>
            <BiInfoCircle />
            About
          </span>
          <BiChevronRight />
        </NavLink>
        <hr className="line" />
      </nav>
      <button onClick={handleLogOut} className="log-out">
        <span>Log out</span>
        <BiLogOut />
      </button>
    </section>
  );
};

export default Settings;
