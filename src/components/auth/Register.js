import { ReactComponent as RegisterSvg } from "../../assets/svg/register.svg";
import { BsEyeFill, BsFillEnvelopeFill } from "react-icons/bs";
import "../../assets/css/register.css";

import { useAuth } from "../contexts/AuthContext";
import { useState, useRef } from "react";
import { Link, useHistory } from "react-router-dom";

const Register = () => {
  const emailRef = useRef();
  const passwordRef = useRef();
  const passwordConfirmRef = useRef();
  const { signup } = useAuth();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const history = useHistory();

  async function handleSubmit(e) {
    e.preventDefault();

    if (passwordRef.current.value !== passwordConfirmRef.current.value) {
      return setError("Passwords do not match");
    }

    try {
      setError("");
      setLoading(true);
      await signup(emailRef.current.value, passwordRef.current.value);
      history.push("/");
    } catch (error) {
      setError("Failed to create an account");
    }
    setLoading(false);
  }
  return (
    <div className="register">
      <h1 className="title app-name">Volunteerish</h1>
      <RegisterSvg />
      <h1 className="title">Create new account</h1>
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
            <input type="password" required className="password-input" ref={passwordRef} />
            <div className="label">Password</div>
            <div className="icon">
              <BsEyeFill />
            </div>
          </div>
          <div className="f-wrapper">
            <input type="password" required className="password-input" ref={passwordConfirmRef} />
            <div className="label">Confirm Password</div>
            <div className="icon">
              <BsEyeFill />
            </div>
          </div>
        </div>
        <div className="wrapper">
          <button disabled={loading} type="submit" className="btn">
            Sign Up
          </button>
        </div>
      </form>
      <div className="link-text">
        Already have an account? <Link to="/login">Log in</Link>
      </div>
    </div>
  );
};

export default Register;
