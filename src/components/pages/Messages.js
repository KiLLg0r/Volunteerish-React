import { useAuth } from "../contexts/AuthContext";

import { useState, useEffect } from "react";

import firebase from "firebase/compat/app";
import "firebase/compat/storage";
import "firebase/compat/firestore";

import { BiSearchAlt } from "react-icons/bi";
import Conversation from "../Conversation";

const Messages = () => {
  const { currentUser } = useAuth();
  const [conversations, setConversations] = useState([]);

  const db = firebase.firestore();
  const conversationsRef = db.collection("conversations");

  useEffect(() => {
    async function getMess() {
      const person1 = conversationsRef.where("person1", "==", currentUser.uid).get();
      const person2 = conversationsRef.where("person2", "==", currentUser.uid).get();

      const [person1Query, person2Query] = await Promise.all([person1, person2]);

      const person1Array = person1Query.docs;
      const person2Array = person2Query.docs;

      const documents = person1Array.concat(person2Array);

      return documents;
    }

    if (conversations.length === 0) {
      getMess()
        .then((result) => {
          result.forEach((docSnapshot) => {
            const docID = docSnapshot.id;
            setConversations((oldConversation) => [...oldConversation, docID]);
          });
        })
        .catch((error) => console.log(error));
    }
  }, [conversations.length, conversationsRef, currentUser.uid]);

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
        {conversations.map((conversation) => (
          <Conversation key={conversation} document={conversation} />
        ))}
      </div>
    </section>
  );
};

export default Messages;
