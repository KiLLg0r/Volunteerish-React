import { useState, useRef } from "react";
import { useHistory } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { Navigation } from "swiper";
import "swiper/css";
import "swiper/css/navigation";

import { ReactComponent as VolunteerSvg } from "../../assets/svg/volunteer.svg";

SwiperCore.use([Navigation]);

const Home = () => {
  const [error, setError] = useState("");
  const { logout, currentUser } = useAuth();
  const history = useHistory();

  const navigationPrevRef = useRef(null);
  const navigationNextRef = useRef(null);

  const imgRef = useRef(null);
  const fileRef = useRef(null);
  const completeRegistrationRef = useRef(null);

  async function handleLogOut() {
    setError("");

    try {
      await logout();
      history.push("/login");
    } catch {
      setError("Failed to log out");
    }
  }

  function updateUser() {
    currentUser
      .updateProfile({
        displayName: "Rob Oblesniuc",
        photoURL:
          "https://st2.depositphotos.com/1104517/11965/v/600/depositphotos_119659092-stock-illustration-male-avatar-profile-picture-vector.jpg",
      })
      .then(() => {
        window.location.reload(false);
      })
      .catch((error) => {
        console.log(error);
      });
  }

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

  const CompleteRegistration = () => {
    return (
      <>
        <form action="" className="completeRegistration" ref={completeRegistrationRef}>
          <div className="cloes" onClick={hidePopup}>
            X
          </div>
          <h1 className="title">Welcome to</h1>
          <VolunteerSvg className="volunteerSvg" />
          <h1 className="title logo">Volunteerish</h1>
          <h3 className="subtitle-primary">In order to complete registration we need more information about you</h3>
          <Swiper
            allowTouchMove={false}
            className="popup"
            navigation={{
              nextEl: navigationNextRef.current,
              prevEl: navigationPrevRef.current,
            }}
            onBeforeInit={(swiper) => {
              swiper.params.navigation.prevEl = navigationPrevRef.current;
              swiper.params.navigation.nextEl = navigationNextRef.current;
            }}
          >
            <SwiperSlide>
              <div className="wrapper">
                <div className="img-upload">
                  <img
                    src="https://firebasestorage.googleapis.com/v0/b/volunteerish-ed549.appspot.com/o/placeholder.jpg?alt=media&token=8960960f-36a2-4a20-8115-c692d95e9fda"
                    ref={imgRef}
                    onClick={uploadImg}
                    alt="Placeholder for uploading profile"
                    className="img-placeholder"
                  />
                  <input type="file" name="imageUpload" onChange={loadFile} style={{ display: "none" }} ref={fileRef} />
                  <label htmlFor="file" style={{ cursor: "pointer" }} onClick={uploadImg} className="labelImg">
                    Upload a picture
                  </label>
                </div>
                <div className="f-wrapper">
                  <input type="email" spellCheck="false" required />
                  <div className="label">Name</div>
                  <div className="icon"></div>
                </div>
              </div>
            </SwiperSlide>
            <SwiperSlide>2</SwiperSlide>
            <SwiperSlide>3</SwiperSlide>
            <SwiperSlide>4</SwiperSlide>
            <SwiperSlide>5</SwiperSlide>
            <SwiperSlide>6</SwiperSlide>
            <div className="btns">
              <div className="prev-btn" ref={navigationPrevRef}>
                Previous
              </div>
              <div className="next-btn" ref={navigationNextRef}>
                Next
              </div>
            </div>
          </Swiper>
        </form>
      </>
    );
  };

  return (
    <section className="home">
      {error && (
        <div className="alert" role="alert">
          {error}
        </div>
      )}
      {/* <button onClick={updateUser}>Update</button> */}
      <div className="profile">
        <h1 className="title">Profile</h1>
        <div className="profile-data">
          <img src={currentUser.photoURL} alt="pic" />
          <h3 className="name">
            <span>Name</span>
            <p>{currentUser.displayName}</p>
          </h3>
          <h3 className="points">
            <span>Points</span>
            <p>100K</p>
          </h3>
          <h3 className="helped">
            <span>Helped</span>
            <p>20K</p>
          </h3>
        </div>
        <div className="chart">
          <h1 className="title">Statistics</h1>
          <img
            src="https://blog.hubspot.com/hs-fs/hubfs/Agency_Post/Blog_Images/DataHero_Customers_by_Close_Date.png?width=669&name=DataHero_Customers_by_Close_Date.png"
            alt="chart"
          />
        </div>
      </div>
      <button variant="link" onClick={handleLogOut}>
        Log out
      </button>
      <div className="announces">
        <h1 className="title">Announces</h1>
        <div className="active-ann">
          <h1 className="subtitle">Helping</h1>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatum fuga obcaecati recusandae nemo sed.
            Officiis voluptatem exercitationem eos consectetur vitae saepe tempora, animi iste repudiandae doloribus
            rerum placeat officia assumenda nulla! Ipsum sed porro modi, qui est, magnam officia eos eius, voluptates
            repudiandae assumenda minima numquam repellat temporibus quibusdam illum aliquam nam veniam unde. Rerum
            suscipit tempora rem temporibus earum tempore laborum, aperiam dolore quaerat perspiciatis quas ut, facere,
            distinctio vel. Dicta quibusdam, eveniet id dolorum debitis fugit explicabo deserunt itaque aliquid,
            delectus, earum esse expedita! Facere in ut reprehenderit tempora autem animi harum accusamus, impedit ea
            molestias repellat voluptate.
          </p>
        </div>
        <div className="other-ann">
          <h1 className="subtitle">Helped</h1>
          <p>
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Assumenda earum reprehenderit perferendis,
            sapiente blanditiis repellendus ea. Molestiae optio totam vel eveniet numquam minus enim odio nulla
            expedita, quibusdam tempore, neque odit asperiores officiis illum eius consequatur. Et alias vero
            laboriosam. Cupiditate unde deleniti aperiam eaque excepturi quos illo numquam dolore eveniet harum voluptas
            repudiandae, molestias ullam ducimus dicta est nemo impedit neque id. Inventore officiis neque dolor fugiat,
            odit rerum? Tempora ipsum odit, beatae laudantium eaque corrupti deleniti distinctio totam ipsam voluptas
            officia! Debitis, harum culpa ut modi libero qui fugit beatae, non, tempora ducimus inventore? Debitis
            veniam magni suscipit distinctio, odit eaque nesciunt minus voluptatem maiores ab tempora dolor doloremque
            eligendi est unde ut voluptas temporibus! Vero autem optio velit adipisci ipsam. Sunt magnam dolore
            voluptatem, natus veritatis quia aliquam ipsam iste nostrum maxime. Ut, perspiciatis eos dolores omnis
            asperiores amet id, eveniet iure, numquam obcaecati placeat architecto veritatis.
          </p>
        </div>
      </div>
      <CompleteRegistration />
    </section>
  );
};

export default Home;
