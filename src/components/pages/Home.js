import { useState } from "react";
import { useHistory } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

import CompleteRegistration from "./CompleteRegistration";

import firebase from "firebase/compat/app";
import "firebase/compat/firestore";

import { BiChevronDown, BiChevronUp } from "react-icons/bi";

const Home = () => {
  const [error, setError] = useState("");
  const { logout, currentUser } = useAuth();
  const history = useHistory();

  const [isOpen, setIsOpen] = useState([false, false]);

  const db = firebase.firestore();
  const userDoc = db.collection("users").doc(currentUser.uid);

  const getData = () => {
    userDoc
      .get()
      .then((doc) => {
        console.log(doc.data());
      })
      .catch((error) => {
        console.log("Error getting cached document:", error);
      });
  };

  async function handleLogOut() {
    setError("");

    try {
      await logout();
      history.push("/login");
    } catch {
      setError("Failed to log out");
    }
  }

  const RenderForm = () => {
    if (!currentUser.displayName) return <CompleteRegistration />;
    else return null;
  };

  const DropdownIcon = ({ isOpen }) => {
    if (isOpen) return <BiChevronDown />;
    else return <BiChevronUp />;
  };

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
          <img src={currentUser.photoURL} alt="pic" />
          <h3 className="name">
            <span>Name</span>
            <p>{currentUser.displayName}</p>
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
      </div>
      <button variant="link" onClick={handleLogOut} className="view-more" style={{ marginBlock: "1rem" }}>
        Log out
      </button>
      <button onClick={getData} className="view-more">
        Get data
      </button>
      <div className="announces">
        <h1 className="title">Announces</h1>
        <div className="active-ann">
          <div className="dropdown" id="helpingDropdown">
            <div
              className="dropdown-btn"
              onClick={() => {
                let newArray = [...isOpen];
                newArray[0] = !isOpen[0];
                setIsOpen(newArray);
              }}
            >
              <div className="subtitle">Helping</div>
              <DropdownIcon isOpen={isOpen[0]} />
            </div>
            <div className={`dropdown-menu ${isOpen[0] ? "opened" : "closed"}`}>
              <div className="card">
                <div className="card-top">
                  <img src={currentUser.photoURL} alt="Profile" />
                  <div className="info">
                    <div className="card-title">
                      Lorem ipsum dolor, sit amet consectetur adipisicing elit. Consectetur voluptatem ea quas aliquam
                      porro, voluptas est repellat harum dolores quo?
                    </div>
                    <div className="card-desc">
                      Lorem ipsum dolor, sit amet consectetur adipisicing elit. Mollitia, placeat.
                    </div>
                    <div className="card-difficulty diff-1">Easy</div>
                  </div>
                </div>
                <div className="card-bottom">
                  <button className="view-more">View more</button>
                </div>
              </div>
              <div className="card">
                <div className="card-top">
                  <img src={currentUser.photoURL} alt="Profile" />
                  <div className="info">
                    <div className="card-title">
                      Lorem ipsum dolor, sit amet consectetur adipisicing elit. Consectetur voluptatem ea quas aliquam
                      porro, voluptas est repellat harum dolores quo?
                    </div>
                    <div className="card-desc">
                      Lorem ipsum dolor, sit amet consectetur adipisicing elit. Mollitia, placeat.
                    </div>
                    <div className="card-difficulty diff-1">Easy</div>
                  </div>
                </div>
                <div className="card-bottom">
                  <button className="view-more">View more</button>
                </div>
              </div>
              <div className="card">
                <div className="card-top">
                  <img src={currentUser.photoURL} alt="Profile" />
                  <div className="info">
                    <div className="card-title">
                      Lorem ipsum dolor, sit amet consectetur adipisicing elit. Consectetur voluptatem ea quas aliquam
                      porro, voluptas est repellat harum dolores quo?
                    </div>
                    <div className="card-desc">
                      Lorem ipsum dolor, sit amet consectetur adipisicing elit. Mollitia, placeat.
                    </div>
                    <div className="card-difficulty diff-1">Easy</div>
                  </div>
                </div>
                <div className="card-bottom">
                  <button className="view-more">View more</button>
                </div>
              </div>
              <div className="card">
                <div className="card-top">
                  <img src={currentUser.photoURL} alt="Profile" />
                  <div className="info">
                    <div className="card-title">
                      Lorem ipsum dolor, sit amet consectetur adipisicing elit. Consectetur voluptatem ea quas aliquam
                      porro, voluptas est repellat harum dolores quo?
                    </div>
                    <div className="card-desc">
                      Lorem ipsum dolor, sit amet consectetur adipisicing elit. Mollitia, placeat.
                    </div>
                    <div className="card-difficulty diff-1">Easy</div>
                  </div>
                </div>
                <div className="card-bottom">
                  <button className="view-more">View more</button>
                </div>
              </div>
              <div className="card">
                <div className="card-top">
                  <img src={currentUser.photoURL} alt="Profile" />
                  <div className="info">
                    <div className="card-title">
                      Lorem ipsum dolor, sit amet consectetur adipisicing elit. Consectetur voluptatem ea quas aliquam
                      porro, voluptas est repellat harum dolores quo?
                    </div>
                    <div className="card-desc">
                      Lorem ipsum dolor, sit amet consectetur adipisicing elit. Mollitia, placeat.
                    </div>
                    <div className="card-difficulty diff-1">Easy</div>
                  </div>
                </div>
                <div className="card-bottom">
                  <button className="view-more">View more</button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="other-ann">
          <div className="dropdown">
            <div
              className="dropdown-btn"
              onClick={() => {
                let newArray = [...isOpen];
                newArray[1] = !isOpen[1];
                setIsOpen(newArray);
              }}
            >
              <div className="subtitle">Helped</div>
              <DropdownIcon isOpen={isOpen[1]} />
            </div>
            <div className={`dropdown-menu ${isOpen[1] ? "opened" : "closed"}`}>
              <div className="card">
                <div className="card-top">
                  <img src={currentUser.photoURL} alt="Profile" />
                  <div className="info">
                    <div className="card-title">
                      Lorem ipsum dolor, sit amet consectetur adipisicing elit. Consectetur voluptatem ea quas aliquam
                      porro, voluptas est repellat harum dolores quo?
                    </div>
                    <div className="card-desc">
                      Lorem ipsum dolor, sit amet consectetur adipisicing elit. Mollitia, placeat.
                    </div>
                    <div className="card-difficulty diff-1">Easy</div>
                  </div>
                </div>
                <div className="card-bottom">
                  <button className="view-more">View more</button>
                </div>
              </div>
              <div className="card">
                <div className="card-top">
                  <img src={currentUser.photoURL} alt="Profile" />
                  <div className="info">
                    <div className="card-title">
                      Lorem ipsum dolor, sit amet consectetur adipisicing elit. Consectetur voluptatem ea quas aliquam
                      porro, voluptas est repellat harum dolores quo?
                    </div>
                    <div className="card-desc">
                      Lorem ipsum dolor, sit amet consectetur adipisicing elit. Mollitia, placeat.
                    </div>
                    <div className="card-difficulty diff-1">Easy</div>
                  </div>
                </div>
                <div className="card-bottom">
                  <button className="view-more">View more</button>
                </div>
              </div>
              <div className="card">
                <div className="card-top">
                  <img src={currentUser.photoURL} alt="Profile" />
                  <div className="info">
                    <div className="card-title">
                      Lorem ipsum dolor, sit amet consectetur adipisicing elit. Consectetur voluptatem ea quas aliquam
                      porro, voluptas est repellat harum dolores quo?
                    </div>
                    <div className="card-desc">
                      Lorem ipsum dolor, sit amet consectetur adipisicing elit. Mollitia, placeat.
                    </div>
                    <div className="card-difficulty diff-1">Easy</div>
                  </div>
                </div>
                <div className="card-bottom">
                  <button className="view-more">View more</button>
                </div>
              </div>
              <div className="card">
                <div className="card-top">
                  <img src={currentUser.photoURL} alt="Profile" />
                  <div className="info">
                    <div className="card-title">
                      Lorem ipsum dolor, sit amet consectetur adipisicing elit. Consectetur voluptatem ea quas aliquam
                      porro, voluptas est repellat harum dolores quo?
                    </div>
                    <div className="card-desc">
                      Lorem ipsum dolor, sit amet consectetur adipisicing elit. Mollitia, placeat.
                    </div>
                    <div className="card-difficulty diff-1">Easy</div>
                  </div>
                </div>
                <div className="card-bottom">
                  <button className="view-more">View more</button>
                </div>
              </div>
              <div className="card">
                <div className="card-top">
                  <img src={currentUser.photoURL} alt="Profile" />
                  <div className="info">
                    <div className="card-title">
                      Lorem ipsum dolor, sit amet consectetur adipisicing elit. Consectetur voluptatem ea quas aliquam
                      porro, voluptas est repellat harum dolores quo?
                    </div>
                    <div className="card-desc">
                      Lorem ipsum dolor, sit amet consectetur adipisicing elit. Mollitia, placeat.
                    </div>
                    <div className="card-difficulty diff-1">Easy</div>
                  </div>
                </div>
                <div className="card-bottom">
                  <button className="view-more">View more</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <RenderForm />
    </section>
  );
};

export default Home;
