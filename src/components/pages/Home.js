import { useState, useEffect } from "react";
import { useAuth } from "../contexts/AuthContext";

import CompleteRegistration from "./CompleteRegistration";
import AnnouncesQuery from "../AnnounceQuery";
import Card from "../Card";

const Home = () => {
  const { currentUser } = useAuth();

  const [isOpen, setOpen] = useState([false, false, false]);

  const [myAnnounces, setMyAnnounces] = useState([]);
  const [helpingNowAnnounces, setHelpingNowAnnounces] = useState([]);
  const [helpedAnnounces, setHelpedNowAnnounces] = useState([]);

  const RenderForm = () => {
    if (!currentUser.displayName) return <CompleteRegistration />;
    else return null;
  };

  useEffect(() => {
    AnnouncesQuery.myAnnouncesFirstFetch(currentUser.uid, "active")
      .then((result) => {
        if (result) {
          setMyAnnounces(result.announces);
        }
      })
      .catch((error) => console.log(error));

    AnnouncesQuery.myAnnouncesFirstFetch(currentUser.uid, "helping")
      .then((result) => {
        if (result) {
          setHelpingNowAnnounces(result.announces);
        }
      })
      .catch((error) => console.log(error));

    AnnouncesQuery.myAnnouncesFirstFetch(currentUser.uid, "closed")
      .then((result) => {
        if (result) {
          setHelpingNowAnnounces(result.announces);
        }
      })
      .catch((error) => console.log(error));
  }, [currentUser.uid]);

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
        <div className="my-announces-container ann-container">
          <div className="container-title">
            <h3>My active announces</h3>
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
            {myAnnounces &&
              myAnnounces.map((announce) => {
                return (
                  <Card
                    key={announce.id}
                    ID={announce.id}
                    img={announce.announceData.imgURL}
                    name={announce.announceData.name}
                    desc={announce.announceData.description}
                    category={announce.announceData.category}
                    difficulty={announce.announceData.difficulty}
                    uid={announce.announceData.uid}
                  />
                );
              })}
          </div>
        </div>
        <div className="helping-now-container ann-container">
          <div className="container-title">
            <h3>Helping now</h3>
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
            {helpingNowAnnounces &&
              helpingNowAnnounces.map((announce) => {
                return (
                  <Card
                    key={announce.id}
                    ID={announce.id}
                    img={announce.announceData.imgURL}
                    name={announce.announceData.name}
                    desc={announce.announceData.description}
                    category={announce.announceData.category}
                    difficulty={announce.announceData.difficulty}
                    uid={announce.announceData.uid}
                  />
                );
              })}
          </div>
        </div>
        <div className="helped-container ann-container">
          <div className="container-title">
            <h3>Helped people</h3>
            <div
              className="show-hide-btn"
              onClick={() => {
                let newArray = [...isOpen];
                newArray[2] = !isOpen[2];
                setOpen(newArray);
              }}
            >
              {isOpen[2] === true ? "Hide" : "Show"}
            </div>
          </div>
          <div className={`cards-container ${isOpen[2] === true ? "show-container" : "hide-container"}`}>
            {helpedAnnounces &&
              helpedAnnounces.map((announce) => {
                return (
                  <Card
                    key={announce.id}
                    ID={announce.id}
                    img={announce.announceData.imgURL}
                    name={announce.announceData.name}
                    desc={announce.announceData.description}
                    category={announce.announceData.category}
                    difficulty={announce.announceData.difficulty}
                    uid={announce.announceData.uid}
                  />
                );
              })}
          </div>
        </div>
      </div>
      <RenderForm />
    </section>
  );
};

export default Home;
