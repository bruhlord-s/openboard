import Logo from "../logo/Logo";
import "./signForm.css";

export default function SignForm({ title, errors, children }) {
  return (
    <div className="wrapper">
      <div className="sign">
        <div className="sign__logo">
          <Logo />
        </div>
        <h2 className="sign__title">{title}</h2>
        {errors?.length > 0 && <div className="sign__error">{errors}</div>}
        <div className="sign__form">{children}</div>
      </div>
    </div>
  );
}
