import { NavLink } from "react-router-dom";

const Home: React.FC = () => {
  return (
    <>
      <h1>WearIt!</h1>
      <NavLink to="/login">Login</NavLink>
      <br />
      <NavLink to="/">Home</NavLink>
      <br />
      <NavLink to="/register">Register</NavLink>
      <br />
      <NavLink to="/logout">Logout</NavLink>
    </>
  );
};

export default Home;
