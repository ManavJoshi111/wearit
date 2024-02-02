import { ErrorToast, SuccessToast } from "../../customComponents/CustomToast";
import callApi from "../../utlils/callApi";
import { deleteProduct as deleteProductAction } from "../../reducers/product.reducer";
import { useNavigate } from "react-router-dom";
import { Button } from "react-bootstrap";
import { useDispatch } from "react-redux";

const DeleteProduct = ({ id }: { id?: string }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleDeleteProduct = async () => {
    try {
      const res = await callApi(`/api/product/delete-product/${id}`, "DELETE");
      SuccessToast(res.data);
      dispatch(deleteProductAction(id));
      navigate("/s/products");
    } catch (err: any) {
      console.log(err);
      ErrorToast(err.response.data);
    }
  };
  return (
    <>
      <Button variant="danger" onClick={handleDeleteProduct}>
        Delete
      </Button>
    </>
  );
};

export default DeleteProduct;
