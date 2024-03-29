import { useEffect, useState } from "react";
import { Container, Form, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../store";
import { getUserData, loginUser } from "../actions/user.action";
import {
  ErrorToast,
  SuccessToast,
} from "../../../customComponents/CustomToast";
import { NavLink, useNavigate } from "react-router-dom";
import setUserToken from "../../../utlils/setUserToken";
import { getProducts } from "../../Common/actions/product.action";
import { getCartData } from "../../Buyer/cart/actions/cart.action";

type FormData = {
  email?: string;
  password?: string;
};

const Login = () => {
  const { user } = useSelector((state: RootState) => state.user);
  const [formData, setFormData] = useState<FormData>({});
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleFormSubmit = async (
    e: React.FormEvent<HTMLButtonElement>
  ): Promise<void> => {
    e.preventDefault();
    try {
      const data = await dispatch(loginUser(formData)).unwrap();
      SuccessToast(data);
      setUserToken(data.token);
      await dispatch(getUserData());
      await dispatch(getProducts());
      await dispatch(getCartData());
    } catch (err: any) {
      console.log("err: ", err);
      ErrorToast(err);
    }
  };

  useEffect(() => {
    if (user) {
      ErrorToast("You are already logged in");
      if (user.type === "buyer") {
        navigate("/");
        return;
      }
      navigate("/s");
    }
  }, [user]);

  if (user) {
    return (
      <>
        <h1>You are alrady loggedin</h1>
      </>
    );
  }

  return (
    <Container
      className="mt-5 p-4 border border-2 w-50 shadow"
      fluid
      style={{ overflowY: "auto", maxHeight: "400px" }}
    >
      <Form>
        <h2 className="fw-bold text-center mb-4">Login</h2>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label className="fw-bold">Email address:</Form.Label>
          <Form.Control
            type="email"
            required={true}
            name="email"
            placeholder="Enter email"
            onChange={handleInputChange}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label className="fw-bold">Password:</Form.Label>
          <Form.Control
            type="password"
            required={true}
            name="password"
            placeholder="Password"
            onChange={handleInputChange}
          />
        </Form.Group>
        <Form.Text className="text-muted">
          Don't have an account? &nbsp;
          <NavLink to="/register" className="text-decoration-none">
            Register
          </NavLink>
        </Form.Text>
        <br />
        <Button
          variant="primary"
          className="fw-bold"
          type="submit"
          onClick={handleFormSubmit}
        >
          Submit
        </Button>
      </Form>
    </Container>
  );
};

export default Login;
