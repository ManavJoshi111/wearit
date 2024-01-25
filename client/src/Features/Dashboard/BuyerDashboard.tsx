import { NavLink } from "react-router-dom";

type Prop = {
  prop?: string;
};

const BuyerDashboard: React.FC<Prop> = ({ prop }) => {
  return (
    <>
      <h1>{prop}</h1>
      <NavLink to="/logout">Logout</NavLink>
      {/* <CustomNavbar /> */}
    </>
  );
};

export default BuyerDashboard;
