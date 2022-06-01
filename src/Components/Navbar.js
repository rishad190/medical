import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../App";

const Navbar = () => {
  const [user, setUser] = useContext(UserContext);
  const handleSignout = () => {
    const newUserInfo = { ...user };
    newUserInfo.error = "";
    newUserInfo.success = false;
    newUserInfo.email = "";
    setUser(newUserInfo);
  };
  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-light bg-primary">
        <div className="container-fluid">
          <Link className="navbar-brand text-white" to="/">
            Medical
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div
            className="collapse navbar-collapse justify-content-end"
            id="navbarNav"
          >
            <ul className="navbar-nav">
              <li className="nav-item">
                <Link
                  className="nav-link active text-white"
                  aria-current="page"
                  to="/"
                >
                  Home
                </Link>
              </li>

              <li className="nav-item">
                <Link className="nav-link text-white" to="/dashboard">
                  Dashboard
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link text-white" to="/live">
                  Live Data
                </Link>
              </li>
              {user.success ? (
                <li className="nav-item">
                  <button
                    onClick={handleSignout}
                    className="nav-link text-white bg-primary border-0 "
                  >
                    Log Out
                  </button>
                </li>
              ) : (
                <li className="nav-item">
                  <Link className="nav-link text-white" to="/login">
                    Login
                  </Link>
                </li>
              )}
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
