const Button = ({ status, handleClick }) => {
  return <button onClick={handleClick}>{status}</button>;
};

export default Button;
