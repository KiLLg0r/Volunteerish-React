import { useState, useEffect } from "react";

function Card(props) {
  const [difficulty, setDifficulty] = useState("");

  useEffect(() => {
    switch (props.difficulty) {
      case "0":
        setDifficulty("Easy");
        break;
      case "1":
        setDifficulty("Medium");
        break;
      case "2":
        setDifficulty("Hard");
        break;
      default:
        break;
    }
  }, [props.difficulty]);

  return (
    <div className="card">
      <div className="card--content">
        <div className="main--content">
          <img className="card--img" src={props.img} alt="profile" />
          <div className="card--group">
            <div className="card--name">{props.name}</div>
            <div className="card--description">
              {props.desc.length > 75 ? props.desc.substring(0, 75) + "..." : props.desc}
            </div>
          </div>
        </div>
        <div className="secondary--content">
          <div className="card--category">
            <label htmlFor="">Category: </label>
            <span>{props.category}</span>
          </div>
          <div className={`card--difficulty ${difficulty}`}>
            <label htmlFor="">Difficulty: </label>
            <span>{difficulty}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Card;
