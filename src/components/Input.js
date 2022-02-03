import React from "react";

function Input(props, ref) {
  return (
    <div className="f-wrapper">
      <input type={props.type} spellCheck="false" required style={{ textIndent: `${props.indent}rem` }} ref={ref} />
      <div className="label">{props.name}</div>
      <div className="icon"></div>
    </div>
  );
}

const forwaredInput = React.forwardRef(Input);

export default forwaredInput;
