import { useState, useEffect } from "react";
import ResetForm from "./resetForm";
import CodeForm from "./codeForm";
import { useNavigate } from "react-router-dom";

interface Props {
  setLogged: React.Dispatch<React.SetStateAction<boolean>>;
  setUser: React.Dispatch<React.SetStateAction<null>>;
}

const ForgotPassword = ({ setLogged, setUser }: Props) => {
  const [forUsername, setForUsername] = useState(false);
  const [email, setEmail] = useState(
    JSON.parse(localStorage.getItem("user") || "{}")?.email
  );
  console;
  const [birthday, setBirthday] = useState("");
  //   const [codeForm, setCodeForm] = useState(false);
  const [codeForm, setCodeForm] = useState(
    localStorage.getItem("isCode") === "true" ? true : false
  );
  const [resetForm, setResetForm] = useState(
    localStorage.getItem("isReset") === "true" ? true : false
  );
  const navigate = useNavigate();

  // update local storage everytime codeform changes
  useEffect(() => {
    localStorage.setItem("isCode", codeForm ? "true" : "");
    localStorage.setItem("isReset", resetForm ? "true" : "");
  }, [codeForm, resetForm]);
  useEffect(() => {
    localStorage.setItem(
      "user",
      JSON.stringify({
        email: email,
        birthday: birthday,
      })
    );
  }, [email, birthday]);

  const getForgotCred = async (e: React.FormEvent) => {
    e.preventDefault();
    const response = await fetch("http://localhost:3000/users/forgot", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email,
        birthday: birthday,
        toFetch: forUsername ? "username" : "password",
      }),
    });
    const data = await response.json();
    if (data.status === 100) {
      setCodeForm(true);
      setResetForm(false);
      //   setLogged(true);
      //   setUser(data.fetched); NOT HERE, DO IT AFTER CODE IS CONFIRMED (at same time as reset form)
    } else if (data.status === 200) {
      alert(
        `An email with your username was sent to ${email}\nPlease try to login again.`
      );

      setCodeForm(false);
      setResetForm(false);
      navigate("/connection");
    } else {
      //code 404
      localStorage.removeItem("user");
      alert("There was no account found. Try again with other credentials.");
    }
  };
  return (
    <div className="main-forgot-container">
      <h3>
        {resetForm ? "Update your credentials" : "Retrieve your credentials"}
      </h3>
      <div className="form-check">
        <input
          className="form-check-input"
          type="radio"
          name="flexRadioDefault"
          id="flexRadioDefault1"
          onClick={() => {
            setForUsername(false);
          }}
          defaultChecked
        />
        <label className="form-check-label" htmlFor="flexRadioDefault1">
          Forgot password?
        </label>
      </div>
      <div className="form-check">
        <input
          className="form-check-input"
          type="radio"
          name="flexRadioDefault"
          id="flexRadioDefault2"
          onClick={() => {
            setForUsername(true);
          }}
        />
        <label className="form-check-label" htmlFor="flexRadioDefault2">
          Forgot username?
        </label>
      </div>
      <div className="forgot-form-div">
        {!codeForm ? (
          !resetForm ? (
            <form onSubmit={getForgotCred} className="forgot-form">
              <label htmlFor="email">Enter Email</label>
              <input
                type="email"
                name="email"
                id="email"
                value={email}
                onChange={(e) => {
                  setEmail(e.currentTarget.value);
                }}
              />
              <br />
              <label htmlFor="birthdate">Enter Birthdate</label>
              <input
                type="date"
                name="birthdate"
                id="birthdate"
                value={birthday}
                onChange={(e) => {
                  setBirthday(e.currentTarget.value);
                }}
              />
              <br />
              <button type="submit" className="forgot-form-btn">
                {forUsername ? "Get username" : "Get password"}
              </button>
            </form>
          ) : (
            <ResetForm setResetForm={setResetForm} />
          )
        ) : (
          <CodeForm
            setCodeForm={setCodeForm}
            setResetForm={setResetForm}
            userEmail={email}
            setUser={setUser}
            setLogged={setLogged}
          />
        )}
      </div>
    </div>
  );
};

export default ForgotPassword;
