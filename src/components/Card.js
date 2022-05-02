import React, { useEffect, useState } from "react";

import firebase from "firebase/compat/app";
import "firebase/compat/storage";

function Card(props) {
  const [imgURL, setImgURL] = useState("");

  useEffect(() => {
    props.loaded(false);
    const storageRef = firebase.app().storage("gs://volunteerish-ed549.appspot.com").ref();
    const path = `profile/${props.uid}`;
    storageRef
      .child(path)
      .getDownloadURL()
      .then((url) => {
        setImgURL(url);
      })
      .catch((error) => console.log(error));
    props.loaded(true);
  }, [props.uid, props.loaded, props]);

  return (
    <div className="card" id={props.id}>
      <div className="card--background"></div>
      <div className="card--content">
        <div className="main--content">
          <img className="card--img" src={imgURL} alt="profile" />
          <div className="card--group">
            <div className="card--name">{props.name}</div>
            <div className="card--description">{props.desc.substring(0, 100)}...</div>
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
