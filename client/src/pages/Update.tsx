/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-floating-promises */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { useEffect, useState } from "react";
import { server } from "../utility/constant";
import axiosInstance from "../utility/axios";
import { object, string } from "yup";
import { useFormik } from "formik";
import { useSetRecoilState } from "recoil";
import { userState } from "../context";
import { TOAST } from "../utility/toast";
import { useNavigate } from "react-router-dom";

function Update() {
  const setUser = useSetRecoilState(userState);
  const location = useNavigate();
  const [basicDetails, setBasicDetails] = useState({
    firstName: "",
    lastName: "",
    email: "",
  });
  useEffect(() => {
    const getData = async () => {
      const { data } = await axiosInstance.get(server + "/user");

      const { firstName, lastName, email } = data.data;
      setBasicDetails((old) => {
        return {
          ...old,
          firstName,
          lastName,
          email,
        };
      });
    };
    getData();
  }, []);

  const profileValidationSchema = object({
    firstName: string().required("First name is required."),
    lastName: string().required("Last name is required."),
    email: string().required("Email is required.").email("Valid email reuired"),
  });
  const updatePersonalDetails = async (values: {
    firstName: string;
    lastName: string;
    email: string;
  }) => {
    const updatedData = {
      firstName: values.firstName || basicDetails.firstName,
      lastName: values.lastName || basicDetails.lastName,
      email: values.email || basicDetails.email,
    };

    try {
      const { data } = await axiosInstance.patch(`${server}/user`, updatedData);
      setUser((old) => {
        return {
          ...old,
          firstName: data.data.firstName,
          lastName: data.data.lastName,
          email: data.data.email,
        };
      });
      TOAST.SUCCESS("Updated successfull");
      location("/");
    } catch (error: any) {
      TOAST.ERROR("Something went wrong");
    }
  };

  const personalDetails = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      email: "",
    },
    validationSchema: profileValidationSchema,
    onSubmit: updatePersonalDetails,
  });

  useEffect(() => {
    personalDetails.values.firstName = basicDetails.firstName;
    personalDetails.values.lastName = basicDetails.lastName;
    personalDetails.values.email = basicDetails.email;
  }, [basicDetails]);

  return (
    <>
      <div className="update-container">
        <div className="container">
          <h1>Update Profile</h1>
          <form>
            <input
              id="firstName"
              type="text"
              placeholder="Enter first name"
              value={personalDetails.values.firstName}
              onChange={personalDetails.handleChange}
            />
            <span className="error">
              {personalDetails.touched.firstName &&
                personalDetails.errors.firstName}
            </span>
            <input
              type="text"
              id="lastName"
              placeholder="Enter last name"
              value={personalDetails.values.lastName}
              onChange={personalDetails.handleChange}
            />
            <span className="error">
              {personalDetails.touched.lastName &&
                personalDetails.errors.lastName}
            </span>
            <input
              type="email"
              id="email"
              placeholder="Enter email"
              value={personalDetails.values.email}
              onChange={personalDetails.handleChange}
            />
            {personalDetails.touched.email && personalDetails.errors.email}
            <button
              type="button"
              onClick={() => personalDetails.handleSubmit()}
            >
              Update
            </button>
          </form>
        </div>
      </div>
    </>
  );
}

export default Update;
