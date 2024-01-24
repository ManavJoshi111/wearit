import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import { getUserData, registerUser } from "../actions/user.action";
import { AppDispatch } from "../../store";
import { Container, Form, Button } from "react-bootstrap";
import { SuccessToast, ErrorToast } from "../../utlils/CustomToast";

type FormData = {
  firstName?: string;
  lastName?: string;
  email?: string;
  password?: string;
  confirmPassword?: string;
  type?: string;
};

const Register = () => {
  const { user } = useSelector((state: any) => state.user);
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
      const data = await dispatch(registerUser(formData)).unwrap();
      console.log("data: ", data);
      SuccessToast(data);
      localStorage.setItem("token", data.token);
      await dispatch(getUserData());
      navigate("/");
    } catch (err: any) {
      console.log("err: ", err);
      ErrorToast(err);
    }
  };

  useEffect(() => {
    if (user) {
      ErrorToast("You are already logged in");
      navigate("/");
    }
  }, []);

  if (user) {
    return (
      <>
        <h1>You are alrady loggedin</h1>
      </>
    );
  }

  return (
    <Container className="mt-5 p-4 border border-2 w-50 shadow" fluid>
      <Form>
        <h2 className="fw-bold text-center mb-4">Register</h2>
        <Form.Group className="mb-3" controlId="formFirstName">
          <Form.Label className="fw-bold">First Name:</Form.Label>
          <Form.Control
            type="text"
            name="firstName"
            placeholder="Enter first name"
            onChange={handleInputChange}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formLastName">
          <Form.Label className="fw-bold">Last Name:</Form.Label>
          <Form.Control
            type="text"
            name="lastName"
            placeholder="Enter last name"
            onChange={handleInputChange}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formEmail">
          <Form.Label className="fw-bold">Email:</Form.Label>
          <Form.Control
            type="email"
            name="email"
            placeholder="Enter email"
            onChange={handleInputChange}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formPassword">
          <Form.Label className="fw-bold">Password:</Form.Label>
          <Form.Control
            type="password"
            name="password"
            placeholder="Password"
            onChange={handleInputChange}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formConfirmPassword">
          <Form.Label className="fw-bold">Confirm Password:</Form.Label>
          <Form.Control
            type="password"
            name="confirmPassword"
            placeholder="Confirm password"
            onChange={handleInputChange}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formType">
          <Form.Label className="fw-bold">Type:</Form.Label>
          <Form.Control as="select" name="type" onChange={handleInputChange}>
            <option>Select type</option>
            <option value="buyer">Cutomer</option>
            <option value="seller">Seller</option>
          </Form.Control>
        </Form.Group>
        <Form.Text className="text-muted">
          Already have an account? &nbsp;
          <NavLink to="/login" className="text-decoration-none">
            Login
          </NavLink>
        </Form.Text>
        <br />
        <Button
          variant="primary"
          type="submit"
          className="fw-bold"
          onClick={handleFormSubmit}
        >
          Register
        </Button>
      </Form>
    </Container>
  );
};

export default Register;
