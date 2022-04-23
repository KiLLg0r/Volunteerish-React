import { useState, useEffect } from "react";

import { useAuth } from "./contexts/AuthContext";

import firebase from "firebase/compat/app";
import "firebase/compat/storage";
import "firebase/compat/firestore";

function Conversation({ document }) {
  const [imgURL, setImgURL] = useState("");
  const [name, setName] = useState("");
  const [lastMessage, setLastMessage] = useState("");
  const [person, setPerson] = useState("");
  const [loading, setLoading] = useState(false);
  const { currentUser } = useAuth();
  const conversationRef = firebase.firestore().collection("conversations").doc(document);

  useEffect(() => {
    setLoading(true);
    const unsubscribe = conversationRef
      .get()
      .then((doc) => {
        const person1 = doc.data().person1;
        const person1Name = doc.data().person1Name;
        const person2 = doc.data().person2;
        const person2Name = doc.data().person2Name;
        if (person1 !== currentUser.uid) {
          setPerson(person1);
          setName(person1Name);
        } else {
          setPerson(person2);
          setName(person2Name);
        }
      })
      .catch((error) => console.log(error));
    setLoading(false);

    return unsubscribe;
  }, [conversationRef, currentUser.uid, document, person]);

  useEffect(() => {
    setLoading(true);
    const storage = firebase.app().storage("gs://volunteerish-ed549.appspot.com");
    const profileImagesRef = storage.ref().child(`profile/${person}`);
    const unsubscribe = profileImagesRef
      .getDownloadURL()
      .then((url) => setImgURL(url))
      .catch((error) => console.log(error));
    setLoading(false);

    return unsubscribe;
  }, [person]);

  useEffect(() => {
    setLoading(true);
    const lastMessage = conversationRef.collection("messages").orderBy("time", "desc").limit(1);
    const unsubscribe = lastMessage.onSnapshot((docs) => {
      docs.forEach((doc) => {
        setLastMessage(doc.data().message);
      });
    });
    setLoading(false);

    return unsubscribe;
  }, [conversationRef]);

  return (
    <div className="list--item">
      {!loading ? (
        <>
          <img className="list--pic" src={imgURL} alt="User profile" />
          <div className="list--text">
            <div className="list--name">{name}</div>
            <div className="list--last-message">{lastMessage}</div>
          </div>
        </>
      ) : (
        ""
      )}
    </div>
  );
}

export default Conversation;
