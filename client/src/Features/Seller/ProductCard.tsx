import React from "react";
import { Badge, Card } from "react-bootstrap";
import Carousel from "react-bootstrap/Carousel";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";

type ProductCardProps = {
  product: any;
};

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { user } = useSelector((state: any) => state.user);
  return (
    <>
      <Card
        className="card mt-2 mb-3 text-primary border border-primary rounded-3"
        style={{ maxWidth: "20rem" }}
      >
        <NavLink
          to={
            user.type === "seller"
              ? `/s/product/${product?._id}`
              : `/product/${product?._id}`
          }
          className="text-decoration-none"
        >
          <Card.Header>
            <h2
              className="fw-bold text-black text-uppercase"
              style={{
                textOverflow: "ellipsis",
                overflow: "hidden",
                whiteSpace: "nowrap",
              }}
            >
              {product?.name}
            </h2>
          </Card.Header>
          <Carousel interval={null}>
            {product?.imgUrls.map((url: string, index: number) => (
              <Carousel.Item key={index}>
                <img
                  className="d-block w-100"
                  src={url}
                  alt="Product Image"
                  style={{ height: "300px", width: "300px" }}
                />
              </Carousel.Item>
            ))}
          </Carousel>
          <hr className="m-0 p-0" />
          <Card.Body className="mb-0 pb-0">
            <Card.Text>
              {product?.categories.map((category: string, index: number) => (
                <Badge bg="primary" className="me-1 rounded-pill" key={index}>
                  {category}
                </Badge>
              ))}
            </Card.Text>
          </Card.Body>
          <Card.Body>
            <Card.Text className="fw-bold text-success">
              {product?.companyName}
            </Card.Text>
            <Card.Text className="text-info">
              {product?.quantity} pairs left
            </Card.Text>
            <Card.Text className="text-danger-emphasis">
              &#8377;{product?.price}
            </Card.Text>
          </Card.Body>
        </NavLink>
      </Card>
    </>
  );
};

export default ProductCard;
