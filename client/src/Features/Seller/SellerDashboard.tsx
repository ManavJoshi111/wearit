import CustomNavbar from "../../customComponents/CustomNavbar";

const SellerDashboard: React.FC = () => {
  const NavbarLinks = [
    {
      name: "Home",
      path: "/s",
      icon: <i className="fas fa-home"></i>,
    },
    {
      name: "Add Product",
      path: "/s/add-product",
      icon: <i className="fas fa-plus"></i>,
    },
    {
      name: "Your Products",
      path: "/s/products",
      icon: <i className="fas fa-shopping-bag"></i>,
    },
    {
      name: "Orders",
      path: "/s/orders",
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

export default SellerDashboard;
