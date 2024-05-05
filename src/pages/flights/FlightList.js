// FlightList.js

import React, { useEffect, useState, useContext } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchFlight, deleteFlight } from "../../store/flights/flightThunk";
import debounce from "lodash/debounce";

import FlightCreateForm from "../../components/FlightsComponents/Form/FlightCreateForm";
import Pagination from "../../components/FlightsComponents/Pagination/Pagination";
import FlightTable from "../../components/FlightsComponents/Table/FlightTable";
import SearchBar from "../../components/FlightsComponents/Search/SearchBar";

import { ThemeContext } from "../../Context/ThemeContext";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

import Footer from "../../components/common/Footer/Footer";
import Header from "../../components/common/Header/Header";
import Sidebar from "../../components/common/Sidebar/SideBar";

import { toast } from "react-toastify";
import Swal from "sweetalert2";

const FlightList = () => {
  const dispatch = useDispatch();
  const flights = useSelector((state) => state.flights.flights);
  const currentPage = useSelector((state) => state.flights.currentPage);
  const totalPages = useSelector((state) => state.flights.totalPages);

  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [notFound, setNotFound] = useState(false);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [flightToEdit, setFlightToEdit] = useState(null);
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
    const pageToFetch = 1; // Reset pagination to page 1 when searching
    dispatch(fetchFlight(pageToFetch, 10, searchValue));
    localStorage.setItem("currentPage", pageToFetch);
  };

  const handleCreateClick = () => {
    setShowCreateForm(true);
    setFlightToEdit(null);
  };

  const handleSearchChange = (e) => {
    const { value } = e.target;
    delayedSearch(value);
  };

  const handleEdit = (flight) => {
    setFlightToEdit(flight);
    setShowCreateForm(true);
  };

  const handleDelete = (id) => {
    // Show confirmation dialog using SweetAlert
    Swal.fire({
      title: "Are you sure?",
      text: "You will not be able to recover this flight!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          // Dispatch deleteFlight action
          await dispatch(deleteFlight(id));

          // Show success message after successful deletion
          Swal.fire(
            "Deleted!",
            "Flight has been deleted successfully.",
            "success"
          );
        } catch (error) {
          // Show error message if deletion fails
          Swal.fire(
            "Error!",
            error.message || "An error occurred while deleting the flight.",
            "error"
          );
          console.error("Error deleting flight:", error);
        }
      }
    });
  };

  useEffect(() => {
    try {
      const results = flights.filter((flight) => {
        if (!searchTerm) return true;
        return flight.code.toLowerCase().includes(searchTerm.toLowerCase());
      });
      setSearchResults(results);
      setNotFound(results.length === 0);
    } catch (error) {
      // Handle errors here
      toast.error(error || "An error occurred", {
        position: "top-left",
      });
      console.error("Error in useEffect:", error);
    }
  }, [flights, searchTerm]);

  const handleCreateSuccess = () => {
    try {
      setShowCreateForm(false); // Close modal on successful submit
    } catch (error) {
      // Handle errors here
      toast.error(error || "An error occurred", {
        position: "top-left",
      });
      console.error("Error in handleCreateSuccess:", error);
    }
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
                    <h3 className="login-heading mb-4">Flight Details Tabel</h3>
                    <button
                      className="btn btn-info mb-3 "
                      onClick={handleCreateClick}
                    >
                      <FontAwesomeIcon
                        icon={faPlus}
                        style={{ paddingLeft: "5px" }}
                      />{" "}
                      Create New Flight
                    </button>
                    <SearchBar
                      searchTerm={searchTerm}
                      handleSearchChange={handleSearchChange}
                      isDarkMode={isDarkMode}
                    />
                    <FlightTable
                      flights={searchResults}
                      handleEdit={handleEdit}
                      handleDelete={handleDelete}
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

      {/* Modal for FlightCreateForm */}
      {showCreateForm && (
        <div
          className="modal fade show"
          tabIndex="-1"
          role="dialog"
          style={{ display: "block", backgroundColor: "rgba(0, 0, 0, 0.75)" }}
        >
          <div className="modal-body">
            <FlightCreateForm
              flightToEdit={flightToEdit}
              onCancel={() => setShowCreateForm(false)}
              onCreateSuccess={handleCreateSuccess}
              isDarkMode={isDarkMode}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default FlightList;

//code formatter apply
