import { useNavigate, useParams } from "react-router-dom";

const Error404 = () => {
  const navigate = useNavigate();
  const { message } = useParams();
  return (
    <div>
      <h1>Error: 404</h1>
      <h3>{message}</h3>
      <button
        onClick={() => {
          navigate("/");
        }}
      >
        Home
      </button>
    </div>
  );
};

export default Error404;
