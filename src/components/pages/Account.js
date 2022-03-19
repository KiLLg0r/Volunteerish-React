import { useHistory } from "react-router-dom";
import { BiChevronLeft } from "react-icons/bi";

import firebase from "firebase/compat/app";
import "firebase/compat/storage";
import "firebase/compat/firestore";

import { useRef } from "react";

import { useAuth } from "../contexts/AuthContext";
import { useEffect, useState } from "react";

function Account() {
  const history = useHistory();

  const { currentUser } = useAuth();
  const [userDetails, setUserDetails] = useState();
  const [loading, setLoading] = useState(true);

  let file = 0;

  const imgRef = useRef(null);
  const fileRef = useRef(null);

  const db = firebase.firestore();
  const userDoc = db.collection("users").doc(currentUser.uid);

  useEffect(() => {
    setLoading(true);
    userDoc.get().then((doc) => setUserDetails(doc.data()));
    setLoading(false);
  }, [userDoc]);

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

  const MainComponent = () => {
    return (
      <>
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
          <input type="text" value={currentUser.displayName} />
        </div>
        <div className="user-data">
          <label htmlFor="input">Email</label>
          <input type="text" value={currentUser.email} />
        </div>
        <div className="user-data">
          <label htmlFor="input">Country</label>
          <input type="text" value={userDetails} />
        </div>
        <div className="user-data">
          <label htmlFor="input">State</label>
          <input type="text" value={userDetails} />
        </div>
        <div className="user-data">
          <label htmlFor="input">City</label>
          <input type="text" value={userDetails} />
        </div>
        <div className="user-data">
          <label htmlFor="input">Street</label>
          <input type="text" value={userDetails} />
        </div>
        <div className="user-data">
          <label htmlFor="input">Street Number</label>
          <input type="text" value={userDetails} />
        </div>
        <div className="user-data">
          <label htmlFor="input">Building</label>
          <input type="text" value={userDetails} />
        </div>
        <div className="user-data">
          <label htmlFor="input">Apartment</label>
          <input type="text" value={userDetails} />
        </div>
        <div className="user-data">
          <label htmlFor="input">Zipcode</label>
          <input type="text" value={userDetails} />
        </div>
        <button onClick={console.log(userDetails + "ha")}>details</button>
      </>
    );
  };

  const Spinner = () => {
    return <div className="spinner">spinner</div>;
  };

  const Main = () => {
    if (loading) return <Spinner />;
    else return <MainComponent />;
  };

  return (
    <div className="account">
      <div className="header">
        <button onClick={history.goBack}>
          <BiChevronLeft />
        </button>
        Edit your profile
      </div>
      <Main />
    </div>
  );
}

export default Account;
