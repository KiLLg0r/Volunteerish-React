import React from "react";
import { BsFillEnvelopeFill, BsFillPersonFill, BsHouseFill, BsFillPhoneFill } from "react-icons/bs";

function Input(props, ref) {
  const Icon = () => {
    switch (props.icon) {
      case "email":
        return <BsFillEnvelopeFill />;
      case "name":
        return <BsFillPersonFill />;
      case "address":
        return <BsHouseFill />;
      case "phone":
        return <BsFillPhoneFill />;
      default:
        return null;
    }
  };

  const handleChange = () => {
    props.change(true);
  };

  return (
    <div className="input--field">
      <div className="input--content">
        <div className="input--label">{props.name}</div>
        <input
          type={props.type}
          spellCheck="false"
          required
          ref={ref}
          defaultValue={props.value}
          onChange={handleChange}
          readOnly={props.readOnly && true}
        />
      </div>
      <Icon />
    </div>
  );
}

const forwardedInput = React.forwardRef(Input);

export default forwardedInput;
