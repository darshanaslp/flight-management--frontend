// sideBar.js

import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlane ,faPlaneCircleCheck } from '@fortawesome/free-solid-svg-icons';

const Sidebar = ({ isDarkMode }) => {
  const sidebarStyle = {
    backgroundColor: isDarkMode ? 'black' : '#0dcaf024',
  };

  return (
    <nav id="sidebarMenu" className="col-md-3 col-lg-2 d-md-block sidebar isDarkMode collapse" style={sidebarStyle}>
    <nav className="col-md-12 d-none d-md-block bg-light sidebar pb-3 mt-3">
      <div className="sidebar-sticky">
        <ul className="nav flex-column ">
          <li className="nav-item pb-3 mt-3">
          <Link to="/flights" className="nav-link" aria-current="page">
              <FontAwesomeIcon icon={faPlaneCircleCheck} /> Flight Table <span className="sr-only">(current)</span>
            </Link>
          </li>
          <hr/>
          <li className="nav-item">
          <Link to="/flights-cards" className="nav-link">
              <FontAwesomeIcon icon={faPlane} /> Flight Cards
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  </nav>
    // <nav id="sidebarMenu" className="col-md-3 col-lg-2 d-md-block sidebar collapse" style={sidebarStyle}>
    //   <div className="position-sticky">
    //     <ul className="nav nav-pills flex-column mb-auto">
    //       <li className="nav-item">
    //         <Link to="/flights" className="nav-link" aria-current="page">
    //           <svg className="bi me-2" width="16" height="16"><use xlinkHref="#home"></use></svg>
    //           Flight Table
    //         </Link>
    //       </li>
    //       <li className="nav-item">
    //         <Link to="/flights-cards" className="nav-link">
    //           <svg className="bi me-2" width="16" height="16"><use xlinkHref="#speedometer2"></use></svg>
    //           Flight Cards
    //         </Link>
    //       </li>
    //     </ul>
    //   </div>
    // </nav>
  );
};

export default Sidebar;