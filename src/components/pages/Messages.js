import { useAuth } from "../contexts/AuthContext";

import firebase from "firebase/compat/app";
import "firebase/compat/storage";
import "firebase/compat/firestore";

const Messages = () => {
  const { currentUser } = useAuth();

  const db = firebase.firestore();

  const getMes = () => {
    db.collection("conversations")
      .where("person2", "==", currentUser.uid)
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          db.collection("conversations")
            .doc(doc.id)
            .collection("messages")
            .get()
            .then((querySnapshot) => {
              querySnapshot.forEach((doc) => {
                console.log(doc.id, " => ", doc.data());
              });
            })
            .catch((error) => {
              console.log("Error getting messages: ", error);
            });
        });
      })
      .catch((error) => {
        console.log("Error getting documents: ", error);
      });
  };

  return (
    <section className="messages">
      <div className="title">Messages</div>
      <hr className="line" />
      <div className="profile">
        <img className="profile--pic" src={currentUser.photoURL} alt="User profile" />
        <div className="profile--text">
          <div className="profile--name">{currentUser.displayName}</div>
          <div className="profile--status">Online</div>
        </div>
      </div>
      <hr className="line" />
      <div className="list-messages">
        <div className="list--item">
          <img className="list--pic" src={currentUser.photoURL} alt="User profile" />
          <div className="list--text">
            <div className="list--name">{currentUser.displayName}</div>
            <div className="list--last-message">Frumos aseara, nu ?</div>
          </div>
        </div>
        <div className="list--item">
          <img className="list--pic" src={currentUser.photoURL} alt="User profile" />
          <div className="list--text">
            <div className="list--name">{currentUser.displayName}</div>
            <div className="list--last-message">Frumos aseara, nu ?</div>
          </div>
        </div>
        <div className="list--item">
          <img className="list--pic" src={currentUser.photoURL} alt="User profile" />
          <div className="list--text">
            <div className="list--name">{currentUser.displayName}</div>
            <div className="list--last-message">Frumos aseara, nu ?</div>
          </div>
        </div>
        <div className="list--item">
          <img className="list--pic" src={currentUser.photoURL} alt="User profile" />
          <div className="list--text">
            <div className="list--name">{currentUser.displayName}</div>
            <div className="list--last-message">Frumos aseara, nu ?</div>
          </div>
        </div>
      </div>
      <button onClick={getMes}>click me</button>
    </section>
  );
};

export default Messages;
