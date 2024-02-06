import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import callApi from "../../utlils/callApi";
import { Col, Container, Row } from "react-bootstrap";

const PaymentSuccess: React.FC = () => {
  const { id } = useParams<{ id: string }>();

  useEffect(() => {
    const paymentSuccess = async () => {
      try {
        const { data } = await callApi(`/api/payment/success/${id}`, "GET");
        console.log("Data after payment: ", data);
      } catch (error) {
        console.log("Error: ", error);
      }
      window.location.pathname = "/";
    };
    paymentSuccess();
  }, []);

  return (
    <Container className="mt-5">
      <Row className="justify-content-center">
        <Col xs={10} sm={8} md={6} className="text-center">
          <div className="mt-5">
            <h1 className="display-4 mb-4">Payment Successful</h1>
            <p className="lead">Thank you for your purchase! 🎉</p>
            <p className="lead">Your order has been successfully processed.</p>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default PaymentSuccess;
