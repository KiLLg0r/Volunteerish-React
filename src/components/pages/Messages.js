import { useAuth } from "../contexts/AuthContext";

const Messages = () => {
  const { currentUser } = useAuth();

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
    </section>
  );
};

export default Messages;
