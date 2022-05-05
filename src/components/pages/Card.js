import { useState, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import { BiChevronLeft } from "react-icons/bi";
import { Country, State } from "country-state-city";
import { useAuth } from "../contexts/AuthContext";
import firebase from "firebase/compat/app";
import "firebase/compat/firestore";

function Card() {
  const { id } = useParams();
  const { currentUser } = useAuth();

  const history = useHistory();

  const [difficulty, setDifficulty] = useState("");
  const [announceData, setAnnounceData] = useState({});
  const [announceCountry, setAnnounceCountry] = useState("");
  const [announceState, setAnnounceState] = useState("");
  const [helping, setHelping] = useState(false);
  const [myAnnounce, setMyAnnounce] = useState(false);
  const [age, setAge] = useState("");

  const db = firebase.firestore();
  const docRef = db.collection("announces").doc(id);

  useEffect(() => {
    if (!announceData)
      docRef
        .get()
        .then((doc) => {
          if (doc) setAnnounceData(doc.data());
        })
        .catch((error) => {
          console.log("Error getting document:", error);
        });

    switch (announceData.difficulty) {
      case "0":
        setDifficulty("Easy");
        break;
      case "1":
        setDifficulty("Medium");
        break;
      case "2":
        setDifficulty("Hard");
        break;
      default:
        break;
    }

    if (announceData.helpedBy === currentUser.uid) setHelping(true);
    if (announceData.uid === currentUser.uid) setMyAnnounce(true);

    setAnnounceCountry(Country.getCountryByCode(announceData.country));
    setAnnounceState(State.getStateByCodeAndCountry(announceData.state, announceData.country));
  }, [announceData.difficulty, announceData.uid, docRef, currentUser.uid, announceData.helpedBy, announceData]);

  const SensitiveData = () => {
    useEffect(() => {
      const today = new Date();
      const birthDate = new Date(announceData.dateOfBirth);
      let age = today.getFullYear() - birthDate.getFullYear();
      const month = today.getMonth() - birthDate.getMonth();
      if (month < 0 || (month === 0 && today.getDate() < birthDate.getDate())) age--;
      setAge(age);

      setAnnounceCountry(Country.getCountryByCode(announceData.country));
      setAnnounceState(State.getStateByCodeAndCountry(announceData.state, announceData.country));
    }, []);

    return (
      <div className="sensitive--data">
        <div className="card--data email">
          <div className="card--label">Email</div>
          {announceData.email}
        </div>
        <div className="card--data phone">
          <div className="card--label">Phone number</div>
          {announceData.phone}
        </div>
        <div className="card--data dateOfBirth">
          <div className="card--label">Age</div>
          {age}
        </div>
        <div className="card--data country">
          <div className="card--label">Country</div>
          {announceCountry.name}
        </div>
        <div className="card--data state">
          <div className="card--label">State</div>
          {announceState.name}
        </div>
        <div className="card--data city">
          <div className="card--label">City</div>
          {announceData.city}
        </div>
        <div className="card--data street">
          <div className="card--label">Street</div>
          {announceData.street}
        </div>
        <div className="card--data streetNumber">
          <div className="card--label">Street number</div>
          {announceData.streetNumber}
        </div>
        <div className="card--data building">
          <div className="card--label">Building</div>
          {announceData.building}
        </div>
        <div className="card--data apartment">
          <div className="card--label">Apartment</div>
          {announceData.apartment}
        </div>
        <div className="card--data zipcode">
          <div className="card--label">Zipcode</div>
          {announceData.zipcode}
        </div>
      </div>
    );
  };

  const helpNow = () => {
    setHelping(true);
    docRef.set(
      {
        helpedBy: currentUser.uid,
        status: "helping",
      },
      { merge: true },
    );
  };

  const closeAnnounce = () => {};
  const editAnnounce = () => {};

  return (
    <div className="full--card">
      <div className="header">
        <button onClick={history.goBack}>
          <BiChevronLeft />
        </button>
        Go back
      </div>
      <div className="card--content">
        <img className="card--img" src={announceData.imgURL} alt="User" />
        <div className="card--data name">
          <div className="card--label">Name</div>
          {announceData.name}
        </div>
        <div className="card--data description">
          <div className="card--label">Description</div>
          {announceData.description}
        </div>
        <div className="card--data category">
          <div className="card--label">Category</div>
          {announceData.category}
        </div>
        <div className={`card--data difficulty ${difficulty}`}>
          <div className="card--label">Difficulty</div>
          {difficulty}
        </div>
        <SensitiveData />
        {!helping && (
          <div className="btn--group">
            <button onClick={history.goBack} className="cancel--btn">
              Cancel
            </button>
            <button onClick={helpNow} className="help--btn">
              Help now
            </button>
          </div>
        )}
        {myAnnounce && (
          <div className="btn--group">
            <button onClick={closeAnnounce} className="close--btn">
              Cancel
            </button>
            <button onClick={editAnnounce} className="edit--btn">
              Help now
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default Card;
