import { Navigate } from "react-router-dom";
import store from "./store";

export const ProtectedRoute = ({ children }) => {
  const { user } = store.user;
  if (!user) {
    // user is not authenticated
    return <Navigate to="/" />;
  }
  return children;
};