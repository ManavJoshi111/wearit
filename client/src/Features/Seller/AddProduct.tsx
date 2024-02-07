import { useState } from "react";
import { InputTags } from "react-bootstrap-tagsinput";
import "react-bootstrap-tagsinput/dist/index.css";
import { Container, Form, Button } from "react-bootstrap";
import ImageUpload from "../../customComponents/ImageUpload";
import { useNavigate } from "react-router-dom";
import { ErrorToast, SuccessToast } from "../../customComponents/CustomToast";
import { addProduct } from "../../reducers/product.reducer";
import callApi from "../../utlils/callApi";
import { useDispatch } from "react-redux";

type FormData = {
  name?: string;
  price?: number;
  categories?: string[];
  imgUrls?: string[];
};

const AddProduct = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [formData, setFormData] = useState<FormData>({});

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleFormSubmit = async (
    e: React.FormEvent<HTMLButtonElement>
  ): Promise<void> => {
    e.preventDefault();
    try {
      const { data } = await callApi(
        "/api/product/add-product",
        "POST",
        formData
      );
      console.log("Data: ", data);
      SuccessToast(data);
      dispatch(addProduct(data.product));
      navigate("/s/products");
    } catch (err: any) {
      ErrorToast(err?.response?.data);
    }
  };

  return (
    <>
      <Container className="mt-5 p-4 border border-2 w-50 shadow" fluid>
        <Form>
          <h2 className="fw-bold text-center mb-4">Add Product</h2>
          <Form.Group className="mb-3" controlId="formBasicName">
            <Form.Label className="fw-bold">Name</Form.Label>
            <Form.Control
              type="text"
              name="name"
              placeholder="Enter name"
              onChange={handleInputChange}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicPrice">
            <Form.Label className="fw-bold">Price:</Form.Label>
            <Form.Control
              type="number"
              name="price"
              placeholder="Enter price"
              onChange={handleInputChange}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicDescription">
            <Form.Label className="fw-bold">Description:</Form.Label>
            <Form.Control
              as="textarea"
              name="description"
              placeholder="Enter description"
              onChange={handleInputChange}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicPrice">
            <Form.Label className="fw-bold">Quantity:</Form.Label>
            <Form.Control
              type="number"
              name="quantity"
              placeholder="Enter quantity"
              onChange={handleInputChange}
            />
          </Form.Group>
          <Form.Group className="mb-3 mt-0" controlId="formBasicCategories">
            <Form.Label className="fw-bold">
              Categories (seperated by spaces):
            </Form.Label>
            <InputTags
              values={formData.categories}
              onTags={(value) => {
                return setFormData((prevState) => ({
                  ...prevState,
                  categories: value.values,
                }));
              }}
            />
          </Form.Group>
        </Form>
        <div
          className={`d-flex ${
            formData?.imgUrls?.length === 0 ? " d-none" : ""
          }`}
        >
          {formData.imgUrls?.map((url) => (
            <div
              className="loading-gif"
              style={{
                backgroundImage:
                  "url('https://media.giphy.com/media/3oEjI6SIIHBdRxXI40/giphy.gif')",
              }}
            >
              <img src={url} alt="product" style={{ width: "200px" }} />
            </div>
          ))}
        </div>
        <ImageUpload setFormData={setFormData} />
        <br />
        <Button
          variant="primary"
          className="fw-bold mt-3"
          type="submit"
          onClick={handleFormSubmit}
        >
          Submit
        </Button>
      </Container>
    </>
  );
};

export default AddProduct;
