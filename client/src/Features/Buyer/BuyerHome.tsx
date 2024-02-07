import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import { NavLink } from "react-router-dom";

const BuyerHome: React.FC = () => {
  return (
    <div className="landing-page">
      <div className="hero-section">
        <Container>
          <Row className="align-items-center">
            <Col md={6}>
              <h1 className="fw-bold">Find Your Perfect Pair</h1>
              <h5>
                Explore our latest collection of stylish and comfortable shoes.
              </h5>
              <NavLink to="/products" className="btn btn-primary fw-bold">
                Shop Now
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

export default BuyerHome;
