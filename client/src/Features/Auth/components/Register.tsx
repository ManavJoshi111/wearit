import { useState, useEffect, ReactNode } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import { getUserData, registerUser } from "../actions/user.action";
import { AppDispatch, RootState } from "../../../store";
import { Container, Form, Button } from "react-bootstrap";
import {
  SuccessToast,
  ErrorToast,
} from "../../../customComponents/CustomToast";
import setUserToken from "../../../utlils/setUserToken";

type FormData = {
  firstName?: string;
  lastName?: string;
  email?: string;
  password?: string;
  confirmPassword?: string;
  type?: string;
};

type FormFields = 'firstName' | 'lastName' | 'email' | 'password' | 'confirmPassword' | 'type' | 'companyName' | 'companyAddress';

type FormError = Record<FormFields, {state:boolean, message:string}>;

const Register = () => {
  const { user } = useSelector((state: RootState) => state.user);
  const [formData, setFormData] = useState<FormData>({});
  const [formError, setFormError] = useState<FormError>({
    firstName: {state:false, message:''},
  lastName: {state:false, message:''},
  email: {state:false, message:''},
  password: {state:false, message:''},
  confirmPassword: {state:false, message:''},
  type: {state:false, message:''},
  companyName: {state:false, message:''},
  companyAddress: {state:false, message:''},
  });
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
    setFormError({...formError, [name]: {state:false, message:''}})
  };

  const handleFormSubmit = async (
    e: React.FormEvent<HTMLButtonElement>
  ): Promise<void> => {
    e.preventDefault();
    try {
      const data = await dispatch(registerUser(formData)).unwrap();
      console.log("data: ", data);
      SuccessToast(data);
      setUserToken(data?.token);
      await dispatch(getUserData());
    } catch (err: any) {
      console.log("err: ", err);
      setFormError({...formError, [err.field]: {state: true, message: err.error}})
      // ErrorToast(err);
    }
  };

  const renderFormError = (field:FormFields):ReactNode | null => {
    if(formError[field]?.state){
      return <p className="text-danger">{formError[field]?.message}</p>
    }
    else{
      return null;
    }
  }

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
          {
          renderFormError('firstName')
          }
        </Form.Group>

        <Form.Group className="mb-3" controlId="formLastName">
          <Form.Label className="fw-bold">Last Name:</Form.Label>
          <Form.Control
            type="text"
            name="lastName"
            placeholder="Enter last name"
            onChange={handleInputChange}
          />
          {
            renderFormError('lastName')
          }
        </Form.Group>

        <Form.Group className="mb-3" controlId="formEmail">
          <Form.Label className="fw-bold">Email:</Form.Label>
          <Form.Control
            type="email"
            required={true}
            name="email"
            placeholder="Enter email"
            onChange={handleInputChange}
          />
          {
            renderFormError('email')
          }
        </Form.Group>

        <Form.Group className="mb-3" controlId="formPassword">
          <Form.Label className="fw-bold">Password:</Form.Label>
          <Form.Control
            type="password"
            required={true}
            name="password"
            placeholder="Password"
            onChange={handleInputChange}
          />
          {
            renderFormError('password')
          }
        </Form.Group>

        <Form.Group className="mb-3" controlId="formConfirmPassword">
          <Form.Label className="fw-bold">Confirm Password:</Form.Label>
          <Form.Control
            type="password"
            required={true}
            name="confirmPassword"
            placeholder="Confirm password"
            onChange={handleInputChange}
          />
          {
            renderFormError('confirmPassword')
          }
        </Form.Group>

        <Form.Group className="mb-3" controlId="formType">
          <Form.Label className="fw-bold">Type:</Form.Label>
          <Form.Control
            as="select"
            name="type"
            required={true}
            onChange={handleInputChange}
          >
            <option>Select type</option>
            <option value="buyer">Cutomer</option>
            <option value="seller">Seller</option>
          </Form.Control>
          {
            renderFormError('type')
          }
        </Form.Group>
        {formData && formData.type === "seller" ? (
          <>
            <Form.Group className="mb-3" controlId="formCompanyName">
              <Form.Label className="fw-bold">Company Name:</Form.Label>
              <Form.Control
                type="text"
                required={true}
                name="companyName"
                placeholder="Enter company name"
                onChange={handleInputChange}
              />
              {
            renderFormError('companyName')
          }
            </Form.Group>

            <Form.Group className="mb-3" controlId="formCompanyAddress">
              <Form.Label className="fw-bold">Company Address:</Form.Label>
              <Form.Control
                type="text"
                required={true}
                name="companyAddress"
                placeholder="Enter company address"
                onChange={handleInputChange}
              />
              {
            renderFormError('companyAddress')
          }
            </Form.Group>
          </>
        ) : null}
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
