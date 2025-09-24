import { useState } from "react";
import Logo from "./logo.svg";
import { Link } from "react-router-dom";
import { logoutAction } from "../../redux/slices/users/usersSlice";
import { useDispatch } from "react-redux";
import NotificationDropdown from "../Notifications/NotficationDropdown";

const Navbar = () => {
  const dispatch = useDispatch();
  // get login user from local storage
  const user = JSON.parse(localStorage.getItem("userInfo"));
  const isLoggedIn = user?.token ? true : false;
  const logoutHandler = () => {
    dispatch(logoutAction());
    window.location.reload();
  };
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav style={{ backgroundColor: "#d397fa" }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center">
            <a href="/" className="flex items-center">
              <img src={Logo} alt="Kitchen Ledger Logo" className="h-8 w-8" />
              <span className="text-white ml-2 font-bold">Kitchen Ledger</span>
            </a>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex space-x-4">
            <Link
              to="/"
              className="text-black-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
            >
              Home
            </Link>
            <Link
              to="/about"
              className="text-black-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
            >
              About
            </Link>

            {isLoggedIn && (
              <>
                {/* Notification Dropdown */}
                <NotificationDropdown />

                <button
                  className="text-black-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                  onClick={logoutHandler}
                >
                  Logout
                </button>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-black-300 hover:text-white focus:outline-none focus:text-white"
            >
              <svg
                className="h-6 w-6"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {isOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden">
          <Link
            to="/"
            className="block px-4 py-2 text-black-300 hover:text-white hover:bg-gray-700"
          >
            Home
          </Link>
          <Link
            to="/about"
            className="block px-4 py-2 text-black-300 hover:text-white hover:bg-gray-700"
          >
            About
          </Link>
          {isLoggedIn && (
            <div className="block px-4 py-2 text-black-300 hover:text-white hover:bg-gray-700">
              <button onClick={logoutHandler}>Logout</button>
            </div>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
