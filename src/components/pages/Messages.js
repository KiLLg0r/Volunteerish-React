import { useAuth } from "../contexts/AuthContext";

import { useState, useEffect } from "react";

import firebase from "firebase/compat/app";
import "firebase/compat/storage";
import "firebase/compat/firestore";

import { BiSearchAlt } from "react-icons/bi";

const Messages = () => {
  const { currentUser } = useAuth();
  const [conversations, setConversations] = useState([]);

  const db = firebase.firestore();
  const conversationsRef = db.collection("conversations");

  async function getMess() {
    const person1 = conversationsRef.where("person1", "==", currentUser.uid).get();
    const person2 = conversationsRef.where("person2", "==", currentUser.uid).get();

    const [person1Query, person2Query] = await Promise.all([person1, person2]);

    const person1Array = person1Query.docs;
    const person2Array = person2Query.docs;

    const documents = person1Array.concat(person2Array);

    return documents;
  }

  useEffect(() => {
    while (conversations.length === 0) {
      getMess()
        .then((result) => {
          result.forEach((docSnapshot) => {
            const docID = docSnapshot.id;
            setConversations((oldConversation) => [...oldConversation, docID]);
          });
        })
        .catch((error) => console.log(error));
    }
    console.log(conversations);
  });

  return (
    <section className="messages">
      <div className="title">Messages</div>
      <div className="search--messages">
        <input type="text" id="message--search" placeholder="Search conversation" />
        <label htmlFor="message--search">
          <BiSearchAlt />
        </label>
      </div>
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
    </section>
  );
};

export default Messages;
