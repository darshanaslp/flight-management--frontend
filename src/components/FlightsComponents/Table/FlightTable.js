// FlightTable.js

import React from "react";
import "./tabel.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";

const FlightTable = ({ flights, handleEdit, handleDelete, isDarkMode }) => {
  const textStyle = {
    color: isDarkMode ? "white" : "#3c4142",
  };

  const tdStyle = {
    backgroundColor: isDarkMode ? "#000" : "#fff",
    color: isDarkMode ? "white" : "#3c4142",
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-12">
          <div className="card card-margin">
            <div className="card-body">
              <div className="row search-body">
                <div className="col-lg-12">
                  <div className="search-result">
                    <div className="result-body">
                      <div className="table-responsive">
                        <table className="table widget-26 ">
                          <tbody>
                            <tr>
                              <th style={tdStyle}>Code</th>
                              <th style={tdStyle}>Capacity</th>
                              <th style={tdStyle}>Departure Date</th>
                              <th colSpan={2} style={tdStyle}>
                                Actions
                              </th>
                            </tr>
                            {flights.map((flight) => (
                              <tr key={flight.id}>
                                <td style={tdStyle}>
                                  <div className="widget-26-job-title">
                                    <p className="m-0" style={textStyle}>
                                      {flight.code}
                                    </p>
                                  </div>
                                </td>
                                <td style={tdStyle}>
                                  <div className="widget-26-job-info">
                                    <p className="type m-0" style={textStyle}>
                                      {flight.capacity}
                                    </p>
                                  </div>
                                </td>
                                <td style={tdStyle}>
                                  <div
                                    className="widget-26-job-salary"
                                    style={textStyle}
                                  >
                                    {flight.departureDate}
                                  </div>
                                </td>
                                <td style={tdStyle}>
                                  <button
                                    onClick={() => handleEdit(flight)}
                                    className="widget-26-job-category bg-soft-success"
                                    style={textStyle}
                                  >
                                    <i className="indicator bg-success"></i>
                                    <FontAwesomeIcon
                                      icon={faEdit}
                                      style={{ paddingLeft: "2px" }}
                                    />
                                    <span>Edit</span>
                                  </button>
                                </td>
                                <td style={tdStyle}>
                                  <button
                                    onClick={() => handleDelete(flight.id)}
                                    className="widget-26-job-category bg-soft-danger"
                                    style={textStyle}
                                  >
                                    <i className="indicator bg-danger"></i>
                                    <FontAwesomeIcon
                                      icon={faTrash}
                                      style={{ paddingLeft: "2px" }}
                                    />
                                    <span>Delete</span>
                                  </button>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FlightTable;
