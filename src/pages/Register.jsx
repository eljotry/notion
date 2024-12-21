import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import eyeOpen from "../assets/eye.svg";
import eyeClosed from "../assets/eye-closed.svg";
import { register } from "../redux/userActions";

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState([]);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { error, loading } = useSelector((state) => state.user);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = [];

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
      newErrors.push("Invalid email format");
    }

    if (password.length < 8) {
      newErrors.push("The password must contain at least 8 characters");
    }
    if (!/[A-Z]/.test(password)) {
      newErrors.push("The password must contain at least one capital letter");
    }
    if (!/[a-z]/.test(password)) {
      newErrors.push("The password must contain at least one lowercase letter");
    }
    if (!/[0-9]/.test(password)) {
      newErrors.push("The password must contain at least one digit");
    }
    if (password !== confirmPassword) {
      newErrors.push("Passwords do not match");
    }

    setErrors(newErrors);

    if (newErrors.length !== 0) {
      return;
    }

    const result = await dispatch(register(email, password));

    if (result) {
      navigate("/");
    }
  };

  const allErrors = [...errors];

  if (error) {
    allErrors.push(error);
  }

  return (
    <div className="max-w-2xl mx-auto mt-28 p-6 border rounded shadow-lg bg-white">
      <h2 className="text-2xl font-bold mb-4 text-center">Registration</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <input
            type="email"
            placeholder="Email (e.g. user@user.com)"
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
            placeholder="Password (e.g Abc12345)"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-2 border rounded pr-10"
            required
            autoComplete="new-password"
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-2 top-1/2 transform -translate-y-1/2"
          >
            <img
              src={showPassword ? eyeOpen : eyeClosed}
              alt={showPassword ? "Hide the password" : "Show password"}
              className="h-6 w-6"
            />
          </button>
        </div>
        <div className="relative">
          <input
            type={showConfirmPassword ? "text" : "password"}
            placeholder="Repeat the password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="w-full p-2 border rounded pr-10"
            required
            autoComplete="new-password"
          />
          <button
            type="button"
            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            className="absolute right-2 top-1/2 transform -translate-y-1/2"
          >
            <img
              src={showConfirmPassword ? eyeOpen : eyeClosed}
              alt={showConfirmPassword ? "Hide the password" : "Show password"}
              className="h-6 w-6"
            />
          </button>
        </div>
        <button
          type="submit"
          className="w-full p-2 bg-gray-600 text-white rounded hover:bg-gray-700"
          disabled={loading}
        >
          Register
        </button>
      </form>
      {allErrors.length > 0 && (
        <ul className="mt-4 text-red-500">
          {allErrors.map((error, index) => (
            <li key={index}>{error}</li>
          ))}
        </ul>
      )}
      <p className="mt-4 text-center">
        Already have an account?{" "}
        <button
          onClick={() => navigate("/login")}
          className="text-gray-800 font-bold hover:underline"
        >
          Sign in
        </button>
      </p>
    </div>
  );
};

export default Register;
