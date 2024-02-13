import React, { useState, useEffect } from "react";
import callApi from "../../../utlils/callApi";
import Loading from "../../../utlils/Loading";
import { Accordion, Row, Col, Container } from "react-bootstrap";
import ProductCard from "../../Common/ProductCard";
import { NavLink } from "react-router-dom";
import OrdersType from "../../../types/order.types";

const Orders: React.FC = () => {
  const [orders, setOrders] = useState<OrdersType[] | null>();
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const { data } = await callApi("api/order/get-orders", "GET");
        console.log("Data: ", data);
        setOrders(data.orders);
        setLoading(false);
      } catch (err) {
        console.log("Error: ", err);
        setLoading(false);
      }
    };
    fetchOrders();
  }, []);

  if (loading) {
    return <Loading />;
  }
  if (orders && orders.length === 0) {
    return (
      <>
        <Container className="mt-4">
          <Row>
            <Col>
              <div className="m-4 border-none">
                <div className="text-center">
                  <h3 className="text-uppercase text-muted">
                    😢You have not purchased anything yet!😢
                  </h3>
                  <NavLink
                    to="/products"
                    className="btn btn-primary text-uppercase "
                  >
                    Shop Now
                  </NavLink>
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </>
    );
  }
  return (
    <>
      <div className="container m-4">
        <h1>Your Orders</h1>
        {orders &&
          orders.map((order, index) => {
            return (
              <Accordion
                defaultActiveKey="0"
                className="accordion border border-2 shadow-sm m-2"
              >
                <Accordion.Header>
                  <div className="order-data d-flex w-50 justify-content-around align-items-center">
                    <div className="order-no">{index + 1}.</div>
                    <div className="order-id">
                      <strong>Grand Total: </strong>₹ {order.grandTotal}
                    </div>
                    <div className="order-quantity">
                      <strong>Ordered On: </strong>
                      {new Date(order.orderedTime).toLocaleDateString("en-IN")}
                      &nbsp;&nbsp;
                      {new Date(order.orderedTime).toLocaleTimeString([], {
                        hour: "numeric",
                        minute: "numeric",
                      })}
                    </div>
                  </div>
                </Accordion.Header>
                <Accordion.Body>
                  <div className="d-flex justify-content-start align-items-center">
                    {order &&
                      order?.products?.map((_, index) => {
                        return (
                          <>
                            <ProductCard
                              product={{
                                ...order.productsdata[index],
                                quantity: order?.products?.[index]?.quantity,
                                price: order?.products?.[index]?.totalPrice,
                              }}
                            />
                          </>
                        );
                      })}
                  </div>
                </Accordion.Body>
              </Accordion>
            );
          })}
      </div>
    </>
  );
};

export default Orders;
