import { useState, useEffect, useRef } from "react";
import { useParams, useHistory } from "react-router-dom";
import { BiChevronLeft } from "react-icons/bi";
import { useAuth } from "../contexts/AuthContext";
import AnnounceQuery from "../AnnounceQuery";
import firebase from "firebase/compat/app";
import "firebase/compat/firestore";
import Input from "../Input";

function Card() {
  const { id } = useParams();
  const { currentUser, Country, State, City } = useAuth();

  const history = useHistory();

  const [difficulty, setDifficulty] = useState("");
  const [helping, setHelping] = useState(false);
  const [myAnnounce, setMyAnnounce] = useState(false);
  const [edit, setEdit] = useState(false);
  const [confirmEdit, setConfirmEdit] = useState(false);
  const [announceData, setAnnounceData] = useState({});
  const [age, setAge] = useState("");

  const countries = Country.getAllCountries();
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);

  const [currentCountry, setCountry] = useState([]);
  const [currentState, setState] = useState([]);

  const db = firebase.firestore();
  const docRef = db.collection("announces").doc(id);

  const nameRef = useRef(null);
  const emailRef = useRef(null);
  const phoneNumberRef = useRef(null);
  const descRef = useRef(null);
  const categoryRef = useRef(null);
  const difficultyRef = useRef(null);
  const countryRef = useRef(null);
  const stateRef = useRef(null);
  const cityRef = useRef(null);
  const streetRef = useRef(null);
  const streetNumberRef = useRef(null);
  const buildingRef = useRef(null);
  const apartmentRef = useRef(null);
  const zipcodeRef = useRef(null);

  const showStates = () => {
    setStates([]);
    setCities([]);
    setConfirmEdit(true);
    setStates(State.getStatesOfCountry(countryRef.current.value));
  };

  const showCities = () => {
    setCities([]);
    setConfirmEdit(true);
    setCities(City.getCitiesOfState(countryRef.current.value, stateRef.current.value));
  };

  useEffect(() => {
    AnnounceQuery.getAnnounceData(id)
      .then((data) => {
        if (data) {
          setAnnounceData(data);
        } else console.table("No data");
      })
      .catch((error) => console.log(error));

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

    setStates(State.getStatesOfCountry(announceData.country));
    setCities(City.getCitiesOfState(announceData.country, announceData.state));

    setCountry(Country.getCountryByCode(announceData.country));
    setState(State.getStateByCodeAndCountry(announceData.state, announceData.country));
  }, [announceData, docRef, currentUser.uid, id, State, City, Country]);

  const SensitiveData = () => {
    useEffect(() => {
      const today = new Date();
      const birthDate = new Date(announceData.dateOfBirth);
      let age = today.getFullYear() - birthDate.getFullYear();
      const month = today.getMonth() - birthDate.getMonth();
      if (month < 0 || (month === 0 && today.getDate() < birthDate.getDate())) age--;
      setAge(age);
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
          {announceData.country}
        </div>
        <div className="card--data state">
          <div className="card--label">State</div>
          {announceData.state}
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

  const EditData = () => {
    const handleChange = () => {
      setConfirmEdit(true);
    };

    return (
      <div className="card--content">
        <img className="card--img" src={announceData.imgURL} alt="User" />
        <Input name="Name" ref={nameRef} icon="name" value={announceData.name} onChange={handleChange} />
        <div className="input--field">
          <div className="input--content">
            <div className="input--label">Description</div>
            <textarea
              ref={descRef}
              cols="30"
              rows="8"
              value={announceData.description}
              onChange={handleChange}
            ></textarea>
          </div>
        </div>
        <div className="input--field">
          <div className="input--content">
            <div className="input--label">Category</div>
            <select ref={categoryRef} onChange={handleChange}>
              <option value="select">Select category</option>
              <option value="Groceries">Groceries</option>
              <option value="School meditations">School meditations</option>
              <option value="Shopping">Shopping</option>
              <option value="Cleaning">Cleaning</option>
              <option value="Walking">Walking</option>
              <option value="Cooking">Cooking</option>
              <option value="Paying of bills">Paying of bills</option>
              <option value="Emotional support">Emotional support</option>
              <option value="Physical labour">Physical labour</option>
              <option value="Hard work">Hard work</option>
            </select>
          </div>
        </div>
        <div className="input--field">
          <div className="input--content">
            <div className="input--label">Difficulty</div>
            <select ref={difficultyRef} onChange={handleChange}>
              <option value="select">Select difficulty</option>
              <option value="0">Easy</option>
              <option value="1">Medium</option>
              <option value="2">Hard</option>
            </select>
          </div>
        </div>
        <div className="sensitive--data">
          <Input name="Email" ref={emailRef} icon="email" value={currentUser.email} onChange={handleChange} />
          <Input name="Phone number" ref={phoneNumberRef} icon="phone" value={"+40774653200"} onChange={handleChange} />
          <div className="input--field">
            <div className="input--content">
              <div className="input--label">Country</div>
              <select ref={countryRef} onChange={showStates}>
                <option value={announceData.country} key={announceData.country}>
                  {currentCountry.name}
                </option>
                {countries.map((country) => {
                  return (
                    <option value={country.isoCode} key={country.isoCode}>
                      {country.name}
                    </option>
                  );
                })}
              </select>
            </div>
          </div>
          <div className="input--field">
            <div className="input--content">
              <div className="input--label">State</div>
              <select ref={stateRef} onChange={showCities}>
                <option value={announceData.state} key={announceData.state}>
                  {currentState.name}
                </option>
                {states.map((state) => {
                  return (
                    <option value={state.isoCode} key={state.isoCode}>
                      {state.name}
                    </option>
                  );
                })}
              </select>
            </div>
          </div>
          <div className="input--field">
            <div className="input--content">
              <div className="input--label">City</div>
              <select ref={cityRef} onChange={handleChange}>
                <option value={announceData.city} key={announceData.city}>
                  {announceData.city}
                </option>
                {cities.map((city) => {
                  return (
                    <option value={city.isoCode} key={city.isoCode}>
                      {city.name}
                    </option>
                  );
                })}
              </select>
            </div>
          </div>
          <Input name="Street" ref={streetRef} icon="address" value={announceData.street} onChange={handleChange} />
          <Input
            name="Street Number"
            ref={streetNumberRef}
            icon="address"
            value={announceData.streetNumber}
            onChange={handleChange}
          />
          <Input
            name="Building"
            ref={buildingRef}
            icon="address"
            value={announceData.building}
            onChange={handleChange}
          />
          <Input
            name="Apartment"
            ref={apartmentRef}
            icon="address"
            value={announceData.apartment}
            onChange={handleChange}
          />
          <Input name="Zipcode" ref={zipcodeRef} icon="address" value={announceData.zipcode} onChange={handleChange} />
        </div>
        {confirmEdit && <button className="confirm--edit">Confirm changes</button>}
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

  const closeAnnounce = () => {
    docRef.set(
      {
        status: "closed",
      },
      { merge: true },
    );
  };

  const editAnnounce = () => {
    setEdit(true);
  };

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
          {(helping || myAnnounce) && <SensitiveData />}
          {!helping && !myAnnounce && (
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
                Close
              </button>
              <button onClick={editAnnounce} className="edit--btn">
                Edit
              </button>
            </div>
          )}
        </div>
    </div>
  );
}

export default Card;
