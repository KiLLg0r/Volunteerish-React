import { useState, useEffect } from "react";

function SuccessModal(props) {
  const [seconds, setSeconds] = useState(props.sec);

  useEffect(() => {
    seconds > 0 && setTimeout(() => setSeconds(seconds - 1), 1000);
    if (seconds === 0) props.state(false);
  }, [props, seconds]);

  return (
    <div className="success--modal">
      <h1 className="modal--title">{props.title}</h1>
      <h3 className="modal--subtitle">
        The window will be closed automatically in <span>{seconds} seconds</span>.
      </h3>
    </div>
  );
}

export default SuccessModal;
