import React from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";
import {
  validateEmail,
  validatePassword,
  validatePhoneNo,
  validateUserName,
  validateConfirmpassword,
  validateDateofbirth,
} from "../utils/Fieldvalidation";
const RegisterPage = () => {
  const navigate = useNavigate();
  const validate = (values) => {
    let errors = {};
    let { name, email, password, phone, confirm_password, date_of_birth } =
      values;
    const errorName = validateUserName(name);
    const errorsEmail = validateEmail(email);
    const errorsPassword = validatePassword(password);
    const errorsConfirmPassword = validateConfirmpassword(confirm_password);
    const errorsDate_of_birth = validateDateofbirth(date_of_birth);
    const errorsPhone = validatePhoneNo(phone);
    if (errorName) errors.name = errorName;
    if (errorsEmail) errors.email = errorsEmail;
    if (errorsPassword) errors.password = errorsPassword;
    if (errorsConfirmPassword) errors.confirm_password = errorsConfirmPassword;
    if (errorsPhone) errors.phone = errorsPhone;
    if (errorsDate_of_birth) errors.date_of_birth = errorsDate_of_birth;
    return errors;
  };
  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      phone: "",
      date_of_birth: "",
      password: "",
      confirm_password: "",
    },
    validate,
    onSubmit: async (values, action) => {
      try {
        const res = await axios.post(
          "https://be-assignement.vercel.app/register",
          values
        );
        alert(res.data.message);
        localStorage.setItem("jwt", res.data.data.jwt);
        navigate("/home");
        action.resetForm();
      } catch (error) {
        alert(error.response.data.message);
      }
    },
  });

  return (
    <>
      <div className="container mt-5 pt-3">
        <div className="row justify-content-center m-5">
          <div className="col-lg-4 col-md-8 col-sm-12 col-xs-12 order-md-2 pb-4 box">
            <h1 className="heading">Sign Up</h1>
            <div className="row justify-content-center">
              <form
                method="POST"
                className="col-10"
                onSubmit={formik.handleSubmit}
              >
                <div className="form-group mb">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Name"
                    name="name"
                    value={formik.values.name}
                    onChange={formik.handleChange}
                  />
                  {formik.errors.name ? (
                    <div style={{ color: "red" }}>{formik.errors.name}</div>
                  ) : null}
                </div>
                <div className="form-group mb">
                  <input
                    type="email"
                    className="form-control"
                    placeholder="Email"
                    name="email"
                    value={formik.values.email}
                    onChange={formik.handleChange}
                  />
                  {formik.errors.email ? (
                    <div style={{ color: "red" }}>{formik.errors.email}</div>
                  ) : null}
                </div>
                <div className="form-group mb">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Phone Number"
                    name="phone"
                    value={formik.values.phone}
                    onChange={formik.handleChange}
                  />
                  {formik.errors.phone ? (
                    <div style={{ color: "red" }}>{formik.errors.phone}</div>
                  ) : null}
                </div>
                <div className="form-group mb">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Date Of Birth"
                    name="date_of_birth"
                    value={formik.values.date_of_birth}
                    onChange={formik.handleChange}
                  />
                  {formik.errors.date_of_birth ? (
                    <div style={{ color: "red" }}>
                      {formik.errors.date_of_birth}
                    </div>
                  ) : null}
                </div>

                <div className="form-group mb">
                  <input
                    type="password"
                    className="form-control"
                    placeholder="Password"
                    name="password"
                    value={formik.values.password}
                    onChange={formik.handleChange}
                  />
                  {formik.errors.password ? (
                    <div style={{ color: "red" }}>{formik.errors.password}</div>
                  ) : null}
                </div>
                <input
                  type="password"
                  className="form-control mb"
                  placeholder="Confirm Password"
                  name="confirm_password"
                  value={formik.values.confirm_password}
                  onChange={formik.handleChange}
                />
                {formik.errors.confirm_password ? (
                  <div style={{ color: "red" }}>
                    {formik.errors.confirm_password}
                  </div>
                ) : null}
                <div className="text-center">
                  <button type="submit" className="primary_btn">
                    Sign Up
                  </button>
                </div>
              </form>
              <div className="text-center mt-2">
                <Link className="link" to="/">
                  LogIn
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default RegisterPage;
