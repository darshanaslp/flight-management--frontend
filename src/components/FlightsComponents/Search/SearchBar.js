import React from "react";

const SearchBar = ({ searchTerm, handleSearchChange, isDarkMode }) => {
  const searchStyle = {
    backgroundColor: isDarkMode ? "black" : "white",
    color: isDarkMode ? "white" : "black",
  };

  return (
    <div className="row">
      <div className="col-lg-12 card-margin">
        <div className="card search-form">
          <div className="card-body p-0">
            <form id="search-form">
              <div className="row">
                <div className="col-12">
                  <div className="col-lg-12 col-md-6 col-sm-12 p-0">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Search by code..."
                      value={searchTerm}
                      onChange={handleSearchChange}
                      style={searchStyle}
                    />
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchBar;
