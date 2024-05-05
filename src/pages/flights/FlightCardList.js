import React, { useEffect, useState, useContext } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchFlight } from "../../store/flights/flightThunk";
import { getFightPhoto } from "../../services/flight/flightService";
import debounce from "lodash/debounce";

import Pagination from "../../components/FlightsComponents/Pagination/Pagination";
import FlightCard from "../../components/FlightsComponents/Cards/FlightCard";
import SearchBar from "../../components/FlightsComponents/Search/SearchBar";

import { ThemeContext } from "../../Context/ThemeContext";

import Footer from "../../components/common/Footer/Footer";
import Header from "../../components/common/Header/Header";
import Sidebar from "../../components/common/Sidebar/SideBar";

import { toast } from "react-toastify";

const FlightCardList = () => {
  const dispatch = useDispatch();
  const flights = useSelector((state) => state.flights.flights);
  const currentPage = useSelector((state) => state.flights.currentPage);
  const totalPages = useSelector((state) => state.flights.totalPages);

  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [notFound, setNotFound] = useState(false);
  const { isDarkMode } = useContext(ThemeContext);

  useEffect(() => {
    const storedPage = localStorage.getItem("currentPage");
    const pageToFetch = storedPage ? parseInt(storedPage) : 1;
    dispatch(fetchFlight(pageToFetch, 10));
  }, [dispatch]);

  const handlePaginationClick = (page) => {
    dispatch(fetchFlight(page, 10));
    localStorage.setItem("currentPage", page);
  };

  const delayedSearch = debounce((searchValue) => {
    setSearchTerm(searchValue);
    updateUrlAndFetch(searchValue);
  }, 100);

  const updateUrlAndFetch = (searchValue) => {
    const pageToFetch = 1;
    dispatch(fetchFlight(pageToFetch, 10, searchValue));
    localStorage.setItem("currentPage", pageToFetch);
  };

  const fetchFlightPhotos = async () => {
    const updatedFlights = [];
    for (const flight of flights) {
      try {
        const blobData = await getFightPhoto(flight.id);
        const imgUrl = URL.createObjectURL(blobData);
        const updatedFlight = { ...flight, img: imgUrl };
        updatedFlights.push(updatedFlight);
      } catch (error) {
        toast.error(error || "An error occurred", {
          position: "top-left",
        });
        console.error("Error fetching flight photo:", error);
      }
    }
    // Apply search filter again after updating flights
    const filteredResults = updatedFlights.filter((flight) => {
      if (!searchTerm) return true;
      return flight.code.toLowerCase().includes(searchTerm.toLowerCase());
    });
    setSearchResults(filteredResults);
    setNotFound(filteredResults.length === 0);
  };

  useEffect(() => {
    fetchFlightPhotos();
  }, [flights]);

  const handleSearchChange = (e) => {
    const { value } = e.target;
    delayedSearch(value);
  };

  return (
    <div>
      <Header />
      <div className="container-fluid">
        <div className="row">
          <Sidebar isDarkMode={isDarkMode} />
          <main className="col-md-9 ms-sm-auto col-lg-10 px-md-4">
            <div className="login d-flex align-items-center py-5">
              <div className="container">
                <div className="row">
                  <div className="col-md-9 col-lg-8 mx-auto">
                    <h3 className="login-heading mb-4">
                      Flight Details Card List
                    </h3>
                    <SearchBar
                      searchTerm={searchTerm}
                      handleSearchChange={handleSearchChange}
                      isDarkMode={isDarkMode}
                    />
                    <FlightCard
                      flights={searchResults}
                      isDarkMode={isDarkMode}
                    />
                    {notFound && (
                      <div className="alert alert-warning">
                        No flights found
                      </div>
                    )}
                    <Pagination
                      totalPages={totalPages}
                      currentPage={currentPage}
                      handlePaginationClick={handlePaginationClick}
                      isDarkMode={isDarkMode}
                    />
                  </div>
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
      <Footer isDarkMode={isDarkMode} />
    </div>
  );
};

export default FlightCardList;
