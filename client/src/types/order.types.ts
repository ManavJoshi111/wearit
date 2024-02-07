import CartType from "./cart.types";

type OrdersType = CartType & {
  orderedTime: Date;
};

export default OrdersType;
