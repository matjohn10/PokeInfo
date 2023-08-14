import Login from "./login";
import Signup from "./signup";
import { useState } from "react";

interface Props {
  setLogged: React.Dispatch<React.SetStateAction<boolean>>;
  setUser: React.Dispatch<React.SetStateAction<null>>;
}

const UserConnectPage = ({ setLogged, setUser }: Props) => {
  const [isLogging, setIsLogging] = useState(true);
  return (
    <div className="main-connection-container">
      <div className="connection-container">
        {isLogging ? (
          <Login
            setIsLogging={setIsLogging}
            setLogged={setLogged}
            setUser={setUser}
          />
        ) : (
          <Signup setIsLogging={setIsLogging} />
        )}
      </div>
    </div>
  );
};

export default UserConnectPage;
