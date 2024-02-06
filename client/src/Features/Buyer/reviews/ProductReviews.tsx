import React, { useEffect, useState } from "react";
import { Card } from "react-bootstrap";
import callApi from "../../../utlils/callApi";
import Loading from "../../../utlils/Loading";
import AddReview from "./AddReview";

type ProductReviewsType = {
  productId?: string;
};

const ProductReviews: React.FC<ProductReviewsType> = ({ productId }) => {
  const [loading, setLoading] = useState(true);
  const [reviews, setReviews] = useState<any>([]);
  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const { data } = await callApi(
          `/api/review/get-reviews/${productId}`,
          "GET"
        );
        console.log(data);
        setReviews(data.reviews);
        setLoading(false);
      } catch (err) {
        console.log(err);
        setLoading(false);
      }
    };
    fetchReviews();
  }, []);

  if (loading || !reviews) {
    return <Loading />;
  }
  return (
    <>
      <Card className="container mt-3">
        <Card.Header>
          <div className="d-flex justify-content-between align-items-center">
            <h4 className="m-0 fw-bold">Reviews</h4>
            <AddReview setReviews={setReviews} productId={productId} />
          </div>
        </Card.Header>
        <Card.Body>
          <blockquote className="blockquote mb-0">
            {reviews?.length > 0 ? (
              reviews.map((review: any) => (
                <>
                  {console.log(review)}
                  <p key={review._id}>
                    {review.review}&nbsp;
                    <small className="text-muted">({review.rating}/5)</small>
                  </p>
                  <footer className="blockquote-footer">
                    <cite className="">
                      {review.user.firstName + " " + review.user.lastName} at{" "}
                      {new Date(review.createdAt).toLocaleDateString("en-IN")}
                    </cite>
                  </footer>
                </>
              ))
            ) : (
              <p>No Reviews</p>
            )}
          </blockquote>
        </Card.Body>
      </Card>
    </>
  );
};

export default ProductReviews;
