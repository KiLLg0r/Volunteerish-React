import { useState } from "react";
import { useAuth } from "../contexts/AuthContext";

import CompleteRegistration from "./CompleteRegistration";
import Card from "../Card";



const Home = () => {
  const { currentUser } = useAuth();

  const [isOpen, setOpen] = useState([true, false]);

  const RenderForm = () => {
    if (!currentUser.displayName) return <CompleteRegistration />;
    else return null;
  };

  return (
    <section className="home">
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
      <div className="announces">
        <h1 className="title">Announces</h1>
        <div className="helping-now-container ann-container">
          <div className="container-title">
            <h3>Helping now</h3>
            <div
              className="show-hide-btn"
              onClick={() => {
                let newArray = [...isOpen];
                newArray[0] = !isOpen[0];
                setOpen(newArray);
              }}
            >
              {isOpen[0] === true ? "Hide" : "Show"}
            </div>
          </div>
          <div className={`cards-container ${isOpen[0] === true ? "show-container" : "hide-container"}`}>
            <Card
              UID={currentUser}
              name="Oblesniuc Robert Andrei"
              desc="Lorem ipsum dolor, sit amet consectetur adipisicing elit. Placeat, optio!"
              category="Grocery"
              difficulty="Medium"
            />
            <Card
              UID={currentUser}
              name="Oblesniuc Robert Andrei"
              desc="Lorem ipsum dolor, sit amet consectetur adipisicing elit. Placeat, optio!"
              category="Grocery"
              difficulty="Hard"
            />
          </div>
        </div>
        <div className="helped-container ann-container">
          <div className="container-title">
            <h3>Helped people</h3>
            <div
              className="show-hide-btn"
              onClick={() => {
                let newArray = [...isOpen];
                newArray[1] = !isOpen[1];
                setOpen(newArray);
              }}
            >
              {isOpen[1] === true ? "Hide" : "Show"}
            </div>
          </div>
          <div className={`cards-container ${isOpen[1] === true ? "show-container" : "hide-container"}`}>
            <Card
              UID={currentUser}
              name="Oblesniuc Robert Andrei"
              desc="Lorem ipsum dolor, sit amet consectetur adipisicing elit. Placeat, optio!"
              category="Grocery"
              difficulty="Medium"
            />
            <Card
              UID={currentUser}
              name="Oblesniuc Robert Andrei"
              desc="Lorem ipsum dolor, sit amet consectetur adipisicing elit. Placeat, optio!"
              category="Grocery"
              difficulty="Medium"
            />
            <Card
              UID={currentUser}
              name="Oblesniuc Robert Andrei"
              desc="Lorem ipsum dolor, sit amet consectetur adipisicing elit. Placeat, optio!"
              category="Grocery"
              difficulty="Medium"
            />
          </div>
        </div>
      </div>
      <RenderForm />
    </section>
  );
};

export default Home;
