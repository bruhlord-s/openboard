import { useNavigate } from "react-router-dom";
import "../assets/styles/welcome.css";
import Openboard from "../assets/openboard.svg";
import Logo from "../components/logo/Logo";

export default function Welcome() {
  const navigate = useNavigate();

  return (
    <div className="welcome">
      <div className="welcome__logo">
        <Logo />
      </div>

      <div
        className="button"
        onClick={() => {
          navigate("/register");
        }}
      >
        Start
      </div>
    </div>
  );
}
