import { ReactComponent as LoginSvg } from "../../assets/svg/login.svg";
import { BsEyeFill, BsFillEnvelopeFill, BsFillEyeSlashFill } from "react-icons/bs";
import "../../assets/css/login.css";

import { useRef, useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import { Link, useHistory } from "react-router-dom";

const Login = () => {
  const emailRef = useRef();
  const passwordRef = useRef();
  const { login } = useAuth();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const history = useHistory();
  const [showPassword, setShowPassword] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      setError("");
      setLoading(true);
      await login(emailRef.current.value, passwordRef.current.value);
      history.push("/");
    } catch (error) {
      console.log(error);
      setError("Failed to log in");
    }
    setLoading(false);
  }

  function handleShowPassword() {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  }

  return (
    <div className="login">
      <h1 className="title app-name">Volunteerish</h1>
      <LoginSvg />
      <h1 className="title">Log in</h1>
      {error && (
        <div className="alert" role="alert">
          {error}
        </div>
      )}
      <form className="contact-form" onSubmit={handleSubmit}>
        <div className="wrapper">
          <div className="f-wrapper">
            <input type="email" spellCheck="false" required ref={emailRef} />
            <div className="label">Email</div>
            <div className="icon">
              <BsFillEnvelopeFill />
            </div>
          </div>
          <div className="f-wrapper">
            <input
              type={`${showPassword ? "text" : "password"}`}
              required
              className="password-input"
              ref={passwordRef}
            />
            <div className="label">Password</div>
            <div className="icon password-icon" onClick={handleShowPassword}>
              {!showPassword ? <BsEyeFill /> : <BsFillEyeSlashFill />}
            </div>
          </div>
        </div>
        <div className="wrapper">
          <button type="submit" className="btn" disabled={loading}>
            Log in
          </button>
        </div>
      </form>
      <div className="link-text">
        Need an account? <Link to="/register">Sing up</Link>
      </div>
    </div>
  );
};

export default Login;
