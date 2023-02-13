import "./Button.css";

export default function Button({
  className,
  title,
  onClick,
  submit,
  disabled,
}) {
  // return submit ? (
  //   <button
  //     type='submit'
  //     onClick={onClick}
  //     className={`${className} button button--primary`}>
  //     {title}
  //   </button>
  // ) : (
  //   <button onClick={onClick} className={`${className} button button--primary`}>
  //     {title}
  //   </button>
  // )

  return (
    <button
      type={submit ? "submit" : "button"}
      disabled={disabled}
      onClick={onClick}
      className={`${className} button`}
    >
      {title}
    </button>
  );
}
