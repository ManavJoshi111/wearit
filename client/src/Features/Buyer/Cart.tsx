import React from "react";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { loadStripe } from "@stripe/stripe-js";
import { RootState } from "../../store";
import ProductType from "../../types/product.types";
import Loading from "../../utlils/Loading";
import { STRIPE_PUBLIC_KEY } from "../../utlils/constants";
import callApi from "../../utlils/callApi";

const Cart: React.FC = () => {
  const { cart } = useSelector((state: RootState) => state.cart);
  const { products } = useSelector((state: RootState) => state.product);

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
      console.log("Data here: ", data);
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
  if (!cart) {
    return (
      <>
        <Loading />
      </>
    );
  }
  if (cart?.products.length === 0) {
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
            <Card className="shadow-0 m-4 border border-black border-opacity-50">
              <Card.Body>
                <h4 className="card-title mb-4 fw-bold text-uppercase">
                  Your shopping cart
                </h4>
                {cart?.products?.map((product, index) => {
                  const productDetails: ProductType | undefined =
                    products?.find((p) => p?._id === product.productId);
                  return (
                    <div
                      key={index}
                      className="row gy-3 d-flex justify-content-around align-items-center m-2 p-2 border"
                    >
                      <div className="col-lg-7 m-0 ">
                        <div className="me-lg-5">
                          <div className="d-flex justify-content-around align-items-center">
                            <img
                              src={`${productDetails?.imgUrls || ""}`}
                              alt="Product Demo Image"
                              className="img-thumbnail w-50 border rounded me-3"
                            />
                            <h5>
                              <NavLink
                                to={`/product/${productDetails?._id}`}
                                className="text-info text-decoration-none text-uppercase fw-bold"
                              >
                                {productDetails?.name}
                              </NavLink>
                            </h5>
                          </div>
                        </div>
                      </div>
                      <div className="col-lg-5 col-sm-6 col-6 d-flex justify-content-between flex-row flex-lg-column flex-xl-row text-nowrap">
                        <div className="">
                          <select
                            className="form-select me-4"
                            disabled={true}
                            value={product?.quantity}
                          >
                            <option>{product?.quantity}</option>
                          </select>
                        </div>
                        <div className="d-flex flex-column align-items-center">
                          <span className="h6 text-primary mb-2">
                            Total Price: ₹{product?.totalPrice}
                          </span>{" "}
                          <small className="text-muted text-nowrap">
                            Price per Item: ₹{productDetails?.price}
                          </small>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </Card.Body>
            </Card>
          </Col>

          <Col lg={4}>
            <Card className="shadow-0 m-4  border border-black border-opacity-50">
              <Card.Body>
                <div className="card shadow-0 border">
                  <div className="card-body">
                    <div className="d-flex justify-content-between">
                      <p className="fw-bold text-uppercase mb-2">
                        Grand Total:
                      </p>
                      <p className="mb-2 text-success fw-bold">
                        {" "}
                        ₹{cart?.grandTotal}
                      </p>
                    </div>

                    <div className="mt-3">
                      <Button
                        className="btn btn-primary w-100 shadow-0 mb-2"
                        onClick={handleCheckout}
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
