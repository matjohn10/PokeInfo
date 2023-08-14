import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

type User = {
  username?: string;
  email?: string;
  birthday?: string;
};

const ProfilePage = () => {
  const [user, setUser] = useState<User>({});
  const [userImg, setUserImg] = useState(localStorage.getItem("user-img"));
  const navigate = useNavigate();
  useEffect(() => {
    const token = localStorage.getItem("token");
    const user = token
      ? JSON.parse(localStorage.getItem("user") || "{}")
      : null;
    if (!user) {
      localStorage.removeItem("token");
      navigate("/connection");
    } else {
      setUser(user);
    }
  }, []);

  return (
    <div className="main-profile-setting-container">
      <h2>{user ? "Profile and Settings" : "No user found"}</h2>
      <br />
      <div className="profile-container">
        <div className="profile-image-container">
          <div className="profile-img">
            <img
              src={userImg ? userImg : "./blank-profile-picture.png"}
              alt=""
            />
          </div>
          <form
            className="profile-pic-form"
            onSubmit={(e) => {
              e.preventDefault();
              e.stopPropagation();
            }}
          >
            <label htmlFor="filename" className="profile-change-pwd-btn">
              Add Profile Picture
            </label>
            <input
              type="file"
              name="filename"
              id="filename"
              style={{ visibility: "hidden" }}
              onChange={(e) => {
                e.preventDefault();
                const fileImg = Array.from(e.target.files || [])[0];
                const imgURL = URL.createObjectURL(fileImg);
                localStorage.setItem("user-img", imgURL);
                setUserImg(imgURL);
                alert("Image not saved anywhere; Not fully implemented yet.");
              }}
            />
          </form>
        </div>
        <div className="info-settings-container">
          <div className="small-info-settings-container">
            <div className="profile-username">
              <p className="profile-info-p">{"Username:  " + user.username}</p>
            </div>
            <div className="profile-email">
              <p className="profile-info-p">{"Email:  " + user.email}</p>
            </div>
            <div className="profile-password">
              <p className="profile-info-p">Change Password:</p>
              <button
                className="profile-change-pwd-btn"
                onClick={(e) => {
                  e.preventDefault();
                  navigate("/reset-form");
                }}
              >
                Change
              </button>
            </div>
            <div className="profile-birthday">
              <p className="profile-info-p">{"Birthday:  " + user.birthday}</p>
            </div>
            <div className="profile-teams">
              <p className="profile-info-p">Teams: </p>
              <button
                className="profile-change-pwd-btn"
                onClick={(e) => {
                  e.preventDefault();
                  navigate("/team");
                }}
              >
                See teams
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
