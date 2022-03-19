import { useHistory } from "react-router-dom";
import { BiChevronLeft } from "react-icons/bi";

import firebase from "firebase/compat/app";
import "firebase/compat/storage";
import "firebase/compat/firestore";

import { useAuth } from "../contexts/AuthContext";
import { useState, useEffect, useRef } from "react";

import { Country, State, City } from "country-state-city";

function Account() {
  const history = useHistory();

  const { currentUser, userData, getData } = useAuth();
  const [save, setSave] = useState(false);
  const [success, setSuccess] = useState(false);

  const countries = Country.getAllCountries();
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);

  const [currentCountry, setCountry] = useState([]);
  const [currentState, setState] = useState([]);

  const showStates = () => {
    setStates([]);
    setCities([]);
    handleChange();
    setStates(State.getStatesOfCountry(countryRef.current.value));
  };

  const showCities = () => {
    setCities([]);
    handleChange();
    setCities(City.getCitiesOfState(countryRef.current.value, stateRef.current.value));
  };

  useEffect(() => {
    if (!userData) getData(currentUser.uid)
  });

  if(userData) {
    showStates();
    showCities();
    setCountry(Country.getCountryByCode(userData.country));
    setState(State.getStateByCodeAndCountry(userData.state, userData.country));
  }

  let file = 0;

  const imgRef = useRef(null);
  const fileRef = useRef(null);

  const nameRef = useRef(null);
  const emailRef = useRef(null);
  const countryRef = useRef(null);
  const stateRef = useRef(null);
  const cityRef = useRef(null);
  const streetRef = useRef(null);
  const streetNumberRef = useRef(null);
  const buildingRef = useRef(null);
  const apartmentRef = useRef(null);
  const zipcodeRef = useRef(null);

  const db = firebase.firestore();
  const userDoc = db.collection("users").doc(currentUser.uid);

  const uploadImg = () => {
    fileRef.current.click();
  };

  const updateImg = () => {
    if (file !== 0) {
      const storage = firebase.app().storage("gs://volunteerish-ed549.appspot.com");
      const profileImagesRef = storage.ref().child(`profile/${currentUser.uid}-${file.name}`);
      const task = profileImagesRef.put(file);
      task.on(
        "state_changed",
        function progress(snapshot) {},
        function error(err) {},
        function complete() {
          profileImagesRef
            .getDownloadURL()
            .then((url) => {
              const imageURL = url;
              currentUser
                .updateProfile({ photoURL: imageURL })
                .then(() => {
                  console.log("Successfully update image");
                })
                .catch((error) => {
                  console.log(error);
                });
            })
            .catch((error) => {
              console.log(error);
            });
        },
      );
    } else {
      currentUser
        .updateProfile({ photoURL: currentUser.photoURL })
        .then(() => {
          console.log("The picture could not be uploaded!");
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  const loadFile = (event) => {
    if (event.target.files && event.target.files[0]) {
      file = event.target.files[0];
      imgRef.current.src = URL.createObjectURL(file);
      updateImg();
    }
  };

  const handleChange = () => {
    setSave(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    currentUser.updateProfile({ displayName: nameRef.current.value }).catch((error) => console.log(error));
    currentUser.updateEmail(emailRef.current.value).catch((error) => console.log(error));
    userDoc
      .set({
        country: countryRef.current.value,
        state: stateRef.current.value,
        city: cityRef.current.value,
        street: streetRef.current.value,
        streetNumber: streetNumberRef.current.value,
        building: buildingRef.current.value,
        apartment: apartmentRef.current.value,
        zipcode: zipcodeRef.current.value,
      })
      .catch((error) => console.log(error));
    setSuccess(true);
    setTimeout(() => {
      setSuccess(false);
    }, 2000);
  };

  return (
    <div className="account">
      <div className="header">
        <button onClick={history.goBack}>
          <BiChevronLeft />
        </button>
        Edit your profile
      </div>
      <form onSubmit={handleSubmit}>
        <div className="img-upload">
          <img
            src={currentUser.photoURL}
            ref={imgRef}
            onClick={uploadImg}
            alt="Placeholder for uploading profile"
            className="img-placeholder"
          />
          <input
            type="file"
            name="imageUpload"
            onChange={loadFile}
            style={{ display: "none" }}
            ref={fileRef}
            accept="image/*"
          />
          <label htmlFor="file" style={{ cursor: "pointer" }} onClick={uploadImg} className="img-label">
            Change image
          </label>
        </div>
        <div className="user-data">
          <label htmlFor="input">Name</label>
          <input type="text" defaultValue={currentUser.displayName} ref={nameRef} onChange={handleChange} />
        </div>
        <div className="user-data">
          <label htmlFor="input">Email</label>
          <input type="email" defaultValue={currentUser.email} ref={emailRef} onChange={handleChange} />
        </div>
        <div className="user-data">
          <label htmlFor="input">Country</label>
          <select id="country" ref={countryRef} onChange={showStates}>
            <option value={userData.country}>{currentCountry.name}</option>
            {countries.map((country) => {
              return (
                <option value={country.isoCode} key={country.isoCode}>
                  {country.name}
                </option>
              );
            })}
          </select>
        </div>
        <div className="user-data">
          <label htmlFor="input">State</label>
          <select id="state" ref={stateRef} onChange={showCities}>
            <option value={userData.state}>{currentState.name}</option>
            {states.map((state) => {
              return (
                <option value={state.isoCode} key={state.isoCode}>
                  {state.name}
                </option>
              );
            })}
          </select>
        </div>
        <div className="user-data">
          <label htmlFor="input">City</label>
          <select id="city" ref={cityRef} onChange={handleChange}>
            <option value={userData.city}>{userData.city}</option>
            {cities.map((city) => {
              return (
                <option value={city.isoCode} key={city.isoCode}>
                  {city.name}
                </option>
              );
            })}
          </select>
        </div>
        <div className="user-data">
          <label htmlFor="input">Street</label>
          <input type="text" defaultValue={userData.street} ref={streetRef} onChange={handleChange} />
        </div>
        <div className="user-data">
          <label htmlFor="input">Street Number</label>
          <input type="number" defaultValue={userData.streetNumber} ref={streetNumberRef} onChange={handleChange} />
        </div>
        <div className="user-data">
          <label htmlFor="input">Building</label>
          <input type="text" defaultValue={userData.building} ref={buildingRef} onChange={handleChange} />
        </div>
        <div className="user-data">
          <label htmlFor="input">Apartment</label>
          <input type="text" defaultValue={userData.apartment} ref={apartmentRef} onChange={handleChange} />
        </div>
        <div className="user-data">
          <label htmlFor="input">Zipcode</label>
          <input type="number" defaultValue={userData.zipcode} ref={zipcodeRef} onChange={handleChange} />
        </div>
        <button typeof="submit" className={`save-btn ${save ? "" : "disabled"}`} disabled={!save}>
          Save changes
        </button>
      </form>
      <div className={`success--modal ${success ? "show" : "hide"}`}>
        <h1 className="modal--title">Changes saved successfully</h1>
        <h3 className="modal--subtitle">This window will automatically close in 2 seconds</h3>
      </div>
    </div>
  );
}

export default Account;
