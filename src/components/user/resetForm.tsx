import { FormEvent, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

interface Props {
  //   setCodeForm: React.Dispatch<React.SetStateAction<boolean>>;
  setResetForm: React.Dispatch<React.SetStateAction<boolean>> | null;
}

const ResetForm = ({ setResetForm }: Props) => {
  const [password, setPassword] = useState("");
  const [repassword, setRepassword] = useState("");
  const navigate = useNavigate();
  const [same, setSame] = useState(true);
  useEffect(() => {
    setSame(password === repassword);
  }, [repassword]);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const response = await fetch(
      "http://localhost:3000/users/update-password",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          user: localStorage.getItem("user"),
          password: password,
        }), //saved during codeform
      }
    );
    const data = await response.json();
    if (data.status === 200) {
      alert("Change successful");
      navigate("/profile");
    } else if (data.status === 404) {
      alert(data.error);
      navigate("/error/" + data.message);
    }
  };

  return (
    <div>
      <form onSubmit={same ? handleSubmit : void 0} className="forgot-form">
        <label htmlFor="password">Enter new password</label>
        <input
          type="password"
          name="password"
          value={password}
          onChange={(e) => {
            setPassword(e.currentTarget.value);
          }}
        />
        <br />
        <label htmlFor="repassword">Re-enter password</label>
        <input
          type="password"
          name="repassword"
          value={repassword}
          onChange={(e) => {
            setRepassword(e.currentTarget.value);
          }}
        />
        {!same && (
          <p className="diff-password">The entered passwords are different</p>
        )}
        <button type="submit" className="forgot-form-btn reset-btn">
          Save
        </button>
        {setResetForm === null && (
          <>
            <button
              className="forgot-form-btn reset-btn extra-margin-bot"
              onClick={(e) => {
                e.preventDefault();
                navigate("/profile");
              }}
            >
              Cancel
            </button>
          </>
        )}
      </form>
    </div>
  );
};

export default ResetForm;
