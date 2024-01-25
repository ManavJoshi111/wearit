import {
  Navbar,
  Nav,
  NavDropdown,
  Form,
  FormControl,
  Button,
} from "react-bootstrap";

const CustomNavbar = () => {
  return (
    <Navbar bg="dark" variant="dark" expand="lg">
      <Navbar.Brand href="#" className="ms-2 fw-bold">
        WearIt!
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="navbarColor02" />
      <Navbar.Collapse id="navbarColor02">
        <Nav className="me-auto">
          <Nav.Link href="#" active>
            Home
          </Nav.Link>
          <Nav.Link href="">Login</Nav.Link>
          <Nav.Link href="">Pricing</Nav.Link>
          <Nav.Link href="#">About</Nav.Link>
          <NavDropdown title="Dropdown" id="nav-dropdown">
            <NavDropdown.Item href="#">Action</NavDropdown.Item>
            <NavDropdown.Item href="#">Another action</NavDropdown.Item>
            <NavDropdown.Item href="#">Something else here</NavDropdown.Item>
            <NavDropdown.Divider />
            <NavDropdown.Item href="#">Separated link</NavDropdown.Item>
          </NavDropdown>
        </Nav>
        <Form className="d-flex">
          <FormControl type="search" placeholder="Search" className="me-sm-2" />
          <Button variant="secondary" type="submit">
            Search
          </Button>
        </Form>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default CustomNavbar;
