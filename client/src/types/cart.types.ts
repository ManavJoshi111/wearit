type CartProductType = {
  productId?: string;
  quantity?: number;
  totalPrice?: number;
};

type CartType = {
  products: CartProductType[];
  userId: string;
  _id: string;
  grandTotal: number;
};

export default CartType;
