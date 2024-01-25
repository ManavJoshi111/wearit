type Prop = {
  prop?: string;
};

const SellerDashboard: React.FC<Prop> = ({ prop }) => {
  return (
    <>
      <h1>{prop}</h1>
      {/* <CustomNavbar /> */}
    </>
  );
};

export default SellerDashboard;
