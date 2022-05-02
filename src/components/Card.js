import React from "react";

function Card(props) {
  return (
    <div className="card" id={props.id}>
      <div className="card--background"></div>
      <div className="card--content">
        <div className="card--content--left">
          <div className="card--img">
            <img src={"empty"} alt="profile" />
          </div>
        </div>
        <div className="card--content--right">
          <div className="card--name">{props.name}</div>
          <div className="card--description">{props.desc.substring(0, 99)}</div>
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
