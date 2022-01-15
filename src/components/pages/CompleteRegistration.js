import { useState, useRef } from "react";

import { useAuth } from "../contexts/AuthContext";

import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { Navigation } from "swiper";
import "swiper/css";
import "swiper/css/navigation";

import firebase from "firebase/compat/app";
import "firebase/compat/storage";
import { app, auth } from "../../firebase";

import { ReactComponent as VolunteerSvg } from "../../assets/svg/volunteer.svg";

SwiperCore.use([Navigation]);

const CompleteRegistration = () => {
  const { currentUser } = useAuth();

  const placeholderSRC =
    "https://firebasestorage.googleapis.com/v0/b/volunteerish-ed549.appspot.com/o/placeholder.jpg?alt=media&token=8960960f-36a2-4a20-8115-c692d95e9fda";

  const [error, setError] = useState("");
  const [lastSlide, setLastSlide] = useState(false);
  let file = 0;

  const swiperRef = useRef(null);
  const navigationPrevRef = useRef(null);
  const navigationNextRef = useRef(null);
  const imgRef = useRef(null);
  const fileRef = useRef(null);
  const completeRegistrationRef = useRef(null);

  const nameRef = useRef(null);

  const loadFile = (event) => {
    if (event.target.files && event.target.files[0]) {
      file = event.target.files[0];
      imgRef.current.src = URL.createObjectURL(file);
    }
  };

  const uploadImg = () => {
    fileRef.current.click();
  };

  const hidePopup = () => {
    completeRegistrationRef.current.style.display = "none";
  };

  const FirstSlide = () => {
    return (
      <div className="first-slide">
        <h1 className="title">Welcome to</h1>
        <VolunteerSvg className="volunteerSvg" />
        <h1 className="title logo">Volunteerish</h1>
        <h3 className="subtitle-primary">In order to complete registration we need more information about you</h3>
      </div>
    );
  };

  const SecondSlide = () => {
    return (
      <div className="wrapper second-slide">
        <div className="title">First, let's set your profile image</div>
        <div className="img-upload">
          <label htmlFor="file" style={{ cursor: "pointer" }} onClick={uploadImg} className="img-label">
            Upload a picture
          </label>
          <img
            src={placeholderSRC}
            ref={imgRef}
            onClick={uploadImg}
            alt="Placeholder for uploading profile"
            className="img-placeholder"
          />
          <input
            type="file"
            name="imageUpload"
            onChange={loadFile}
            style={{ display: "none" }}
            ref={fileRef}
            accept="image/*"
          />
        </div>
      </div>
    );
  };

  const ThirdSlide = () => {
    return (
      <div className="wrapper third-slide">
        <div className="title">Let's add your personal information</div>
        <div className="f-wrapper">
          <input type="email" spellCheck="false" required ref={nameRef} />
          <div className="label">Name</div>
          <div className="icon"></div>
        </div>
        <div className="f-wrapper">
          <input type="date" spellCheck="false" required style={{ textIndent: "5.75rem" }} />
          <div className="label">Birth date</div>
          <div className="icon"></div>
        </div>
      </div>
    );
  };

  const FourthSlide = () => {
    return (
      <div className="wrapper fourth-slide">
        <div className="title">Next, we need your address</div>
        <div className="f-wrapper">
          <input type="text" spellCheck="false" required style={{ textIndent: "5rem" }} />
          <div className="label">Country</div>
          <div className="icon"></div>
        </div>
        <div className="f-wrapper">
          <input type="text" spellCheck="false" required style={{ textIndent: "3.75rem" }} />
          <div className="label">State</div>
          <div className="icon"></div>
        </div>
        <div className="f-wrapper">
          <input type="text" spellCheck="false" required style={{ textIndent: "3.25rem" }} />
          <div className="label">City</div>
          <div className="icon"></div>
        </div>
      </div>
    );
  };

  const FifthSlide = () => {
    return (
      <div className="wrapper fifth-slide">
        <div className="title">Next, we need your address</div>
        <div className="f-wrapper">
          <input type="text" spellCheck="false" required style={{ textIndent: "4rem" }} />
          <div className="label">Street</div>
          <div className="icon"></div>
        </div>
        <div className="group">
          <div className="f-wrapper">
            <input type="number" spellCheck="false" required style={{ textIndent: "5rem" }} />
            <div className="label">Number</div>
            <div className="icon"></div>
          </div>
          <div className="f-wrapper">
            <input type="text" spellCheck="false" required style={{ textIndent: "5rem" }} />
            <div className="label">Building</div>
            <div className="icon"></div>
          </div>
        </div>
        <div className="f-wrapper">
          <input type="number" spellCheck="false" required style={{ textIndent: "6.25rem" }} />
          <div className="label">Apartment</div>
          <div className="icon"></div>
        </div>
        <div className="f-wrapper" style={{ marginBlock: "1rem" }}>
          <input type="number" spellCheck="false" required style={{ textIndent: "6rem" }} />
          <div className="label">Post code</div>
          <div className="icon"></div>
        </div>
      </div>
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  const updateImg = () => {
    if (file !== 0) {
      const storage = firebase.app().storage("gs://volunteerish-ed549.appspot.com");
      const profileImagesRef = storage.ref().child(`profile/${currentUser.uid}-${file.name}`);
      const task = profileImagesRef.put(file);
      task.on(
        "state_changed",
        function progress(snapshot) {},
        function error(err) {},
        function complete() {
          profileImagesRef
            .getDownloadURL()
            .then((url) => {
              const imageURL = url;
              currentUser
                .updateProfile({ photoURL: imageURL })
                .then(() => {
                  console.log("Successfully update image");
                })
                .catch((error) => {
                  console.log(error);
                });
            })
            .catch((error) => {
              console.log(error);
            });
        },
      );
    } else {
      currentUser
        .updateProfile({ photoURL: placeholderSRC })
        .then(() => {
          console.log("Successfully update image");
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };
  const updateNameAndPhone = () => {
    currentUser
      .updateProfile({
        displayName: nameRef.current.value,
      })
      .then(() => {
        console.log("Successfully update name and phone");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  // TODO When switching up slide 0, will update profile picture and name
  // TODO Create handle submit

  return (
    <>
      <form action="" className="completeRegistration" ref={completeRegistrationRef}>
        <div className="close" onClick={hidePopup}>
          &#9747;
        </div>

        <Swiper
          allowTouchMove={false}
          className="popup"
          ref={swiperRef}
          navigation={{
            nextEl: navigationNextRef.current,
            prevEl: navigationPrevRef.current,
          }}
          onBeforeInit={(swiper) => {
            swiper.params.navigation.prevEl = navigationPrevRef.current;
            swiper.params.navigation.nextEl = navigationNextRef.current;
          }}
          onSlideChange={(swiper) => {
            const swiperIndex = swiper.activeIndex;
            switch (swiperIndex) {
              case 2:
                updateImg();
                break;
              case 3:
                updateNameAndPhone();
                break;
              default:
                break;
            }
            console.log("Swiper slide changed to: " + swiperIndex);
            console.log(swiper.slides[swiperIndex]);
          }}
          onSlidePrevTransitionStart={() => {
            setLastSlide(false);
          }}
          onReachEnd={() => {
            setLastSlide(true);
          }}
        >
          <SwiperSlide>
            <FirstSlide />
          </SwiperSlide>
          <SwiperSlide>
            <SecondSlide />
          </SwiperSlide>
          <SwiperSlide>
            <ThirdSlide />
          </SwiperSlide>
          <SwiperSlide>
            <FourthSlide />
          </SwiperSlide>
          <SwiperSlide>
            <FifthSlide />
          </SwiperSlide>
          <div className="btns">
            <div className="prev-btn" ref={navigationPrevRef}>
              Previous
            </div>
            <div className="next-btn" ref={navigationNextRef}>
              Next
            </div>
            <div className={`complete-btn ${lastSlide ? "last-slide" : "not-last-slide"}`} onClick={handleSubmit}>
              Complete registration
            </div>
          </div>
        </Swiper>
      </form>
    </>
  );
};

export default CompleteRegistration;
