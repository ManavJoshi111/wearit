import ProductType from "./product.types";

type CartProductType = {
  productId?: string;
  quantity?: number;
  totalPrice?: number;
};

type CartType = {
  products: CartProductType[];
  productsdata: ProductType[];
  userId: string;
  _id: string;
  grandTotal: number;
};

export default CartType;
