// Register.js

import React from "react";
import { useNavigate, Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { registerUser } from "../../store/users/userThunk";

const Register = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const initialValues = {
    name: "",
    email: "",
    password: "",
  };

  const validationSchema = Yup.object({
    name: Yup.string().required("Required"),
    email: Yup.string().email("Invalid email address").required("Required"),
    password: Yup.string().required("Required"),
  });

  const onSubmit = async (values, { setSubmitting }) => {
    try {
      await dispatch(registerUser(values));
      setSubmitting(false);
      // Navigate to login page after successful registration
      navigate("/login");
    } catch (error) {
      console.error("Registration failed:", error);
      setSubmitting(false);
      // Handle registration error
    }
  };

  return (
    <div className="container-fluid ps-md-0">
      <div className="row g-0">
        <div className="d-none d-md-flex col-md-4 col-lg-6 bg-image"></div>
        <div className="col-md-8 col-lg-6">
          <div className="login d-flex align-items-center py-5">
            <div className="container">
              <div className="row">
                <div className="col-md-9 col-lg-8 mx-auto">
                  <h3 className="login-heading mb-4">Register New User</h3>

                  {/* Formik Form */}
                  <Formik
                    initialValues={initialValues}
                    validationSchema={validationSchema}
                    onSubmit={onSubmit}
                  >
                    {({ isSubmitting, touched, errors }) => (
                      <Form>
                        <div className="form-floating mb-3">
                          <Field
                            type="text"
                            id="name"
                            name="name"
                            placeholder="Full Name"
                            className={`form-control ${
                              touched.name && errors.name ? "is-invalid" : ""
                            }`}
                          />
                          <label htmlFor="email">Full Name</label>
                          {touched.name && errors.name ? (
                            <div className="invalid-feedback">
                              {errors.name}
                            </div>
                          ) : null}
                        </div>
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
                            {isSubmitting ? "Creating..." : "Sign Up"}
                          </button>
                          <div className="text-center">
                            <Link to="/login" className="small">
                              Already Register Login
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

export default Register;
