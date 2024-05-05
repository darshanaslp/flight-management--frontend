// Login.js

import React, { useEffect, useRef } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { loginUser } from "../../store/users/userThunk";
import { toast } from "react-toastify";

import "./Login.css";
const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const error = useSelector((state) => state.auth.error);
  const loginErrorDisplayed = useRef(false);

  const initialValues = {
    email: "",
    password: "",
  };

  const validationSchema = Yup.object({
    email: Yup.string().email("Invalid email address").required("Required"),
    password: Yup.string().required("Required"),
  });

  const handleSubmit = async (values, { setSubmitting, setLoginError }) => {
    setSubmitting(true);
    try {
      await dispatch(loginUser(values));
      navigate("/flights");
    } catch (error) {
      console.error("Login failed:", error);
      setLoginError(error.message || "An error occurred");
    } finally {
      setSubmitting(false);
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      console.log("Login successful");
    } else if (error && !loginErrorDisplayed.current) {
      console.log("Login error");
      toast.error(error || "An error occurred", {
        position: "top-left",
      });
      loginErrorDisplayed.current = true;
    }
  }, []);

  return (
    <div className="container-fluid ps-md-0">
      <div className="row g-0">
        <div className="d-none d-md-flex col-md-4 col-lg-6 bg-image"></div>
        <div className="col-md-8 col-lg-6">
          <div className="login d-flex align-items-center py-5">
            <div className="container">
              <div className="row">
                <div className="col-md-9 col-lg-8 mx-auto">
                  <h3 className="login-heading mb-4">Fight Details App</h3>

                  {/* Formik Form */}
                  <Formik
                    initialValues={initialValues}
                    validationSchema={validationSchema}
                    onSubmit={handleSubmit}
                  >
                    {({ isSubmitting, touched, errors }) => (
                      <Form>
                        <div className="form-floating mb-3">
                          <Field
                            type="email"
                            id="email"
                            name="email"
                            placeholder="name@example.com"
                            className={`form-control ${
                              touched.email && errors.email ? "is-invalid" : ""
                            }`}
                          />
                          <label htmlFor="email">Email address</label>
                          {touched.email && errors.email ? (
                            <div className="invalid-feedback">
                              {errors.email}
                            </div>
                          ) : null}
                        </div>
                        <div className="form-floating mb-3">
                          <Field
                            type="password"
                            id="password"
                            name="password"
                            placeholder="Password"
                            className={`form-control ${
                              touched.password && errors.password
                                ? "is-invalid"
                                : ""
                            }`}
                          />
                          <label htmlFor="password">Password</label>
                          {touched.password && errors.password ? (
                            <div className="invalid-feedback">
                              {errors.password}
                            </div>
                          ) : null}
                        </div>
                        <div className="d-grid">
                          <button
                            type="submit"
                            disabled={isSubmitting}
                            className="btn btn-lg btn-primary btn-login text-uppercase fw-bold mb-2"
                          >
                            {isSubmitting ? "Login..." : "Sign in"}
                          </button>
                          <div className="text-center">
                            <Link to="/register" className="small">
                              New user? Register here
                            </Link>
                          </div>
                        </div>
                      </Form>
                    )}
                  </Formik>
                  {/* End of Formik Form */}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Login;
