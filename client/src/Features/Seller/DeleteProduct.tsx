import { ErrorToast, SuccessToast } from "../../customComponents/CustomToast";
import callApi from "../../utlils/callApi";

const deleteProduct = async (id?: string) => {
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

export default deleteProduct;
