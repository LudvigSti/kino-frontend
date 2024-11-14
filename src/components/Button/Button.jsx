import "./button.css";

const Button = ({ Text, onClick, Size = "medium" }) => {
  return (
    <button className={`button button--${Size}`} onClick={onClick}>
      {Text}
    </button>
  );
};

export default Button;
