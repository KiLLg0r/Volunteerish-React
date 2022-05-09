import { useRef, useState, useEffect } from "react";
import { BiChevronDown, BiChevronUp } from "react-icons/bi";
import { BsPlusCircleFill } from "react-icons/bs";
import Card from "../Card";
import { Link } from "react-router-dom";
import AnnouncesQuery from "../Queries";
import { useAuth } from "../contexts/AuthContext";

const Announces = () => {
  const { currentUser, Country, State, City } = useAuth();

  const [isOpen, setOpen] = useState(false);
  const countries = Country.getAllCountries();
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);

  const [loading, setLoading] = useState(false);

  const [announces, setAnnounces] = useState([]);
  const [lastKey, setLastKey] = useState("");
  const [nextAnnouncesLoading, setNextAnnouncesLoading] = useState(false);

  const [filter, setFilter] = useState({
    country: "",
    state: "",
    city: "",
    order: "recently",
  });

  const selectedCountryRef = useRef(null);
  const selectedStateRef = useRef(null);
  const selectedCityRef = useRef(null);
  const orderByRef = useRef(null);

  const showStates = () => {
    setStates([]);
    setCities([]);
    setStates(State.getStatesOfCountry(selectedCountryRef.current.value));
    setFilter((lastFilter) => ({
      ...lastFilter,
      country: selectedCountryRef.current.value,
    }));
    setAnnounces([]);
    AnnouncesQuery.announcesFirstFetch(currentUser.uid, filter)
      .then((result) => {
        setAnnounces(result.announces);
        setLastKey(result.lastKey);
      })
      .catch((error) => console.log(error));
  };

  const showCities = () => {
    setCities([]);
    setCities(City.getCitiesOfState(selectedCountryRef.current.value, selectedStateRef.current.value));
    setFilter((lastFilter) => ({
      ...lastFilter,
      state: selectedStateRef.current.value,
    }));
    setAnnounces([]);
    AnnouncesQuery.announcesFirstFetch(currentUser.uid, filter)
      .then((result) => {
        setAnnounces(result.announces);
        setLastKey(result.lastKey);
      })
      .catch((error) => console.log(error));
  };

  const handleCityChange = () => {
    setFilter((lastFilter) => ({
      ...lastFilter,
      city: selectedCityRef.current.value,
    }));
    setAnnounces([]);
    AnnouncesQuery.announcesFirstFetch(currentUser.uid, filter)
      .then((result) => {
        setAnnounces(result.announces);
        setLastKey(result.lastKey);
      })
      .catch((error) => console.log(error));
  };

  const handleOrderChange = () => {
    setFilter((lastFilter) => ({
      ...lastFilter,
      order: orderByRef.current.value,
    }));
    AnnouncesQuery.announcesFirstFetch(currentUser.uid, filter)
      .then((result) => {
        setAnnounces(result.announces);
        setLastKey(result.lastKey);
      })
      .catch((error) => console.log(error));
  };

  const DropdownIcon = ({ isOpen }) => {
    if (isOpen) return <BiChevronDown />;
    else return <BiChevronUp />;
  };

  const pullData = (data) => {
    setLoading(data);
  };

  useEffect(() => {
    AnnouncesQuery.announcesFirstFetch(currentUser.uid, filter)
      .then((result) => {
        if (result) {
          setAnnounces(result.announces);
          setLastKey(result.lastKey);
        }
      })
      .catch((error) => console.log(error));
  }, [currentUser.uid, filter]);

  const fetchMoreAnnounces = (key) => {
    if (key.length > 0) {
      setNextAnnouncesLoading(true);
      AnnouncesQuery.announcesNextFetch(key, currentUser.uid, filter)
        .then((result) => {
          if (result) {
            setLastKey(result.lastKey);
            setAnnounces((announces) => [...announces, result.announces]);
            setNextAnnouncesLoading(false);
          }
        })
        .catch((error) => {
          console.log(error);
          setNextAnnouncesLoading(false);
        });
    }
  };

  const allAnnounces = (
    <>
      {announces.map((announce) => {
        return (
          <Link to={`/announce/${announce.ID}`} style={{ textDecoration: "none" }}>
            <Card
              key={announce.ID}
              ID={announce.ID}
              img={announce.Data.imgURL}
              name={announce.Data.name}
              desc={announce.Data.description}
              category={announce.Data.category}
              difficulty={announce.Data.difficulty}
              uid={announce.Data.uid}
              loaded={pullData}
            />
          </Link>
        );
      })}
    </>
  );

  return (
    <section className="announcements">
      <div className="title">Announcements</div>
      <p className="subtitle">Look at the announcements below and can find someone you can help</p>
      <div className="announces--content">
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
                <select id="city" ref={selectedCityRef} onChange={handleCityChange}>
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
                <select id="orderBy" ref={orderByRef} onChange={handleOrderChange}>
                  <option value="recently">The newest</option>
                  <option value="latest">The oldest</option>
                  <option value="difficultyAscending">Difficulty (Ascending)</option>
                  <option value="difficultyDescending">Difficulty (Descending)</option>
                </select>
              </div>
            </div>
          </div>
        </div>
        <div className="all--announces">{allAnnounces}</div>
      </div>
      {loading && (
        <div className="spinner">
          <div className="loader">Loading...</div>
        </div>
      )}
      {nextAnnouncesLoading ? (
        <p>Loading ...</p>
      ) : (
        lastKey.length > 0 && <button onClick={() => fetchMoreAnnounces(lastKey)}>Show more announces</button>
      )}
      <Link to="/add-announce" className="add--ann--button">
        <BsPlusCircleFill />
      </Link>
    </section>
  );
};

export default Announces;
