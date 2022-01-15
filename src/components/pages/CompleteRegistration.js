import { useState, useRef } from "react";
import { useAuth } from "../contexts/AuthContext";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { Navigation } from "swiper";
import "swiper/css";
import "swiper/css/navigation";

import { ReactComponent as VolunteerSvg } from "../../assets/svg/volunteer.svg";

SwiperCore.use([Navigation]);

const CompleteRegistration = () => {
  const [error, setError] = useState("");
  const [lastSlide, setLastSlide] = useState(false);

  const swiperRef = useRef(null);
  const navigationPrevRef = useRef(null);
  const navigationNextRef = useRef(null);
  const imgRef = useRef(null);
  const fileRef = useRef(null);
  const completeRegistrationRef = useRef(null);

  const loadFile = (event) => {
    if (event.target.files && event.target.files[0]) {
      imgRef.current.src = URL.createObjectURL(event.target.files[0]);
    }
  };

  const uploadImg = () => {
    console.log(fileRef.current);
    fileRef.current.click();
  };

  const hidePopup = () => {
    completeRegistrationRef.current.style.display = "none";
  };

  const FirstSlide = () => {
    return (
      <>
        <h1 className="title">Welcome to</h1>
        <VolunteerSvg className="volunteerSvg" />
        <h1 className="title logo">Volunteerish</h1>
        <h3 className="subtitle-primary">In order to complete registration we need more information about you</h3>
      </>
    );
  };

  const SecondSlide = () => {
    return (
      <div className="first-slide">
        <div className="wrapper">
          <div className="img-upload">
            <label htmlFor="file" style={{ cursor: "pointer" }} onClick={uploadImg} className="img-label">
              Upload a picture
            </label>
            <img
              src="https://firebasestorage.googleapis.com/v0/b/volunteerish-ed549.appspot.com/o/placeholder.jpg?alt=media&token=8960960f-36a2-4a20-8115-c692d95e9fda"
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
          <div className="f-wrapper">
            <input type="email" spellCheck="false" required />
            <div className="label">Name</div>
            <div className="icon"></div>
          </div>
        </div>
      </div>
    );
  };

  const handleSubmit = () => {
    return null;
  };

  const updateNameAndImg = () => {};

  // TODO When switching up slide 0, will update profile picture and name
  // TODO Create handle submit

  return (
    <>
      <form action="" className="completeRegistration" ref={completeRegistrationRef}>
        <div className="close" onClick={hidePopup}>
          X
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
          onInit={(swiper) => {
            const swiperIndex = swiper.activeIndex;
            console.log("Swiper slide changed to: " + swiperIndex);
            console.log(swiper.slides[swiperIndex]);
          }}
          onSlideChange={(swiper) => {
            const swiperIndex = swiper.activeIndex;
            if (swiperIndex === 1) updateNameAndImg();
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
          <SwiperSlide>3</SwiperSlide>
          <SwiperSlide>4</SwiperSlide>
          <SwiperSlide>5</SwiperSlide>
          <SwiperSlide>6</SwiperSlide>
          <div className="prev-btn" ref={navigationPrevRef}>
            Previous
          </div>
          <div className="next-btn" ref={navigationNextRef}>
            Next
          </div>
          <div className={`complete-btn ${lastSlide ? "last-slide" : "not-last-slide"}`} onClick={handleSubmit}>
            Complete registration
          </div>
        </Swiper>
      </form>
    </>
  );
};

export default CompleteRegistration;
