import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { BiChevronLeft } from "react-icons/bi";
import { useAuth } from "../contexts/AuthContext";
import { BiSend } from "react-icons/bi";
import Queries from "../Queries";
import firebase from "firebase/compat/app";
import "firebase/compat/firestore";

function Conversation(props) {
  const { currentUser, db } = useAuth();
  const state = props.location.state;
  const [nextMessagesLoading, setNextMessagesLoading] = useState(false);
  const [conversationID, setConversationID] = useState("");
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");
  const [lastKey, setLastKey] = useState("");
  const personName = state.name;
  const personUID = state.uid;
  const personImgURL = state.imgURL;
  const history = useHistory();

  const handleGoBack = () => {
    history.push("/messages");
  };

  useEffect(() => {
    if (!conversationID)
      db.collection("conversations")
        .where("uid1", "==", currentUser.uid)
        .where("uid2", "==", personUID)
        .get()
        .then((data) => {
          data.forEach((element) => {
            setConversationID(element.id);
            console.log(`found 1 : ${element.id}`);
          });
        })
        .catch((error) => {
          console.log(error);
        });

    if (!conversationID)
      db.collection("conversations")
        .where("uid2", "==", currentUser.uid)
        .where("uid1", "==", personUID)
        .get()
        .then((data) => {
          data.forEach((element) => {
            setConversationID(element.id);
            console.log(`found 2 : ${element.id}`);
          });
        })
        .catch((error) => {
          console.log(error);
        });

    if (conversationID.length > 0) {
      Queries.getMessages(conversationID).then((result) => {
        setMessages(result.messages);
        setLastKey(result.lastKey);
      });
    }
  }, [conversationID, currentUser.uid, db, personUID]);

  const getMoreMessages = (key) => {
    if (key.length > 0) {
      setNextMessagesLoading(true);
      Queries.getNextMessages(key, currentUser.uid, personUID)
        .then((result) => {
          if (result) {
            setLastKey(result.lastKey);
            setMessages((messages) => [...messages, result.messages]);
            setNextMessagesLoading(false);
          }
        })
        .catch((error) => {
          console.log(error);
          setNextMessagesLoading(false);
        });
    }
  };

  const sendMessage = async (e) => {
    e.preventDefault();

    const query = db.collection("conversations");

    if (!conversationID) {
      await query
        .doc()
        .set({
          uid1: currentUser.uid,
          uid2: personUID,
          name1: currentUser.displayName,
          name2: personName,
          imgURL1: currentUser.photoURL,
          imgURL2: personImgURL,
        })
        .then((doc) => conversationID(doc.id));
    }

    if (message.length > 0) {
      await query.doc(conversationID).collection("messages").doc().set({
        message: message,
        receivedBy: personUID,
        sentBy: currentUser.uid,
        created: firebase.firestore.FieldValue.serverTimestamp(),
        senderName: currentUser.displayName,
        senderPhotoURL: currentUser.photoURL,
      });
      setMessage("");
    }
  };

  return (
    <div className="conversation--page">
      <div className="header">
        <button onClick={handleGoBack}>
          <BiChevronLeft />
        </button>
        <div className="conversation--card--header">
          <img className="conversation--card--img" src={personImgURL} alt="Profile" />
          <div className="conversation--card--name">{personName}</div>
        </div>
      </div>
      <div className="conversation--card">
        <div className="conversation--card--messages">
          {messages.map((message) => (
            <div
              className={`message--card ${currentUser.uid === message.Data.sentBy ? "sent" : "received"}`}
              key={message.ID}
            >
              <img className="message--card--img" alt="Sender" src={message.Data.senderPhotoURL} />
              <div className="message--card--body">
                <div className="message--card--name">{message.Data.senderName}</div>
                <div className="message--card--message">{message.Data.message}</div>
              </div>
            </div>
          ))}
          {nextMessagesLoading ? (
            <p>Loading ...</p>
          ) : (
            lastKey.length > 0 && <button onClick={() => getMoreMessages(lastKey)}>Show more messages</button>
          )}
        </div>
        <form className="send--message--input" onSubmit={sendMessage}>
          <input
            type="text"
            placeholder="Type your message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
          <button type="submit">
            <BiSend />
          </button>
        </form>
      </div>
    </div>
  );
}

export default Conversation;
