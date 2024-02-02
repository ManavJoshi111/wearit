type CartType = {
  products: [
    {
      productId: string;
      quantity: number;
    }
  ];
  userId: string;
  _id: string;
};

export default CartType;
