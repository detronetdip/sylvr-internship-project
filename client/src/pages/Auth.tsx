import { useFormik } from "formik";
import { useState } from "react";
import { object, string } from "yup";
import axiosInstance from "../utility/axios";
import { server } from "../utility/constant";

function Auth() {
  const [form, setForm] = useState(0);
  const registrationValidationSchema = object({
    email: string()
      .email("Invalid email address.")
      .required("Email is required."),
    firstName: string().required("Firstname is required."),
    lastName: string().required("Lastname is required."),
    password: string().required("Password is required."),
  });
  const handelSubmitregistration = async (data: {
    email: string;
    firstName: string;
    lastName: string;
    password: string;
  }) => {
    const res=await axiosInstance.post(`${server}/auth/register`,data);
    console.log(res);
  };
  const registrationForm = useFormik({
    initialValues: {
      email: "",
      firstName: "",
      lastName: "",
      password: "",
    },
    validationSchema: registrationValidationSchema,
    onSubmit: handelSubmitregistration,
  });

  return (
    <>
      <div className="auth-container">
        <div className="container">
          {form == 0 ? (
            <>
              <h2>Login</h2>
              <form>
                <input type="text" placeholder="Enter email address" />
                <input type="password" placeholder="Password" />
                <button>SIGN IN</button>
              </form>
              <h6 onClick={() => setForm(1)}>Create New Account</h6>
            </>
          ) : (
            <>
              <h2>Registration</h2>
              <form>
                <input
                  type="email"
                  placeholder="Enter your email"
                  onChange={registrationForm.handleChange}
                  value={registrationForm.values.email}
                  name="email"
                />
                <span className="error">
                  {registrationForm.touched.email &&
                    registrationForm.errors.email}
                </span>
                <input
                  type="text"
                  placeholder="Enter first name"
                  onChange={registrationForm.handleChange}
                  value={registrationForm.values.firstName}
                  name="firstName"
                />
                <span className="error">
                  {registrationForm.touched.firstName &&
                    registrationForm.errors.firstName}
                </span>
                <input
                  type="text"
                  placeholder="Enter last name"
                  onChange={registrationForm.handleChange}
                  value={registrationForm.values.lastName}
                  name="lastName"
                />
                <span className="error">
                  {registrationForm.touched.lastName &&
                    registrationForm.errors.lastName}
                </span>
                <input
                  type="text"
                  placeholder="Enter password"
                  onChange={registrationForm.handleChange}
                  value={registrationForm.values.password}
                  name="password"
                />
                <span className="error">
                  {registrationForm.touched.password &&
                    registrationForm.errors.password}
                </span>
                <button
                  onClick={() => registrationForm.handleSubmit()}
                  type="button"
                >
                  Register
                </button>
              </form>
              <h6 onClick={() => setForm(0)}>
                Already have an account? Sign in
              </h6>
            </>
          )}
        </div>
      </div>
    </>
  );
}

export default Auth;
