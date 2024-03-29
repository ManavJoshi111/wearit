import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Button, Card, Carousel } from "react-bootstrap";
import EditProductModal from "../Seller/EditProduct";
import DeleteProduct from "../Seller/DeleteProduct";
import Loading from "../../utlils/Loading";
import { useSelector } from "react-redux";
import ProductType from "../../types/product.types";
import CartFacility from "../Buyer/cart/components/CartFacility";
import { RootState } from "../../store";
import ProductReviews from "../Buyer/reviews/ProductReviews";

const Product: React.FC = () => {
  const { id } = useParams<string>();
  const { user } = useSelector((state: RootState) => state.user);
  const { products } = useSelector((state: RootState) => state.product);
  const [product, setProduct] = useState<ProductType | undefined>();

  const [showEditProductModal, setShowEditProductModal] = useState(false);
  const handleClose = () => setShowEditProductModal(false);
  const handleShow = () => setShowEditProductModal(true);

  useEffect(() => {
    if (products) {
      const product = products.find(
        (product: ProductType) => product?._id === id
      );
      setProduct(product);
    }
  }, [products]);

  return (
    <>
      {product ? (
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
                    <h2 className="fw-bold display-6 text-black text-uppercase">
                      {product?.name}
                    </h2>
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
                          <DeleteProduct id={product._id} />
                        </div>
                      </>
                    ) : (
                      <div className="d-flex justify-content-start align-items-around flex-column m-2">
                        <CartFacility product={product} />
                      </div>
                    )}
                  </Card.Body>
                </Card>
              </div>
            </div>
          </div>
          <ProductReviews productId={product?._id} />
        </>
      ) : (
        <Loading />
      )}
    </>
  );
};

export default Product;
