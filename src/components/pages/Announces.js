import { useRef, useState, useEffect } from "react";
import { BiChevronDown, BiChevronUp } from "react-icons/bi";
import { BsPlusCircleFill } from "react-icons/bs";
import { Country, State, City } from "country-state-city";
import AddAnnounce from "./AddAnnounce";

import firebase from "firebase/compat/app";
import "firebase/compat/storage";
import "firebase/compat/firestore";

import Card from "../Card";

const Announces = () => {
  const [isOpen, setOpen] = useState(false);
  const countries = Country.getAllCountries();
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);

  const [loading, setLoading] = useState(false);

  const [addAnnounce, setAddAnnounce] = useState(false);
  const [announces, setAnnounces] = useState([]);

  const selectedCountryRef = useRef(null);
  const selectedStateRef = useRef(null);
  const selectedCityRef = useRef(null);
  const orderByRef = useRef(null);

  const showStates = () => {
    setStates([]);
    setCities([]);
    setStates(State.getStatesOfCountry(selectedCountryRef.current.value));
  };

  const showCities = () => {
    setCities([]);
    setCities(City.getCitiesOfState(selectedCountryRef.current.value, selectedStateRef.current.value));
  };

  const DropdownIcon = ({ isOpen }) => {
    if (isOpen) return <BiChevronDown />;
    else return <BiChevronUp />;
  };

  const openModal = (state) => {
    setAddAnnounce(state);
  };

  useEffect(() => {
    if (announces.length === 0) {
      setLoading(true);
      const db = firebase.firestore();
      db.collection("announces")
        .orderBy("posted", "desc")
        .get()
        .then((querySnapshot) => {
          querySnapshot.forEach((doc) => {
            const docData = {
              id: doc.id,
              data: doc.data(),
            };
            setAnnounces((announces) => [...announces, docData]);
          });
        });
      setLoading(false);
    }
  }, [announces]);

  const pullData = (data) => {
    setLoading(data);
  };

  return (
    <section className="announcements">
      <div className="title">Announcements</div>
      <p className="subtitle">Look at the announcements below and can find someone you can help</p>
      <div className="filter">
        <div className="dropdown" id="filterDropdown">
          <div className="dropdown-btn" onClick={() => setOpen(!isOpen)}>
            <div className="subtitle">Filter</div>
            <DropdownIcon isOpen={isOpen} />
          </div>
          <div className={`dropdown-menu ${isOpen ? "opened" : "closed"}`}>
            <div className="select-group">
              <label htmlFor="country">Country:</label>
              <select id="country" ref={selectedCountryRef} onChange={showStates}>
                <option value="">Select a country</option>
                {countries.map((country) => {
                  return (
                    <option value={country.isoCode} key={country.isoCode}>
                      {country.name}
                    </option>
                  );
                })}
              </select>
            </div>
            <div className="select-group">
              <label htmlFor="state">State:</label>
              <select id="state" ref={selectedStateRef} onChange={showCities}>
                <option value="">Select a state</option>
                {states.map((state) => {
                  return (
                    <option value={state.isoCode} key={state.isoCode}>
                      {state.name}
                    </option>
                  );
                })}
              </select>
            </div>
            <div className="select-group">
              <label htmlFor="city">City:</label>
              <select id="city" ref={selectedCityRef}>
                <option value="">Select a city</option>
                {cities.map((city) => {
                  return (
                    <option value={city.isoCode} key={city.isoCode}>
                      {city.name}
                    </option>
                  );
                })}
              </select>
            </div>
            <div className="select-group">
              <label htmlFor="orderBy">Order by:</label>
              <select id="orderBy" ref={orderByRef}>
                <option value="recently">The newest</option>
                <option value="">The oldest</option>
                <option value="difficultyAscending">Difficulty (Ascending)</option>
                <option value="difficultyDescending">Difficulty (Descending)</option>
              </select>
            </div>
          </div>
        </div>
      </div>
      {loading && (
        <div className="spinner">
          <div className="loader">Loading...</div>
        </div>
      )}
      {announces &&
        announces.map((announce) => {
          return (
            <Card
              key={announce.id}
              ID={announce.id}
              name={announce.data.name}
              desc={announce.data.description}
              category={announce.data.category}
              difficulty={announce.data.difficulty}
              uid={announce.data.uid}
              loaded={pullData}
            />
          );
        })}
      <div className="add--ann--button" onClick={() => setAddAnnounce(true)}>
        <BsPlusCircleFill />
      </div>
      {addAnnounce && <AddAnnounce state={openModal} />}
    </section>
  );
};

export default Announces;
