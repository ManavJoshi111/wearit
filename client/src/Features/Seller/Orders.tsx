import { Component } from "react";
import callApi from "../../utlils/callApi";
import Loading from "../../utlils/Loading";
import { Table, Image } from "react-bootstrap";
import OrdersType from "../../types/order.types";
import UserType from "../../types/user.types";
import { NavLink } from "react-router-dom";

type OrdersWithCustomerType = OrdersType & {
  customer: UserType;
};

type OrderState = {
  orders: OrdersWithCustomerType[] | null;
  loading: boolean;
  error: string | undefined;
};

export default class Orders extends Component {
  state: OrderState = {
    orders: null,
    loading: true,
    error: undefined,
  };

  fetchOrders = async () => {
    try {
      const { data } = await callApi("api/order/get-seller-orders", "GET");
      console.log("Res: ", data);
      this.setState({ orders: data.orders, loading: false });
    } catch (err: any) {
      console.log("Error: ", err);
      this.setState({ loading: false, error: err.message });
    }
  };

  componentDidMount() {
    this.fetchOrders();
  }

  render() {
    if (this.state.loading) {
      return <Loading />;
    }
    if (this.state.error) {
      return <div>{this.state.error}</div>;
    }
    return (
      <>
        <Table striped bordered hover className="container">
          <thead>
            <tr>
              <th>Order No.</th>
              <th>Customer</th>
              <th>Products</th>
              <th>Amount</th>
            </tr>
          </thead>
          <tbody>
            {this.state.orders ? (
              this.state.orders.map((order, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>
                    {order.customer.firstName + " " + order.customer.lastName}
                  </td>
                  <td className="w-50">
                    <ul>
                      {order.productsdata.map((product, index) => (
                        <li
                          key={product?._id}
                          className="row d-flex justify-content-around align-items-center"
                        >
                          <Image
                            className="col-md-6 img-thumbnail w-25"
                            src={product?.imgUrls?.[0]}
                            thumbnail
                          />
                          <div className="col-md-6">
                            <NavLink
                              to={`/s/product/${product?._id}`}
                              className="text-decoration-none fw-bold text-dark"
                            >
                              {product?.name}
                            </NavLink>
                            <p>Quantity: {order.products?.[index]?.quantity}</p>
                          </div>
                        </li>
                      ))}
                    </ul>
                  </td>
                  <td>₹ {order.grandTotal}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={4}>No orders found</td>
              </tr>
            )}
          </tbody>
        </Table>
      </>
    );
  }
}
