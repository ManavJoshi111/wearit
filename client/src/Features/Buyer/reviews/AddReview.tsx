import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { Form } from "react-bootstrap";
import callApi from "../../../utlils/callApi";
import {
  ErrorToast,
  SuccessToast,
} from "../../../customComponents/CustomToast";

type AddReviewType = {
  productId?: string;
  setReviews: React.Dispatch<React.SetStateAction<any[]>>;
};
const AddReview: React.FC<AddReviewType> = ({ productId, setReviews }) => {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [reviewData, setReviewData] = useState({
    rating: 1,
    review: "",
  });
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setReviewData({ ...reviewData, [e.target.name]: e.target.value });
  };
  const handleAddReview = async () => {
    try {
      const { data } = await callApi(
        `/api/review/add-review/${productId}`,
        "POST",
        reviewData
      );
      setReviewData({
        rating: 1,
        review: "",
      });
      setReviews((prev) => [...prev, data.review]);
      SuccessToast(data);
      handleClose();
    } catch (err: any) {
      ErrorToast(err?.response?.data);
    }
  };

  return (
    <>
      <Button
        className="align-self-end text-end"
        style={{ cursor: "pointer" }}
        onClick={handleShow}
      >
        Add Review
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Write a review</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label className="fw-bold">Rate your experience:</Form.Label>
              <Form.Range
                id="review-range"
                name="rating"
                required={true}
                min={0}
                max={5}
                value={reviewData.rating}
                onChange={handleInputChange}
                step={1}
              />
              <div className="d-flex m-0 p-0 justify-content-between">
                {[0, 1, 2, 3, 4, 5].map((star, index) => {
                  return (
                    <span
                      key={index}
                      className="text-primary"
                      style={{ cursor: "pointer" }}
                    >
                      {star}
                    </span>
                  );
                })}
              </div>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label className="fw-bold">Review: </Form.Label>
              <Form.Control
                type="text"
                name="review"
                value={reviewData.review}
                required={true}
                onChange={handleInputChange}
                placeholder="Share your thoughts"
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary"
            onClick={() => {
              setReviewData({
                rating: 1,
                review: "",
              });
              handleClose();
            }}
          >
            Close
          </Button>
          <Button variant="primary" onClick={handleAddReview}>
            Submit Review
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default AddReview;
