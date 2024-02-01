import CustomNavbar from "../../customComponents/CustomNavbar";

const SellerDashboard: React.FC = () => {
  const NavbarLinks = [
    {
      name: "Home",
      path: "/s",
    },
    {
      name: "Add Product",
      path: "/s/add-product",
    },
    {
      name: "Your Products",
      path: "/s/products",
    },
    {
      name: "Orders",
      path: "/s/orders",
    },
    {
      name: "Logout",
      path: "/logout",
    },
  ];
  return (
    <>
      <CustomNavbar links={NavbarLinks} />
    </>
  );
};

export default SellerDashboard;
