import React from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
const LoginPage = () => {
  const initialValues = {
    email: "",
    password: "",
  };
  const navigate = useNavigate();

  const validation = Yup.object({
    email: Yup.string().email().required("Please enter your email"),
    password: Yup.string().min(6).required("Please enter your password"),
  });
  const { values, handleChange, handleSubmit, errors, touched } = useFormik({
    initialValues,
    validationSchema: validation,
    onSubmit: async (values, action) => {
      try {
        const res = await axios.post(
          "https://be-assignement.vercel.app/login",
          values
        );
        alert(res.data.message);
        localStorage.setItem("jwt", res.data.data.jwt);
        navigate("/home");
      } catch (error) {
        alert(error.response.data.message);
      }
    },
  });
  return (
    <div>
      <div className="container mt-5 pt-5">
        <div className="row justify-content-center m-4">
          <div className="col-lg-4 col-md-8 col-sm-12 col-xs-12 order-md-2 pb-4 box">
            <h1 className="heading">Log In</h1>
            <div className="row justify-content-center">
              <form method="POST" className="col-10" onSubmit={handleSubmit}>
                <div className="form-group pb-3">
                  <input
                    type="email"
                    className="form-control"
                    placeholder="Email"
                    name="email"
                    value={values.email}
                    onChange={handleChange}
                  />
                  {errors.email && touched.email ? (
                    <p className="form-error">{errors.email}</p>
                  ) : null}
                </div>
                <div className="form-group">
                  <input
                    type="password"
                    className="form-control"
                    placeholder="Password"
                    name="password"
                    value={values.password}
                    onChange={handleChange}
                  />
                  {errors.password && touched.password ? (
                    <p className="form-error">{errors.password}</p>
                  ) : null}
                </div>
                <div className="text-center">
                  <button type="submit" className="primary_btn mt-3 mb-3">
                    Log In
                  </button>
                </div>
              </form>
              <div className="text-center">
                <Link className="link" to="/register">
                  New values! Sign Up
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
