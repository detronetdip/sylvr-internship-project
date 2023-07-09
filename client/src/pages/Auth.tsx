/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { useFormik } from "formik";
import { useState } from "react";
import { object, string } from "yup";
import axiosInstance from "../utility/axios";
import { server } from "../utility/constant";
import { TOAST } from "../utility/toast";
import { useSetRecoilState } from "recoil";
import { userState } from "../context";
import { useNavigate } from "react-router-dom";

function Auth() {
  const [form, setForm] = useState(0);
  const setUser = useSetRecoilState(userState);
  const location = useNavigate();
  const registrationValidationSchema = object({
    email: string()
      .email("Invalid email address.")
      .required("Email is required."),
    firstName: string().required("Firstname is required."),
    lastName: string().required("Lastname is required."),
    password: string().required("Password is required."),
  });
  const loginValidationSchema = object({
    email: string()
      .email("Invalid email address.")
      .required("Email is required."),
    password: string().required("Password is required."),
  });
  const handelSubmitregistration = async (values: {
    email: string;
    firstName: string;
    lastName: string;
    password: string;
  }) => {
    try {
      const { data } = await axiosInstance.post(
        `${server}/auth/register`,
        values
      );
      if (data.error == null) {
        TOAST.SUCCESS("Registered successfully!");
        setForm(0);
        return;
      }
    } catch (error: any) {
      TOAST.ERROR(error.response.data.error.message);
    }
  };

  const handelSubmitLogin = async (values: {
    email: string;
    password: string;
  }) => {
    try {
      const { data } = await axiosInstance.post(`${server}/auth/login`, values);
      if (data.error == null) {
        TOAST.SUCCESS("Login successfully!");
        localStorage.setItem("accessToken", data.data.accessToken);
        localStorage.setItem("refreshToken", data.data.refreshToken);
        setUser((old) => {
          return {
            ...old,
            isLoggedIn: true,
          };
        });
        location("/");
        return;
      }
    } catch (error: any) {
      TOAST.ERROR(error.response.data.error.message);
    }
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

  const loginForm = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: loginValidationSchema,
    onSubmit: handelSubmitLogin,
  });

  return (
    <>
      <div className="auth-container">
        <div className="container">
          {form == 0 ? (
            <>
              <h2>Login</h2>
              <form>
                <input
                  type="email"
                  placeholder="Enter your email"
                  onChange={loginForm.handleChange}
                  value={loginForm.values.email}
                  name="email"
                />
                <span className="error">
                  {loginForm.touched.email && loginForm.errors.email}
                </span>
                <input
                  type="text"
                  placeholder="Enter password"
                  onChange={loginForm.handleChange}
                  value={loginForm.values.password}
                  name="password"
                />
                <span className="error">
                  {loginForm.touched.password && loginForm.errors.password}
                </span>
                <button type="button" onClick={() => loginForm.handleSubmit()}>
                  SIGN IN
                </button>
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
