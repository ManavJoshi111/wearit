import { Col, Container, Row } from "react-bootstrap";
import { NavLink } from "react-router-dom";

const SellerHome = () => {
  return (
    <div className="landing-page">
      <div className="hero-section">
        <Container>
          <Row className="align-items-center">
            <Col md={6}>
              <h1 className="fw-bold">Welcome to Your Seller Dashboard</h1>
              <h5>Reach Thousands of Customers and Grow Your Business</h5>
              <NavLink to="/s/add-product" className="btn btn-primary fw-bold">
                Add a product
              </NavLink>
            </Col>
            <Col md={6}>
              <img
                src="/assets/shoes_landing_page.png"
                alt="Shoes"
                className="img-fluid"
              />
            </Col>
          </Row>
        </Container>
      </div>
    </div>
  );
};

export default SellerHome;
