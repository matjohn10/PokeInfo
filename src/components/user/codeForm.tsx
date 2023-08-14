import { FormEvent, useRef, useState } from "react";

interface Props {
  setCodeForm: React.Dispatch<React.SetStateAction<boolean>>;
  setResetForm: React.Dispatch<React.SetStateAction<boolean>>;
  setUser: React.Dispatch<React.SetStateAction<null>>;
  setLogged: React.Dispatch<React.SetStateAction<boolean>>;
  userEmail: string;
}

const CodeForm = ({
  userEmail,
  setCodeForm,
  setResetForm,
  setUser,
  setLogged,
}: Props) => {
  const [code, setCode] = useState(["", "", "", "", ""]);
  const input1 = useRef<HTMLInputElement>(null);
  const input2 = useRef<HTMLInputElement>(null);
  const input3 = useRef<HTMLInputElement>(null);
  const input4 = useRef<HTMLInputElement>(null);
  const input5 = useRef<HTMLInputElement>(null);
  const btn = useRef<HTMLButtonElement>(null);
  const focusNext = (pos: number) => {
    if (pos === 1) {
      input2.current?.focus();
    } else if (pos === 2) {
      input3.current?.focus();
    } else if (pos === 3) {
      input4.current?.focus();
    } else if (pos === 4) {
      input5.current?.focus();
    } else {
      btn.current?.focus();
    }
  };
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const inputCode = code.join("");
    const response = await fetch(
      "http://localhost:3000/users/temporary-password",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          code: inputCode,
        }),
      }
    );
    const data = await response.json();
    if (data.status === 404) {
      alert("The code is wrong. Please try again.");
      setCode(["", "", "", "", ""]);
    } else {
      //if status === 100
      setCodeForm(false);
      setResetForm(true);
      setUser(data.access);
      localStorage.setItem("token", data.access);
      setLogged(true);
    }
  };
  return (
    <div>
      <form onSubmit={handleSubmit} className="forgot-form">
        <label htmlFor="code">{`Enter Code sent to ${userEmail}:`} </label>
        <div className="code-inputs-container">
          <input
            type="text"
            name="code"
            id="1"
            ref={input1}
            className="code-input"
            value={code[0]}
            onChange={(e) => {
              const newCode = [...code];
              const currValue = e.currentTarget.value;
              newCode[0] = currValue.charAt(currValue.length - 1);
              setCode(newCode);
              focusNext(1);
            }}
          />
          <input
            type="text"
            name="code"
            id="2"
            ref={input2}
            className="code-input"
            value={code[1]}
            onChange={(e) => {
              const newCode = [...code];
              const currValue = e.currentTarget.value;
              newCode[1] = currValue.charAt(currValue.length - 1);
              setCode(newCode);
              focusNext(2);
            }}
          />
          <input
            type="text"
            name="code"
            id="3"
            ref={input3}
            className="code-input"
            value={code[2]}
            onChange={(e) => {
              const newCode = [...code];
              const currValue = e.currentTarget.value;
              newCode[2] = currValue.charAt(currValue.length - 1);
              setCode(newCode);
              focusNext(3);
            }}
          />
          <input
            type="text"
            name="code"
            id="4"
            ref={input4}
            className="code-input"
            value={code[3]}
            onChange={(e) => {
              const newCode = [...code];
              const currValue = e.currentTarget.value;
              newCode[3] = currValue.charAt(currValue.length - 1);
              setCode(newCode);
              focusNext(4);
            }}
          />
          <input
            type="text"
            name="code"
            id="5"
            ref={input5}
            className="code-input"
            value={code[4]}
            onChange={(e) => {
              const newCode = [...code];
              const currValue = e.currentTarget.value;
              newCode[4] = currValue.charAt(currValue.length - 1);
              setCode(newCode);
              focusNext(5);
            }}
          />
        </div>
        <div className="code-form-btns">
          <button type="submit" className="forgot-form-btn" ref={btn}>
            Login
          </button>
          <button
            className="forgot-form-btn"
            onClick={(e) => {
              e.preventDefault();
              setCode(["", "", "", "", ""]);
              input1.current?.focus();
            }}
          >
            Clear
          </button>
        </div>
      </form>
    </div>
  );
};

export default CodeForm;
