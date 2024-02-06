import React from "react";
import { Container, Row, Col, Card, Button, ListGroup } from "react-bootstrap";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { loadStripe } from "@stripe/stripe-js";
import { RootState } from "../../../../store";
import Loading from "../../../../utlils/Loading";
import { STRIPE_PUBLIC_KEY } from "../../../../utlils/constants";
import callApi from "../../../../utlils/callApi";
import RemoveFromCart from "./RemoveFromCart";

const Cart: React.FC = () => {
  const { loading, cart, error } = useSelector(
    (state: RootState) => state.cart
  );
  let validCart = 1;
  const handleCheckout = async () => {
    try {
      const stripe = await loadStripe(STRIPE_PUBLIC_KEY!);
      const { data } = await callApi(
        "/api/payment/create-checkout-session",
        "POST",
        {
          cart,
        }
      );
      const result = await stripe?.redirectToCheckout({
        sessionId: data.id,
      });
      if (result?.error) {
        console.error("Error in checkout: ", result?.error.message);
      } else {
        console.log("Checkout Successfull");
      }
    } catch (err) {
      console.log("error in payment", err);
    }
  };
  if (loading) {
    return (
      <>
        <Loading />
      </>
    );
  }
  if (error) {
    return <h1>Error: {error}</h1>;
  }
  if (cart && cart.products && cart?.products?.length === 0) {
    return (
      <>
        <Container className="mt-4">
          <Row>
            <Col>
              <Card className="shadow-0 m-4 border border-black border-opacity-50">
                <Card.Body>
                  <div className="text-center">
                    <h3 className="text-muted">😢Your cart is empty😢</h3>
                    <NavLink to="/products" className="btn btn-primary">
                      Shop Now
                    </NavLink>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      </>
    );
  }
  return (
    <>
      <Container className="mt-4">
        <Row>
          <Col lg={8}>
            <Card className="shadow-0 m-3 border border-black border-opacity-50">
              <Card.Body>
                <h4 className="card-title mb-4 fw-bold text-uppercase">
                  Your shopping cart
                </h4>
                {cart?.products?.map((product, index) => {
                  (product?.quantity ?? 0) >
                    +(cart.productsdata?.[index]?.quantity ?? 0) &&
                    (validCart = 0);
                  return (
                    <>
                      <Card className="d-flex flex-row justify-content-center align-items-center">
                        <div className="d-flex img-div col-md-6 col-lg-6">
                          <Card.Img
                            className="img-thumbnail w-75 border rounded me-3"
                            variant="top"
                            src={`${
                              cart.productsdata?.[index]?.imgUrls?.[0] || ""
                            }`}
                          />
                        </div>
                        <div className="product-details col-md-6 col-lg-6">
                          <Card.Body>
                            <Card.Title>
                              <NavLink
                                to={`/product/${cart.productsdata?.[index]?._id}`}
                                className="text-info w-25 text-decoration-none text-uppercase fw-bold"
                              >
                                {cart.productsdata?.[index]?.name}
                              </NavLink>
                            </Card.Title>
                            <Card.Text>
                              Quantity: &nbsp;
                              {(product?.quantity ?? 0) <=
                              +(cart.productsdata?.[index]?.quantity ?? 0)
                                ? product?.quantity
                                : "Out of stock"}
                            </Card.Text>
                            <ListGroup className="">
                              <ListGroup.Item>
                                Total Price: ₹{product?.totalPrice}
                              </ListGroup.Item>
                              <ListGroup.Item>
                                Price per Item: ₹
                                {cart.productsdata?.[index]?.price}
                              </ListGroup.Item>
                            </ListGroup>
                          </Card.Body>
                          <Card.Body>
                            <Card.Link className="text-decoration-none">
                              <RemoveFromCart
                                product={cart.productsdata?.[index]}
                              />
                            </Card.Link>
                          </Card.Body>
                        </div>
                      </Card>
                    </>
                  );
                })}
              </Card.Body>
            </Card>
          </Col>

          <Col lg={4}>
            <Card className="shadow-0 m-3  border border-black border-opacity-50">
              <Card.Body>
                <div className="card shadow-0 border">
                  <div className="card-body">
                    <div className="d-flex justify-content-between">
                      <p className="fw-bold text-uppercase mb-2">
                        Grand Total:
                      </p>
                      <p className="mb-2 text-success fw-bold">
                        ₹ {cart?.grandTotal}
                      </p>
                    </div>

                    <div className="mt-3">
                      <Button
                        className="btn btn-primary w-100 shadow-0 mb-2"
                        onClick={handleCheckout}
                        disabled={!validCart}
                      >
                        Proceed To Checkout
                      </Button>
                      <NavLink
                        to="/products"
                        className="btn btn-light w-100 border mt-2"
                      >
                        Back to shop
                      </NavLink>
                    </div>
                  </div>
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Cart;
