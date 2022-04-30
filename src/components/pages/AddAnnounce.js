import { BsXCircle } from "react-icons/bs";
import React, { useRef } from "react";
import { useAuth } from "../contexts/AuthContext";
import Input from "../Input";

function AddAnnounce(props, ref) {
  const { currentUser } = useAuth();
  const nameRef = useRef(null);
  const imgRef = useRef(null);
  const dobRef = useRef(null);
  const phoneNumberRef = useRef(null);
  const descRef = useRef(null);
  const categoryRef = useRef(null);
  const difficultyRef = useRef(null);
  const countryRef = useRef(null);
  const stateRef = useRef(null);
  const cityRef = useRef(null);
  const streetRef = useRef(null);
  const streetNumberRef = useRef(null);
  const buildingRef = useRef(null);
  const apartmentRef = useRef(null);
  const zipcodeRef = useRef(null);

  return (
    <div className="announce--page" ref={ref}>
      <div className="header" onClick={() => (ref.current.style.visibility = "hidden")}>
        <button>
          <BsXCircle />
        </button>
        Close this windows
      </div>
      <div className="page--content">
        <div className="main--information">
          <img src={currentUser.photoURL} alt="User" ref={imgRef} />
          <div className="personal--data">
            <Input name="Name" ref={nameRef} icon="" value={currentUser.displayName} />
            <Input name="Date of birth" ref={dobRef} icon="" value="02.03.2004" />
          </div>
        </div>
        <div className="input--field">
          <div className="input--content">
            <div className="input--label">Description</div>
            <textarea
              ref={descRef}
              cols="30"
              rows="8"
              value={
                "Lorem ipsum dolor sit amet consectetur adipisicing elit. Eveniet neque veritatis cum magni, dolore sunt iusto harum a. Officiis, eos? Incidunt quia dolorem, esse, laudantium sed repudiandae modi distinctio aperiam voluptatum libero corporis nulla delectus commodi animi similique doloremque ipsum tempore odio eum, magnam nostrum quos architecto at! Non architecto nam repellat aliquid repudiandae dolores corrupti asperiores rem. Enim, voluptatibus quia nulla repudiandae dolorum labore facere similique architecto suscipit accusamus facilis iure consequatur, hic eveniet vero adipisci temporibus. Est aspernatur tempora quia perferendis aut doloremque in cupiditate eaque earum numquam illo pariatur, hic officia dolores sapiente totam accusantium molestias exercitationem."
              }
            ></textarea>
          </div>
        </div>
        <div className="input--field">
          <div className="input--content">
            <div className="input--label">Category</div>
            <select ref={categoryRef}>
              <option value="">Select category</option>
              <option value="Groceries">Groceries</option>
              <option value="School meditations">School meditations</option>
              <option value="Shopping">Shopping</option>
              <option value="Cleaning">Cleaning</option>
              <option value="Walking">Walking</option>
              <option value="Cooking">Cooking</option>
              <option value="Paying of bills">Paying of bills</option>
              <option value="Emotional support">Emotional support</option>
              <option value="Physical labour">Physical labour</option>
              <option value="Hard work">Hard work</option>
            </select>
          </div>
        </div>
        <div className="input--field">
          <div className="input--content">
            <div className="input--label">Difficulty</div>
            <select ref={difficultyRef}>
              <option value="">Select difficulty</option>
              <option value="Easy">Easy</option>
              <option value="Medium">Medium</option>
              <option value="Hard">Hard</option>
            </select>
          </div>
        </div>
        <div className="secondary--information">
          <Input name="Phone number" ref={phoneNumberRef} icon="0" value="+40774653200" />
          <Input name="Country" ref={countryRef} icon="0" value="Romania" />
          <Input name="State" ref={stateRef} icon="0" value="Brasov" />
          <Input name="City" ref={cityRef} icon="0" value="Brasov" />
          <Input name="Street" ref={streetRef} icon="0" value="Lucernei" />
          <Input name="Street Number" ref={streetNumberRef} icon="0" value="5" />
          <Input name="Building" ref={buildingRef} icon="0" value="56A" />
          <Input name="Apartment" ref={apartmentRef} icon="0" value="56A" />
          <Input name="Zipcode" ref={zipcodeRef} icon="0" value="+40774653200" />
        </div>
        <div className="add--announce">Post announce</div>
      </div>
    </div>
  );
}

const forwardedAddAnnounce = React.forwardRef(AddAnnounce);

export default forwardedAddAnnounce;
