import { Link, useNavigate } from "react-router-dom";
import { connect } from "react-redux";
import { runLogout } from "../redux/userActions";

const Navbar = ({ user, logout }) => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate("/login");
  };

  return (
    <nav className="bg-gray-800 py-4 px-8 fixed top-0 left-0 right-0 z-10">
      <div className="flex justify-between items-center">
        <div className="text-white">
          {user ? (
            <span>
              Hello, <span className="font-bold">{user.email}!</span>
            </span>
          ) : (
            "Welcom!"
          )}
        </div>
        <div className="flex items-center">
          {user && (
            <Link to="/" className="text-white mr-4">
              Home
            </Link>
          )}
          {user ? (
            <>
              <Link to="/notes" className="text-white mr-4">
                Notes
              </Link>
              <button
                onClick={handleLogout}
                className="text-white font-bold"
                aria-label="Log out of your account"
              >
                Log out
              </button>
            </>
          ) : (
            <>
              <Link to="/register" className="text-white mr-4">
                Registration
              </Link>
              <Link to="/login" className="text-white font-bold">
                Log in
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

const mapStateToProps = (state) => ({
  user: state.user.user,
});

const mapDispatchToProps = (dispatch) => ({
  logout: () => dispatch(runLogout()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Navbar);
