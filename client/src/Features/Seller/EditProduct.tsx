import Modal from "react-bootstrap/Modal";
import { InputTags } from "react-bootstrap-tagsinput";
import { Button, Form } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { useState } from "react";
import { ErrorToast, SuccessToast } from "../../customComponents/CustomToast";
import callApi from "../../utlils/callApi";
import ProductType from "../../types/product.types";
import { editProduct } from "../../reducers/product.reducer";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../store";

const EditProductModal = ({
  show,
  handleClose,
  product,
}: {
  show: boolean;
  handleClose: () => void;
  product: ProductType;
}) => {
  const dispatch = useDispatch<AppDispatch>();
  const { id } = useParams<string>();
  const [formData, setFormData] = useState<ProductType>({
    name: product?.name,
    price: product?.price,
    description: product?.description,
    quantity: product?.quantity,
    categories: product?.categories,
  });
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevState: ProductType) => ({
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
      dispatch(editProduct(res.data.product));
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
                value={formData?.name}
                placeholder="Enter name"
                onChange={handleInputChange}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicPrice">
              <Form.Label className="fw-bold">Price:</Form.Label>
              <Form.Control
                type="number"
                name="price"
                value={formData?.price}
                placeholder="Enter price"
                onChange={handleInputChange}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicDescription">
              <Form.Label className="fw-bold">Description:</Form.Label>
              <Form.Control
                as="textarea"
                name="description"
                value={formData?.description}
                placeholder="Enter description"
                onChange={handleInputChange}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicPrice">
              <Form.Label className="fw-bold">Quantity:</Form.Label>
              <Form.Control
                type="number"
                name="quantity"
                value={formData?.quantity}
                placeholder="Enter quantity"
                onChange={handleInputChange}
              />
            </Form.Group>
            <Form.Group className="mb-3 mt-0" controlId="formBasicCategories">
              <Form.Label className="fw-bold">Categories:</Form.Label>
              <InputTags
                values={formData?.categories}
                onTags={(value) => {
                  return setFormData((prevState: ProductType) => ({
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

export default EditProductModal;
