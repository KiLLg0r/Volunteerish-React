import { useHistory } from "react-router-dom";
import { BiChevronLeft } from "react-icons/bi";

function Account() {
  const history = useHistory();
  return (
    <div className="account">
      <div className="header">
        <button onClick={history.goBack}>
          <BiChevronLeft />
        </button>
        Edit your profile
      </div>
      
    </div>
  );
}

export default Account;
