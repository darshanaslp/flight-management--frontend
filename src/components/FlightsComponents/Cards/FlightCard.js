// FlightCard.js

import React from "react";
import "./card.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faDownload,
  faPlaneDeparture,
  faUsers,
  faImage,
  faPlane,
} from "@fortawesome/free-solid-svg-icons";

const FlightCard = ({ flights, isDarkMode }) => {
  const cardStyle = {
    backgroundColor: isDarkMode ? "black" : "white",
  };

  const handleDownloadImage = (imageUrl) => {
    // Create an anchor element
    const anchor = document.createElement("a");
    anchor.href = imageUrl;
    anchor.download = "flight_image.jpg";
    anchor.click();
  };

  return (
    <div>
      <div className="section_our_solution">
        <div className="row">
          {flights.map((flight) => (
            <div className="col-lg-6 col-md-12 col-sm-12" key={flight.id}>
              <div className="our_solution_category">
                <div className="solution_cards_box">
                  <div className="solution_card" style={cardStyle}>
                    <div className="hover_color_bubble"></div>
                    <div className="solu_title">
                      <h3>
                        <FontAwesomeIcon
                          icon={faPlane}
                          style={{ paddingRight: "10" }}
                        />{" "}
                        {flight.code}
                      </h3>
                    </div>
                    <div className="solu_image">
                      {flight.status === "ready" && (
                        <img
                          src={flight.img}
                          style={{
                            maxHeight: "150px",
                            overflow: "hidden",
                            borderRadius: "10px",
                          }}
                          alt="thumbnail"
                        />
                      )}
                      {flight.status === "processing" && (
                        <img
                          src="../../../../public/processing.jpg"
                          style={{
                            maxHeight: "150px",
                            overflow: "hidden",
                            borderRadius: "10px",
                          }}
                          alt="thumbnail"
                        />
                      )}
                    </div>
                    <div className="solu_description">
                      <p>
                        <FontAwesomeIcon
                          icon={faUsers}
                          style={{ paddingRight: "10" }}
                        />{" "}
                        capacity: {flight.capacity}
                      </p>
                      <p>
                        <FontAwesomeIcon
                          icon={faPlaneDeparture}
                          style={{ paddingRight: "10" }}
                        />{" "}
                        Departure Date: {flight.departureDate}
                      </p>
                      <p>
                        <FontAwesomeIcon
                          icon={faImage}
                          style={{ paddingRight: "10" }}
                        />{" "}
                        status: {flight.status}
                      </p>
                      {flight.status === "ready" && (
                        <button
                          type="button"
                          className="read_more_btn"
                          onClick={() => handleDownloadImage(flight.img)}
                        >
                          <FontAwesomeIcon
                            icon={faDownload}
                            style={{ paddingRight: "10" }}
                          />
                          Download Image
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FlightCard;
