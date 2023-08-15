import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { BACKEND } from "../../api/url";

interface Props {
  setIsLogging: React.Dispatch<React.SetStateAction<boolean>>;
  setLogged: React.Dispatch<React.SetStateAction<boolean>>;
  setUser: React.Dispatch<React.SetStateAction<null>>;
}

const Login = ({ setIsLogging, setLogged, setUser }: Props) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const getLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    const response = await fetch(BACKEND + "users/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username,
        password,
      }),
    });
    // Handle status sent
    const data = await response.json();
    if (data.user) {
      setLogged(true);
      setUser(data.user);
      localStorage.setItem("token", data.user);
      localStorage.setItem("user", data.data);
      navigate("/team");
    } else if (data.status === 204) {
      alert("Unsuccessful Login: Check your password");
      navigate("/connection");
    } else {
      alert("Unsuccessful Login: Check your credentials");
      navigate("/connection");
    }
  };
  useEffect(() => {
    localStorage.clear();
  }, []);

  return (
    <>
      <h1>Login</h1>
      <form onSubmit={getLogin}>
        <div className="label-input-container">
          <label htmlFor="username-login" className="username">
            Username
          </label>
          <input
            type="text"
            name="username-login"
            id="username-login"
            className="connection-input"
            value={username}
            onChange={(e) => {
              setUsername(e.currentTarget.value);
            }}
          />
          <br />
          <label htmlFor="password-login" className="password">
            Password
          </label>
          <input
            type="password"
            name="password-login"
            id="password-login"
            className="connection-input"
            value={password}
            onChange={(e) => {
              setPassword(e.currentTarget.value);
            }}
          />
          <p className="choose-password">Please input a password</p>
        </div>
        <div className="connection-buttons">
          <button
            type="submit"
            className="login-btn"
            // onClick={(e) => {
            //   e.preventDefault();
            //   setLogged(true);
            // }}
          >
            Login
          </button>
          <Link to="/forgot-password" className="forgot-password">
            Forgot Password..?
          </Link>
        </div>
      </form>
      <button
        className="switch-btn"
        onClick={() => {
          setIsLogging(false);
        }}
      >
        Signup
      </button>
    </>
  );
};

export default Login;
