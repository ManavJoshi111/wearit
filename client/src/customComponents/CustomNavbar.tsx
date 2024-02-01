import { Navbar, Nav } from "react-bootstrap";
import { NavLink } from "react-router-dom";

type CustomNavbarProps = {
  links: {
    name: string;
    path: string;
  }[];
};

const CustomNavbar: React.FC<CustomNavbarProps> = ({ links }) => {
  return (
    <>
      <Navbar bg="primary" sticky="top" variant="dark" expand="lg">
        <Navbar.Brand href="" className="ms-2 fw-bold">
          WearIt!
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarColor02" />
        <Navbar.Collapse id="navbarColor02">
          <Nav className="me-auto">
            {links.map((link, index) => (
              <Nav.Link key={index} as={NavLink} to={link.path}>
                {link.name}
              </Nav.Link>
            ))}
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </>
  );
};

export default CustomNavbar;
