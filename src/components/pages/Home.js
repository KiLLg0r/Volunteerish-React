import Img from "../../assets/img/pic.jpeg";
import { useState } from "react";
import { useHistory } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

const Home = () => {
  const [error, setError] = useState("");
  const { logout } = useAuth();
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
    <section className="home">
      {error && (
        <div className="alert" role="alert">
          {error}
        </div>
      )}
      <div className="profile">
        <h1 className="title">Profile</h1>
        <div className="profile-data">
          <img src={Img} alt="pic" />
          <h3 className="name">
            <span>Name</span>
            <p>Robert Oblesniuc</p>
          </h3>
          <h3 className="points">
            <span>Points</span>
            <p>100K</p>
          </h3>
          <h3 className="helped">
            <span>Helped</span>
            <p>20K</p>
          </h3>
        </div>
        <div className="chart">
          <h1 className="title">Statistics</h1>
          <img
            src="https://blog.hubspot.com/hs-fs/hubfs/Agency_Post/Blog_Images/DataHero_Customers_by_Close_Date.png?width=669&name=DataHero_Customers_by_Close_Date.png"
            alt="chart"
          />
        </div>
      </div>
      <button variant="link" onClick={handleLogOut}>
        Log out
      </button>
      <div className="announces">
        <h1 className="title">Announces</h1>
        <div className="active-ann">
          <h1 className="subtitle">Helping</h1>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatum fuga obcaecati recusandae nemo sed.
            Officiis voluptatem exercitationem eos consectetur vitae saepe tempora, animi iste repudiandae doloribus
            rerum placeat officia assumenda nulla! Ipsum sed porro modi, qui est, magnam officia eos eius, voluptates
            repudiandae assumenda minima numquam repellat temporibus quibusdam illum aliquam nam veniam unde. Rerum
            suscipit tempora rem temporibus earum tempore laborum, aperiam dolore quaerat perspiciatis quas ut, facere,
            distinctio vel. Dicta quibusdam, eveniet id dolorum debitis fugit explicabo deserunt itaque aliquid,
            delectus, earum esse expedita! Facere in ut reprehenderit tempora autem animi harum accusamus, impedit ea
            molestias repellat voluptate.
          </p>
        </div>
        <div className="other-ann">
          <h1 className="subtitle">Helped</h1>
          <p>
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Assumenda earum reprehenderit perferendis,
            sapiente blanditiis repellendus ea. Molestiae optio totam vel eveniet numquam minus enim odio nulla
            expedita, quibusdam tempore, neque odit asperiores officiis illum eius consequatur. Et alias vero
            laboriosam. Cupiditate unde deleniti aperiam eaque excepturi quos illo numquam dolore eveniet harum voluptas
            repudiandae, molestias ullam ducimus dicta est nemo impedit neque id. Inventore officiis neque dolor fugiat,
            odit rerum? Tempora ipsum odit, beatae laudantium eaque corrupti deleniti distinctio totam ipsam voluptas
            officia! Debitis, harum culpa ut modi libero qui fugit beatae, non, tempora ducimus inventore? Debitis
            veniam magni suscipit distinctio, odit eaque nesciunt minus voluptatem maiores ab tempora dolor doloremque
            eligendi est unde ut voluptas temporibus! Vero autem optio velit adipisci ipsam. Sunt magnam dolore
            voluptatem, natus veritatis quia aliquam ipsam iste nostrum maxime. Ut, perspiciatis eos dolores omnis
            asperiores amet id, eveniet iure, numquam obcaecati placeat architecto veritatis.
          </p>
        </div>
      </div>
    </section>
  );
};

export default Home;
