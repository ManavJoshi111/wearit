import React from "react";
import { Badge, Card } from "react-bootstrap";
import Carousel from "react-bootstrap/Carousel";

type ProductCardProps = {
  product: any;
};

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  return (
    <>
      <Card
        className="card mt-2 mb-3 text-primary"
        style={{ maxWidth: "20rem" }}
      >
        <Card.Header>
          <h2 className="fw-bold text-black">{product?.name}</h2>
        </Card.Header>
        <Carousel>
          {product?.imgUrls.map((url: string, index: number) => (
            <Carousel.Item key={index}>
              <img
                className="d-block w-100"
                src={url}
                alt="First slide"
                style={{ height: "200px" }}
              />
            </Carousel.Item>
          ))}
        </Carousel>
        <hr className="m-0 p-0" />
        <Card.Body className="mb-0 pb-0">
          <Card.Text>
            {product?.categories.map((category: string) => (
              <Badge bg="primary" className="me-1">
                {category}
              </Badge>
            ))}
          </Card.Text>
        </Card.Body>
        <Card.Body>
          <Card.Text>Quantity: {product?.quantity} </Card.Text>
        </Card.Body>
        <Card.Body className="mt-0 pt-0">
          <Card.Text>{product?.price} Rs. </Card.Text>
        </Card.Body>
      </Card>
    </>
  );
};

export default ProductCard;
