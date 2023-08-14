import { useState } from "react";
import { useNavigate } from "react-router-dom";

interface Props {
  setIsLogging: React.Dispatch<React.SetStateAction<boolean>>;
}

const Signup = ({ setIsLogging }: Props) => {
  const [email, setEmail] = useState("");
  const [date, setDate] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const getSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    const response = await fetch("http://localhost:3000/users/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email,
        birthdate: date,
        username: username,
        password: password,
      }),
    });
    const data = await response.json();
    if (data.added) {
      navigate("/connection");
    } else {
      alert("Account with this email already registered.");
    }
  };

  return (
    <>
      <h1>Signup</h1>
      <form onSubmit={getSignup}>
        <div className="label-input-container">
          <label htmlFor="email" className="email">
            Email
          </label>
          <input
            type="email"
            name="email"
            id="email"
            className="connection-input"
            value={email}
            onChange={(e) => {
              setEmail(e.currentTarget.value);
            }}
          />
          <br />
          <label htmlFor="birthday" className="birthday"></label>
          <input
            type="date"
            name="birthday"
            id="birthday"
            className="connection-input"
            value={date}
            onChange={(e) => {
              setDate(e.currentTarget.value);
            }}
          />
          <br />
          <label htmlFor="username-signup" className="username">
            Username
          </label>
          <input
            type="text"
            name="username-signup"
            id="username-signup"
            className="connection-input"
            value={username}
            onChange={(e) => {
              setUsername(e.currentTarget.value);
            }}
          />
          <br />
          <label htmlFor="password-signup" className="password">
            Password
          </label>
          <input
            type="password"
            name="password-signup"
            id="password-signup"
            className="connection-input"
            value={password}
            onChange={(e) => {
              setPassword(e.currentTarget.value);
            }}
          />
        </div>
        <div className="signup-buttons">
          <button type="submit" className="signup-btn">
            Signup
          </button>
        </div>
      </form>
      <button
        className="switch-btn"
        onClick={() => {
          setIsLogging(true);
        }}
      >
        Got to Login
      </button>
    </>
  );
};

export default Signup;
