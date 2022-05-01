import { useHistory } from "react-router-dom";
import { BiChevronLeft } from "react-icons/bi";

import firebase from "firebase/compat/app";
import "firebase/compat/storage";
import "firebase/compat/firestore";

import { useAuth } from "../contexts/AuthContext";
import { useState, useEffect, useRef } from "react";

import { Country, State, City } from "country-state-city";
import Input from "../Input";
import SuccessModal from "../SuccessModal";

function Account() {
  const history = useHistory();

  const { currentUser, userData, getData } = useAuth();
  const [save, setSave] = useState(false);
  const [success, setSuccess] = useState(false);

  const countries = Country.getAllCountries();
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);

  const [countryChange, setCountryChange] = useState(false);
  const [stateChange, setStateChange] = useState(false);

  const [currentCountry, setCountry] = useState([]);
  const [currentState, setState] = useState([]);

  const showStates = () => {
    setCountryChange(true);
    setStateChange(true);
    setStates([]);
    setCities([]);
    handleChange();
    setStates(State.getStatesOfCountry(countryRef.current.value));
    stateRef.current.selectedIndex = 0;
    cityRef.current.selectedIndex = 0;
  };

  const showCities = () => {
    setCountryChange(false);
    setStateChange(true);
    setCities([]);
    handleChange();
    setCities(City.getCitiesOfState(countryRef.current.value, stateRef.current.value));
    cityRef.current.selectedIndex = 0;
  };

  useEffect(() => {
    if (!userData) getData(currentUser.uid);

    setStates([]);
    setCities([]);
    setStates(State.getStatesOfCountry(countryRef.current.value));
    setCities(City.getCitiesOfState(countryRef.current.value, stateRef.current.value));

    setCountry(Country.getCountryByCode(userData.country));
    setState(State.getStateByCodeAndCountry(userData.state, userData.country));
  }, [currentUser.uid, userData, getData, currentCountry, currentState]);

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
      const profileImagesRef = storage.ref().child(`profile/${currentUser.uid}`);
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
      setSave(true);
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
    setSave(false);
  };

  const pullData = (state) => {
    setSuccess(state);
  };

  const handleInputChange = (status) => {
    if (status) setSave(true);
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
        <Input
          name="Name"
          type="text"
          value={currentUser.displayName}
          ref={nameRef}
          change={handleInputChange}
          icon="name"
        />
        <Input
          name="Email"
          type="email"
          value={currentUser.email}
          ref={emailRef}
          change={handleInputChange}
          icon="email"
        />
        <div className="user-data">
          <label htmlFor="input">Country</label>
          <select id="country" ref={countryRef} onChange={showStates}>
            <option value={userData.country} key={userData.country}>
              {currentCountry.name}
            </option>
            {countries &&
              countries.map((country) => {
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
            {countryChange ? (
              <option value="">Select state</option>
            ) : (
              <option value={userData.state} key={userData.state}>
                {currentState.name}
              </option>
            )}
            {states &&
              states.map((state) => {
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
            {stateChange ? (
              <option value="">Select city</option>
            ) : (
              <option value={userData.city} key={userData.city}>
                {userData.city}
              </option>
            )}
            {cities &&
              cities.map((city) => {
                return (
                  <option value={city.isoCode} key={city.isoCode}>
                    {city.name}
                  </option>
                );
              })}
          </select>
        </div>
        <Input
          name="Street"
          type="text"
          value={userData.street}
          ref={streetRef}
          change={handleInputChange}
          icon="address"
        />
        <Input
          name="Street Number"
          type="number"
          value={userData.streetNumber}
          ref={streetNumberRef}
          change={handleInputChange}
          icon="address"
        />
        <Input
          name="Building"
          type="text"
          value={userData.building}
          ref={buildingRef}
          change={handleInputChange}
          icon="address"
        />
        <Input
          name="Apartment"
          type="text"
          value={userData.apartment}
          ref={apartmentRef}
          change={handleInputChange}
          icon="address"
        />
        <Input
          name="Zipcode"
          type="number"
          value={userData.zipcode}
          ref={zipcodeRef}
          change={handleInputChange}
          icon="address"
        />
        <button typeof="submit" className={`save-btn ${save ? "" : "disabled"}`} disabled={!save}>
          Save changes
        </button>
      </form>
      {success && <SuccessModal state={pullData} title="Changes were successfully saved!" sec="3" />}
    </div>
  );
}

export default Account;
