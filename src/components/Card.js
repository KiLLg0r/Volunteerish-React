function Card(props) {
  return (
    <div className="card" id={props.id}>
      <div className="card--background"></div>
      <div className="card--content">
        <div className="main--content">
          <img className="card--img" src={props.img} alt="profile" />
          <div className="card--group">
            <div className="card--name">{props.name}</div>
            <div className="card--description">
              {props.desc.length > 100 ? props.desc.substring(0, 100) + "..." : props.desc}
            </div>
          </div>
        </div>
        <div className="secondary--content">
          <div className="card--category">
            <label htmlFor="">Category: </label>
            <span>{props.category}</span>
          </div>
          <div className={`card--difficulty ${props.difficulty}`}>
            <label htmlFor="">Difficulty: </label>
            <span>{props.difficulty}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Card;
