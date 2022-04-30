import React from "react";
import { BsFillEnvelopeFill, BsFillPersonFill, BsHouseFill } from "react-icons/bs";

function Input(props, ref) {
  const Icon = () => {
    switch (props.icon) {
      case "email":
        return <BsFillEnvelopeFill />;
      case "name":
        return <BsFillPersonFill />;
      case "address":
        return <BsHouseFill />;
      default:
        return null;
    }
  };

  return (
    <div className="input--field">
      <div className="input--content">
        <div className="input--label">{props.name}</div>
        <input type={props.type} spellCheck="false" required ref={ref} defaultValue={props.value} />
      </div>
      <Icon />
    </div>
  );
}

const forwardedInput = React.forwardRef(Input);

export default forwardedInput;
