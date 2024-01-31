import { Navbar, Nav } from "react-bootstrap";
import { Link } from "react-router-dom";

const CustomNavbar: React.FC = () => {
  return (
    <>
      <Navbar bg="dark" variant="dark" expand="lg">
        <Navbar.Brand href="" className="ms-2 fw-bold">
          WearIt!
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarColor02" />
        <Navbar.Collapse id="navbarColor02">
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/" active>
              Home
            </Nav.Link>
            <Nav.Link as={Link} to="/logout" active>
              Logout
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </>
  );
};

export default CustomNavbar;
