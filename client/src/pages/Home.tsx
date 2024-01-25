import CustomNavbar from "../components/CustomNavbar";

type Prop = {
  prop?: string;
};

const Home: React.FC<Prop> = ({ prop }) => {
  return (
    <>
      <h1>{prop}</h1>
      {/* <CustomNavbar /> */}
    </>
  );
};

export default Home;
