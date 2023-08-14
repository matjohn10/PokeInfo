import { Outlet, Navigate } from "react-router-dom";

interface Props {
  currUser: boolean | null;
}

const PrivateRoutes = ({ currUser }: Props) => {
  return currUser ? <Outlet /> : <Navigate to={"/connection"} />;
};

export default PrivateRoutes;
