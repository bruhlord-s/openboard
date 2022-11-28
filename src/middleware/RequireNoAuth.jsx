import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useLoginStatus from "../hooks/useLoginStatus";

export default function RequireNoAuth({ children }) {
  const userIsLogged = useLoginStatus();
  const navigate = useNavigate();

  useEffect(() => {
    if (userIsLogged) navigate("/dashboard");
  }, []);

  return !userIsLogged ? children : null;
}
