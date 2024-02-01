import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import callApi from "../../utlils/callApi";
import { Button, Card, Carousel } from "react-bootstrap";
import EditProductModal from "../Seller/EditProduct";
import deleteProduct from "../Seller/DeleteProduct";
import Loading from "../../utlils/Loading";
import { useSelector } from "react-redux";

const Product: React.FC = () => {
  const [product, setProduct] = useState<any>(null);
  const { user } = useSelector((state: any) => state.user);
  const { id } = useParams<any>();

  const [showEditProductModal, setShowEditProductModal] = useState(false);
  const handleClose = () => setShowEditProductModal(false);
  const handleShow = () => setShowEditProductModal(true);

  const getProductData = async () => {
    const res = await callApi(`/api/product/get-product/${id}`, "GET");
    setProduct(res.data.product);
  };
  useEffect(() => {
    getProductData();
  }, []);

  return (
    <>
      {product ? (
        <>
          <>
            <div className="container m-auto mt-2 ">
              <div className="row">
                <div className="col-md-6 d-flex">
                  <div className="card d-flex w-100 justify-content-center">
                    <Carousel interval={null} variant="dark">
                      {product?.imgUrls?.map((url: string, index: number) => (
                        <Carousel.Item key={index} className="text-center">
                          <img
                            src={url}
                            alt="Product Image"
                            style={{
                              height: "300px",
                              width: "300px",
                            }}
                          />
                        </Carousel.Item>
                      ))}
                    </Carousel>
                  </div>
                </div>
                <div className="col-md-6 d-flex">
                  <Card className="w-100">
                    <Card.Body className="d-flex flex-column">
                      <h1 className="fw-bold display-4 text-black text-uppercase">
                        {product?.name}
                      </h1>
                      <h3 className="fw-bold text-danger-emphasis">
                        &#8377;{product?.price}
                      </h3>
                      <h5>
                        {product?.categories?.map(
                          (category: string, index: number) => (
                            <span
                              className="badge bg-primary me-1 rounded-pill"
                              key={index}
                            >
                              {category}
                            </span>
                          )
                        )}
                      </h5>
                      <h5 className="">{product?.description}</h5>
                      <h5 className="text-info">
                        {product?.quantity} pairs left
                      </h5>
                      {user?.type === "seller" &&
                      user?._id === product?.userId ? (
                        <>
                          <div className="d-flex justify-content-around align-items center">
                            <Button variant="success" onClick={handleShow}>
                              Edit product
                            </Button>
                            <EditProductModal
                              handleClose={handleClose}
                              show={showEditProductModal}
                              product={product}
                            />
                            <Button
                              variant="danger"
                              onClick={() => {
                                deleteProduct(id);
                              }}
                            >
                              Delete
                            </Button>
                          </div>
                        </>
                      ) : (
                        <>
                          <div className="d-flex justify-content-around align-items center">
                            <Button variant="success">Add to cart</Button>
                            <Button variant="danger">Buy now</Button>
                          </div>
                        </>
                      )}
                    </Card.Body>
                  </Card>
                </div>
              </div>
            </div>
          </>
        </>
      ) : (
        <Loading />
      )}
    </>
  );
};

export default Product;
