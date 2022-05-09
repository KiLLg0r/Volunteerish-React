import { ReactComponent as RegisterSvg } from "../../assets/svg/register.svg";
import "../../assets/css/register.css";

import Input from "../Input";

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

  // TODO Add 1s timeout after successfully register and display to user a success message
  // TODO Implement errors

  return (
    <div className="register">
      <div className="auth--header">
        <h1 className="title app-name">Volunteerish</h1>
        <RegisterSvg />
      </div>
      <div className="auth--content">
        <h1 className="title">Create new account</h1>
        {error && (
          <div className="error--message" role="alert">
            {error}
          </div>
        )}
        <form className="contact-form" onSubmit={handleSubmit}>
          <div className="wrapper">
            <Input type="email" ref={emailRef} name="Email" icon="email" />
            <Input type="password" ref={passwordRef} name="Password" icon="password" />
            <Input type="password" ref={passwordConfirmRef} name="Confirm password" icon="password" />
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
    </div>
  );
};

export default Register;
