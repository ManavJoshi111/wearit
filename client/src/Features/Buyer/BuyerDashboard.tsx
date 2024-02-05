import CustomNavbar from "../../customComponents/CustomNavbar";

const BuyerDashboard: React.FC = () => {
  const NavbarLinks = [
    {
      name: "Home",
      path: "/",
      icon: <i className="fas fa-home"></i>,
    },
    {
      name: "Products",
      path: "/products",
      icon: <i className="fas fa-shopping-bag"></i>,
    },
    {
      name: "Cart",
      path: "/cart",
      icon: <i className="fas fa-shopping-cart"></i>,
    },
    {
      name: "Checkout",
      path: "/checkout",
      icon: <i className="fas fa-credit-card"></i>,
    },
    {
      name: "Reviews",
      path: "/reviews",
      icon: <i className="fas fa-star"></i>,
    },
    {
      name: "Orders",
      path: "/orders",
      icon: <i className="fas fa-shopping-basket"></i>,
    },
    {
      name: "Logout",
      path: "/logout",
      icon: <i className="fas fa-sign-out-alt"></i>,
    },
  ];
  return (
    <>
      <CustomNavbar links={NavbarLinks} />
    </>
  );
};

export default BuyerDashboard;
