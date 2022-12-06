import OpenBoard from "../../assets/openboard.svg";
import "./logo.css";

export default function Logo() {
  return (
    <div className="logo">
      <img className="logo__image" src={OpenBoard} alt="logo" />
      <h1 className="logo__title">OpenBoard</h1>
    </div>
  );
}
