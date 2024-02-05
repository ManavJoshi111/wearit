import { Button } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { useRef } from "react";
import ProductType from "../../types/product.types";
import { RootState } from "../../store";
import callApi from "../../utlils/callApi";
import { ErrorToast, SuccessToast } from "../../customComponents/CustomToast";
import { updateCart } from "../../reducers/cart.reducer";

const Checkout = ({ product }: { product: ProductType }) => {
  const { cart } = useSelector((state: RootState) => state.cart);
  const quantityRef = useRef<HTMLSelectElement>(null);
  const dispatch = useDispatch();
  const handleAddToCart = async () => {
    const quantity = quantityRef.current?.value;
    try {
      const { data } = await callApi("/api/cart/add-to-cart", "POST", {
        productId: product?._id,
        quantity: quantity,
      });
      if (data?.message) {
        SuccessToast(data?.message);
      }
      dispatch(updateCart(data.cart));
    } catch (err: any) {
      console.log(err.message);
      ErrorToast(err);
    }
  };

  const handleRemoveFromCart = async () => {
    try {
      const { data } = await callApi(
        `/api/cart/remove-from-cart/${product?._id}`,
        "DELETE"
      );
      if (data?.message) {
        SuccessToast(data?.message);
      }
      dispatch(updateCart(data.cart));
    } catch (err: any) {
      console.log(err.message);
      ErrorToast(err);
    }
  };

  const productExistsInCart = () => {
    return cart?.products?.find((item: any) => {
      return item?.productId === product?._id;
    });
  };

  return (
    <>
      {product &&
        (productExistsInCart() ? (
          <>
            <div className="d-flex justify-content-around align-items center">
              <Button variant="danger" onClick={handleRemoveFromCart}>
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
                ref={quantityRef}
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
