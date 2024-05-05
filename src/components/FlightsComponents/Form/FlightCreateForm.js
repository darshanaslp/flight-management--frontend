// FlightCreateForm.js

import React, { useState, useEffect } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchFlightPhoto,
  createFlight,
  createFlightWithPhoto,
  updateFlight,
  updateFlightWithPhoto,
} from "../../../store/flights/flightThunk";

import "./cardCreate.css";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import { Spinner } from "react-bootstrap";

const FlightCreateForm = ({ flightToEdit, onCreateSuccess, onCancel }) => {
  const dispatch = useDispatch();
  let [photoPreview, setPhotoPreview] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const flightPhoto = useSelector((state) => state.flights.flightPhoto);

  useEffect(() => {
    const fetchPhotoPreview = async () => {
      if (flightToEdit && flightToEdit.status === "ready") {
        try {
          await dispatch(fetchFlightPhoto(flightToEdit.id));
        } catch (error) {
          console.error("Error fetching flight photo:", error);
          toast.error(error || "An error occurred", {
            position: "top-left",
          });
          setError("Failed to fetch flight photo.");
        }
      }
    };

    fetchPhotoPreview();
  }, [dispatch, flightToEdit]);

  // Update photoPreview when flightPhoto changes
  useEffect(() => {
    const fetchPhotoData = async () => {
      try {
        if (flightPhoto) {
          if (flightToEdit) {
          }
          const blob = new Blob([flightPhoto], { type: "image/jpeg" });
          const imageUrl = URL.createObjectURL(blob);
          setPhotoPreview(imageUrl);
        }
      } catch (error) {
        console.error("Error processing photo data:", error);
        toast.error(error || "An error occurred", {
          position: "top-left",
        });
        setError("Failed to process flight photo data.");
      }
    };

    fetchPhotoData();
  }, [flightPhoto]);

  const initialValues = flightToEdit
    ? {
        ...flightToEdit,
        departureDate: new Date(flightToEdit.departureDate)
          .toISOString()
          .split("T")[0],
      }
    : {
        code: "",
        capacity: "",
        departureDate: "",
        photo: null,
      };

  if (!flightToEdit) {
    //photoPreview = null;
  }

  const validationSchema = Yup.object({
    code: Yup.string()
      .required("Flight code is required")
      .matches(
        /^\D{6}$/,
        "Flight code must be 6 characters and cannot contain numbers"
      ),
    capacity: Yup.number()
      .required("Capacity is required")
      .min(1, "Minimum capacity is 1")
      .max(200, "Maximum capacity is 200"),
    departureDate: Yup.date().required("Departure date is required"),
    // photo: Yup.mixed().test('fileType', 'Only image files are allowed', (value) => {
    //   if (!value) return true;
    //   return value && ['image/jpeg', 'image/png', 'image/gif'].includes(value.type);
    // }),
  });

  const handleSubmit = async (values, { setSubmitting, resetForm }) => {
    try {
      if (flightToEdit) {
        setLoading(true);

        if (values.img || values.photo) {
          const { id, img, status, ...cleanedFlightData } = values;
          await dispatch(
            updateFlightWithPhoto({
              id: flightToEdit.id,
              flightData: cleanedFlightData,
            })
          );
          // Show success message after successful deletion
          Swal.fire(
            "Flight Updated!",
            "Flight has been update successfully.",
            "success"
          );
          setLoading(false);
          // console.log('update successful');
        } else {
          const { id, img, status, ...cleanedFlightData } = values;
          await dispatch(
            updateFlight({ id: flightToEdit.id, flightData: cleanedFlightData })
          );
          // Show success message after successful deletion
          Swal.fire(
            "Flight Updated!",
            "Flight has been update successfully.",
            "success"
          );
          setLoading(false);
          // console.log('update successful');
        }
      } else {
        if (values.photo) {
          setLoading(true);
          await dispatch(createFlightWithPhoto(values));
          // Show success message after successful deletion
          Swal.fire(
            "Flight Created!",
            "Flight has been created successfully.",
            "success"
          );
          setLoading(false);
        } else {
          setLoading(true);
          const { photo, ...flightData } = values;
          await dispatch(createFlight(flightData));
          // Show success message after successful deletion
          Swal.fire(
            "Flight Created!",
            "Flight has been created successfully.",
            "success"
          );
          setLoading(false);
        }
      }
      setError("");
      resetForm();
      onCreateSuccess();
    } catch (err) {
      console.log("error", err);
      toast.error(err || "Failed to create/update flight. Please try again.", {
        position: "top-left",
      });
      setError("Failed to create/update flight. Please try again.", err);
    } finally {
      setSubmitting(false);
    }
  };

  const handleCancel = (resetForm) => {
    resetForm(null);
    onCancel();
  };

  const handleRemoveImage = () => {
    setPhotoPreview(null); // Remove the image
  };

  return (
    <div>
      {loading && <Spinner animation="border" role="status" />}{" "}
      {/* Show spinner if loading is true */}
      {/* {error && <div style={{ color: 'red' }}>{error}</div>} */}
      <div className="container">
        <div className="card float-left">
          <div className="row">
            <h2 style={{ margin: "20px" }}> Flight Details</h2>
            <Formik
              initialValues={initialValues}
              validationSchema={validationSchema}
              onSubmit={handleSubmit}
            >
              {({
                isSubmitting,
                setFieldValue,
                errors,
                touched,
                resetForm,
              }) => (
                <div className="col-sm-7">
                  <div className="card-block" style={{ margin: "20px" }}>
                    <Form>
                      <div className="form-group">
                        <label htmlFor="code">Flight Code</label>
                        <Field
                          type="text"
                          className={`form-control ${
                            errors.code && touched.code ? "is-invalid" : ""
                          }`}
                          id="code"
                          name="code"
                        />
                        <ErrorMessage
                          name="code"
                          component="div"
                          className="text-danger"
                        />
                      </div>
                      <div className="form-group">
                        <label htmlFor="capacity">Capacity</label>
                        <Field
                          type="number"
                          className={`form-control ${
                            errors.capacity && touched.capacity
                              ? "is-invalid"
                              : ""
                          }`}
                          id="capacity"
                          name="capacity"
                        />
                        <ErrorMessage
                          name="capacity"
                          component="div"
                          className="text-danger"
                        />
                      </div>
                      <div className="form-group">
                        <label htmlFor="departureDate">Departure Date</label>
                        <Field
                          type="date"
                          className={`form-control ${
                            errors.departureDate && touched.departureDate
                              ? "is-invalid"
                              : ""
                          }`}
                          id="departureDate"
                          name="departureDate"
                        />
                        <ErrorMessage
                          name="departureDate"
                          component="div"
                          className="text-danger"
                        />
                      </div>
                      <div className="form-group">
                        <label htmlFor="photo">Photo</label>
                        <input
                          type="file"
                          className="form-control-file"
                          id="photo"
                          name="photo"
                          accept="image/jpeg, image/png, image/gif"
                          onChange={(event) => {
                            const file = event.currentTarget.files[0];
                            setFieldValue("photo", file || null);
                            setPhotoPreview(URL.createObjectURL(file));
                            if (file) {
                              setPhotoPreview(URL.createObjectURL(file));
                            } else {
                              setPhotoPreview(null);
                            }
                          }}
                        />
                        <ErrorMessage
                          name="photo"
                          component="div"
                          className="text-danger"
                        />
                      </div>
                      <div>
                        <div></div>
                        <div>
                          <button
                            type="submit"
                            style={{ margin: "20px", width: "130px" }}
                            className="btn btn-primary btn-lg"
                            disabled={isSubmitting}
                          >
                            {isSubmitting ? "Submitting..." : "Submit"}
                          </button>
                          <button
                            type="button"
                            style={{ margin: "10px", width: "130px" }}
                            className="btn btn-secondary btn-lg ml-2"
                            onClick={() => handleCancel(resetForm)}
                          >
                            Cancel
                          </button>
                        </div>
                      </div>
                    </Form>
                  </div>
                </div>
              )}
            </Formik>

            <div className="col-sm-5">
              {photoPreview && (
                <div>
                  <h3>Preview</h3>
                  <img
                    src={photoPreview}
                    alt="Flight Preview"
                    style={{
                      maxHeight: "220px",
                      overflow: "hidden",
                      borderRadius: "10px",
                    }}
                  />
                  <button
                    type="button"
                    className="btn btn-danger mt-2"
                    onClick={handleRemoveImage}
                    style={{ margin: "20px" }}
                  >
                    Remove Image
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FlightCreateForm;
