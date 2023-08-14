import { Link, useNavigate } from "react-router-dom";
import "./profile.css";

interface Props {
  logged: boolean;
  setLogged: React.Dispatch<React.SetStateAction<boolean>>;
  setCurrUser: React.Dispatch<React.SetStateAction<null>>;
}

const UserBadge = ({ logged, setLogged, setCurrUser }: Props) => {
  const navigate = useNavigate();
  return (
    <div className="badge-container">
      {logged ? (
        <>
          <img
            src="./blank-profile-picture.png"
            alt="profile"
            className="badge-img"
            onClick={() => {
              navigate("/profile");
            }}
          ></img>
          <div
            className="loggout-badge"
            onClick={(e) => {
              e.preventDefault();
              setCurrUser(null);
              setLogged(false);
              localStorage.removeItem("user");
              localStorage.removeItem("token");
              localStorage.removeItem("user-img");
              navigate("/connection");
            }}
          >
            Logout
          </div>
        </>
      ) : (
        <Link to={"/connection"} className="login-signup-link">
          Login/ Signup
        </Link>
      )}
    </div>
  );
};

export default UserBadge;
