import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const Home = () => {
  const user = useSelector((state) => state.user.user);

  return (
    <div className="max-w-2xl mx-auto mt-28 p-6 border rounded shadow-lg bg-white text-center">
      <h2 className="text-2xl font-bold mb-4">About me</h2>
      {user ? (
        <div>
          <p>
            Email: <strong>{user.email}</strong>
          </p>
          <p>
            Date of registration:{" "}
            <strong>{new Date(user.createdAt).toLocaleString()}</strong>
          </p>
          <Link
            to="/notes"
            className="mt-4 inline-block bg-gray-600 text-white p-2 rounded hover:bg-gray-700 w-full"
          >
            Go to notes
          </Link>
        </div>
      ) : (
        <p>Please, log on or register</p>
      )}
    </div>
  );
};

export default Home;
