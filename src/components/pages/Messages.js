import { useAuth } from "../contexts/AuthContext";
import { useState, useEffect } from "react";
import { BiSearchAlt } from "react-icons/bi";
import Conversation from "../Conversation";
import Queries from "../Queries";
import { Link } from "react-router-dom";

const Messages = () => {
  const { currentUser } = useAuth();
  const [conversations, setConversations] = useState([]);

  useEffect(() => {
    if (conversations.length === 0)
      Queries.getConversations(currentUser.uid).then((result) => {
        setConversations(result);
      });
  }, [conversations, currentUser.uid]);

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
          <Link
            to={{
              pathname: `/conversation/${
                conversation.data.uid1 === currentUser.uid ? conversation.data.name2 : conversation.data.name1
              }`,
              state: {
                name: conversation.data.uid1 === currentUser.uid ? conversation.data.name2 : conversation.data.name1,
                imgURL:
                  conversation.data.uid1 === currentUser.uid ? conversation.data.imgURL2 : conversation.data.imgURL1,
                uid: conversation.data.uid1 === currentUser.uid ? conversation.data.uid2 : conversation.data.uid1,
              },
            }}
            style={{ textDecoration: "none" }}
          >
            <Conversation
              key={conversation.ID}
              uid={conversation.data.uid1 === currentUser.uid ? conversation.data.uid2 : conversation.data.uid1}
              name={conversation.data.uid1 === currentUser.uid ? conversation.data.name2 : conversation.data.name1}
              imgURL={
                conversation.data.uid1 === currentUser.uid ? conversation.data.imgURL2 : conversation.data.imgURL1
              }
              lastMessage={conversation.data.lastMessage}
            />
          </Link>
        ))}
      </div>
    </section>
  );
};

export default Messages;
