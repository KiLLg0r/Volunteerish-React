import React from "react";

function Input(props, ref) {
  return (
    <div className="input--field">
      <div className="label">{props.name}</div>
      <input type={props.type} spellCheck="false" required ref={ref} />
    </div>
  );
}

const forwaredInput = React.forwardRef(Input);

export default forwaredInput;
