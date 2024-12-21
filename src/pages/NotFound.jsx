import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const NotFound = () => {
  const user = useSelector((state) => state.user.user);

  return (
    <div className="max-w-2xl mx-auto mt-28 p-6 border rounded shadow-lg bg-white text-center">
      <h2 className="text-2xl font-bold mb-4">404 - The page was not found</h2>
      <p>Sorry, but the requested page does not exist</p>
      <div className="mt-4">
        {user ? (
          <Link
            to="/"
            className="inline-block w-full bg-gray-600 text-white p-2 rounded hover:bg-gray-700"
          >
            Go back to the home page
          </Link>
        ) : (
          <Link
            to="/login"
            className="inline-block w-full bg-gray-600 text-white p-2 rounded hover:bg-gray-700"
          >
            Go back to the login page
          </Link>
        )}
      </div>
    </div>
  );
};

export default NotFound;
