import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useLoginStatus from "../hooks/useLoginStatus";

export default function RequireAuth({ children }) {
  const userIsLogged = useLoginStatus();
  const navigate = useNavigate();

  useEffect(() => {
    if (!userIsLogged) navigate("/login");
  }, []);

  return userIsLogged ? children : null;
}
