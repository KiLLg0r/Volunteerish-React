import React from "react";

function Card({ UID, name, desc, category, difficulty }) {
  return (
    <div className="card">
      <div className="card--background"></div>
      <div className="card--content">
        <div className="card--content--left">
          <div className="card--img">
            <img src={UID.photoURL} alt="profile" />
          </div>
        </div>
        <div className="card--content--right">
          <div className="card--name">{name}</div>
          <div className="card--description">{desc}</div>
          <div className="card--group">
            <div className="card--category">
              <label htmlFor="">Category: </label>
              <span> {category} </span>
            </div>
            <div className="card--difficulty">
              <label htmlFor="">Difficulty: </label>
              <span>{difficulty}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Card;
