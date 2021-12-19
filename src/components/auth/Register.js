import { ReactComponent as RegisterSvg } from "../../assets/svg/register.svg";
import { BsEyeFill, BsFillPersonLinesFill, BsFillEnvelopeFill } from "react-icons/bs";
import "../../assets/css/register.css";

const Login = () => {
  return (
    <div className="login">
      <h1 className="title app-name">Volunteerish</h1>
      <RegisterSvg />
      <h1 className="title">Create new account</h1>
      <form className="contact-form">
        <div className="wrapper">
          <div className="f-wrapper">
            <input type="text" spellCheck="false" required />
            <div className="label">Name</div>
            <div className="icon">
              <BsFillPersonLinesFill />
            </div>
          </div>
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
          <input type="submit" value="Create account" className="contact-btn" />
        </div>
      </form>
    </div>
  );
};

export default Login;
