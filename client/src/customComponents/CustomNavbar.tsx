import { Navbar, Nav } from "react-bootstrap";
import { NavLink } from "react-router-dom";

type CustomNavbarProps = {
  links: {
    name: string;
    path: string;
    icon: JSX.Element;
  }[];
};

const CustomNavbar: React.FC<CustomNavbarProps> = ({ links }) => {
  return (
    <>
      <Navbar bg="primary" sticky="top" variant="dark" expand="lg">
        <Navbar.Brand href="" className="ms-3 fw-bold">
          WearIt!
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarColor02" />
        <Navbar.Collapse id="navbarColor02">
          <Nav className="me-auto">
            {links.map((link, index) => (
              <Nav.Link
                key={index}
                className="me-3"
                as={NavLink}
                to={link.path}
              >
                {link?.icon}&nbsp;&nbsp;{link.name}
              </Nav.Link>
            ))}
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </>
  );
};

export default CustomNavbar;
