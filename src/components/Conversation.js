function Conversation(props) {
  return (
    <div className="list--item">
      <img className="list--pic" src={props.imgURL} alt="User profile" />
      <div className="list--text">
        <div className="list--name">{props.name}</div>
        <div className="list--last-message">{props.lastMessage}</div>
      </div>
    </div>
  );
}

export default Conversation;
