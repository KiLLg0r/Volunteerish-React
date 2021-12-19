import { ReactComponent as LoginSvg } from "../../assets/svg/login.svg";
import { BsEyeFill, BsFillEnvelopeFill } from "react-icons/bs";
import "../../assets/css/login.css";

const Login = () => {
  return (
    <div className="login">
      <h1 className="title app-name">Volunteerish</h1>
      <LoginSvg />
      <h1 className="title">Log in</h1>
      <form className="contact-form">
        <div className="wrapper">
          <div className="f-wrapper">
            <input type="email" spellCheck="false" required />
            <div className="label">Email</div>
            <div className="icon">
              <BsFillEnvelopeFill />
            </div>
          </div>
          <div className="f-wrapper">
            <input type="password" required className="password-input" />
            <div className="label">Password</div>
            <div className="icon">
              <BsEyeFill />
            </div>
          </div>
        </div>
        <div className="wrapper">
          <input type="submit" value="Log in" className="contact-btn" />
        </div>
      </form>
    </div>
  );
};

export default Login;
