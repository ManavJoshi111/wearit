import CustomNavbar from "../../customComponents/CustomNavbar";

const BuyerDashboard: React.FC = () => {
  const NavbarLinks = [
    {
      name: "Home",
      path: "/",
    },
    {
      name: "Products",
      path: "/products",
    },
    {
      name: "Cart",
      path: "/cart",
    },
    {
      name: "Checkout",
      path: "/checkout",
    },
    {
      name: "Reviews",
      path: "/reviews",
    },
    {
      name: "Orders",
      path: "/orders",
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

export default BuyerDashboard;
