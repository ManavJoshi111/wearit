import callApi from "../../../../utlils/callApi";
import {
  ErrorToast,
  SuccessToast,
} from "../../../../customComponents/CustomToast";
import { updateCart } from "../../../../reducers/cart.reducer";
import { useDispatch } from "react-redux";
import { Button } from "react-bootstrap";
import ProductType from "../../../../types/product.types";

type RemoveFromCartTypes = {
  product?: ProductType;
};

const RemoveFromCart: React.FC<RemoveFromCartTypes> = ({ product }) => {
  const dispatch = useDispatch();
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
  return (
    <div className="d-flex justify-content-around align-items center">
      <Button variant="danger" onClick={handleRemoveFromCart}>
        Remove from cart
      </Button>
    </div>
  );
};

export default RemoveFromCart;
