import { Button } from "react-bootstrap";
import { useSelector } from "react-redux";
import ProductType from "../../types/product.types";
import Loading from "../../utlils/Loading";
// import callApi from "../../utlils/callApi";

const Checkout = ({ product }: { product: ProductType }) => {
  const { cart } = useSelector((state: any) => state.cart);
  const handleAddToCart = () => {};

  const productExistsInCart = () => {
    return cart[0].products?.find((item: any) => {
      console.log("item: ", item?.productId === product?._id);
      return item?.productId === product?._id;
    });
  };

  if (!cart) {
    return <Loading />;
  }

  return (
    <>
      {product &&
        (productExistsInCart() ? (
          <>
            <div className="d-flex justify-content-around align-items center">
              <Button variant="danger" onClick={handleAddToCart}>
                Remove from cart
              </Button>
            </div>
          </>
        ) : (
          <>
            <div className="cart-dropdown">
              <h5>Quantity:</h5>
              <select
                name="quantity"
                id="quantity"
                className="form-select mb-2"
              >
                {product?.quantity && +product?.quantity >= 5
                  ? [1, 2, 3, 4, 5].map((value: number, index: number) => (
                      <option selected={value === 1} value={value} key={index}>
                        {value}
                      </option>
                    ))
                  : new Array(product?.quantity ? +product?.quantity : 5)
                      .fill(0)
                      .map((value: number, index: number) => {
                        return (
                          <option
                            value={value + index + 1}
                            selected={value === 1}
                            key={index}
                          >
                            {value + index + 1}
                          </option>
                        );
                      })}
              </select>
            </div>
            <div className="d-flex justify-content-around align-items center">
              <Button variant="success" onClick={handleAddToCart}>
                Add to cart
              </Button>
              <Button variant="danger">Buy now</Button>
            </div>
          </>
        ))}
    </>
  );
};

export default Checkout;
