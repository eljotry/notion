import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import eyeOpen from "../assets/eye.svg";
import eyeClosed from "../assets/eye-closed.svg";
import { login } from "../redux/userActions";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const { error, loading } = useSelector((state) => state.user);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const result = await dispatch(login(email, password));

    if (result) {
      navigate("/");
    }
  };

  return (
    <div className="max-w-2xl mx-auto mt-28 p-6 border rounded shadow-lg bg-white">
      <h2 className="text-2xl font-bold mb-4 text-center">Log in</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-2 border rounded"
            required
            autoComplete="email"
          />
        </div>
        <div className="relative">
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-2 border rounded pr-10"
            required
            autoComplete="current-password"
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute inset-y-0 right-0 flex items-center pr-3"
          >
            <img
              src={showPassword ? eyeOpen : eyeClosed}
              alt="Toggle Password"
              className="w-6 h-6"
            />
          </button>
        </div>
        <button
          type="submit"
          className="w-full p-2 bg-gray-600 text-white rounded hover:bg-gray-700"
          disabled={loading}
        >
          Log in
        </button>
      </form>
      {error && <p className="mt-4 text-red-500">{error}</p>}
    </div>
  );
};

export default Login;
