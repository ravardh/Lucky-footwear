import { Link, useNavigate } from "react-router-dom";
import { FaShoppingCart, FaUser } from "react-icons/fa";
import { useAuth } from "../context/authContext";

const Navbar = () => {
  const navigate = useNavigate();
  const { user, isLogin, isAdmin } = useAuth();

  // const handelClick = (e) => {
  //   if (isLogin) {
  //     if (isAdmin) {
  //       navigate("/adminDashboard");
  //     } else {
  //       navigate("/account");
  //     }
  //   } else {
  //     navigate("/login");
  //   }
  // };

  return (
    <nav className="bg-primary-content shadow-md sticky top-0 z-999">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center">
              <span className="text-2xl font-bold text-surface-900">
                Lucky Footwear
              </span>
            </Link>
          </div>

          <div className="hidden md:flex items-center space-x-8">
            <Link to="/" className="text-surface-700 hover:text-primary">
              Home
            </Link>
            <Link to="/men" className="text-surface-700 hover:text-primary">
              Men
            </Link>
            <Link to="/women" className="text-surface-700 hover:text-primary">
              Women
            </Link>
            <Link to="/kids" className="text-surface-700 hover:text-primary">
              Kids
            </Link>
            <Link to="/sale" className="text-surface-700 hover:text-primary">
              Sale
            </Link>
          </div>

          <div className="flex items-center space-x-4">
            <Link to="/cart" className="text-surface-700 hover:text-primary">
              <FaShoppingCart className="h-6 w-6" />
            </Link>
            <button
              className={
                isLogin
                  ? "flex gap-2 p-1 justify-center items-center hover:text-primary"
                  : "flex gap-2 p-2 justify-center items-center hover:text-primary"
              }
              onClick={() => {
                isLogin
                  ? isAdmin
                    ? navigate("/adminDashboard")
                    : navigate("/account")
                  : navigate("/login");
              }}
            >
              {isLogin ? (
                <img
                  src={user.profilePic}
                  alt=""
                  className="border w-8 h-8 rounded-full"
                />
              ) : (
                <FaUser className="h-6 w-6" />
              )}
              <span>{isLogin ? user.name : "Login"}</span>
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
