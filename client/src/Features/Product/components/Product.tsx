import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import callApi from "../../../utlils/callApi";
import { Form, Button, Card, Carousel } from "react-bootstrap";
import Modal from "react-bootstrap/Modal";
import { InputTags } from "react-bootstrap-tagsinput";
import {
  ErrorToast,
  SuccessToast,
} from "../../../customComponents/CustomToast";

export const EditProductModal = ({
  show,
  handleClose,
  product,
}: {
  show: boolean;
  handleClose: () => void;
  product: {
    id: string;
    name: string;
    price: number;
    description: string;
    quantity: number;
    categories: string[];
  };
}) => {
  const { id } = useParams<any>();
  const [formData, setFormData] = useState<any>({
    name: product?.name,
    price: product?.price,
    description: product?.description,
    quantity: product?.quantity,
    categories: product?.categories,
  });
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevState: any) => ({
      ...prevState,
      [name]: value,
    }));
  };
  const updateProduct = async () => {
    try {
      const res = await callApi(
        `/api/product/update-product/${id}`,
        "PUT",
        formData
      );
      console.log("Res: ", res.data.product);
      window.location.reload();
      SuccessToast(res.data);
    } catch (err: any) {
      console.log(err);
      ErrorToast(err.response.data);
    }
  };

  return (
    <>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Product</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="formBasicName">
              <Form.Label className="fw-bold">Name</Form.Label>
              <Form.Control
                type="text"
                name="name"
                value={formData.name}
                placeholder="Enter name"
                onChange={handleInputChange}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicPrice">
              <Form.Label className="fw-bold">Price:</Form.Label>
              <Form.Control
                type="number"
                name="price"
                value={formData.price}
                placeholder="Enter price"
                onChange={handleInputChange}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicDescription">
              <Form.Label className="fw-bold">Description:</Form.Label>
              <Form.Control
                as="textarea"
                name="description"
                value={formData.description}
                placeholder="Enter description"
                onChange={handleInputChange}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicPrice">
              <Form.Label className="fw-bold">Quantity:</Form.Label>
              <Form.Control
                type="number"
                name="quantity"
                value={formData.quantity}
                placeholder="Enter quantity"
                onChange={handleInputChange}
              />
            </Form.Group>
            <Form.Group className="mb-3 mt-0" controlId="formBasicCategories">
              <Form.Label className="fw-bold">Categories:</Form.Label>
              <InputTags
                values={formData.categories}
                onTags={(value) => {
                  return setFormData((prevState: any) => ({
                    ...prevState,
                    categories: value.values,
                  }));
                }}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button
            variant="primary"
            onClick={() => {
              handleClose();
              updateProduct();
            }}
          >
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export const deleteProduct = async (id?: string) => {
  try {
    const res = await callApi(`/api/product/delete-product/${id}`, "DELETE");
    console.log("Res: ", res.data);
    SuccessToast(res.data);
    window.location.pathname = "/s/products";
  } catch (err: any) {
    console.log(err);
    ErrorToast(err.response.data);
  }
};

const Product: React.FC = () => {
  const [product, setProduct] = useState<any>(null);
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
                    </Card.Body>
                  </Card>
                </div>
              </div>
            </div>
          </>
        </>
      ) : (
        <>Loading Product...</>
      )}
    </>
  );
};

export default Product;
