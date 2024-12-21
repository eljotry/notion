import { useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Notes from "./pages/Notes";
import CreateNote from "./pages/CreateNote";
import EditNote from "./pages/EditNote";
import ViewNote from "./pages/ViewNote";
import NotFound from "./pages/NotFound";
import Footer from "./components/Footer";
import "./index.css";
import { runInitialization } from "./redux/userActions";

const App = () => {
  const dispatch = useDispatch();

  const { user, initialized } = useSelector((state) => state.user);

  useEffect(() => {
    dispatch(runInitialization());
  }, [dispatch]);

  if (!initialized) {
    return <div>Loading...</div>;
  }

  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={user ? <Navigate to="/" /> : <Login />} />
        <Route
          path="/register"
          element={user ? <Navigate to="/" /> : <Register />}
        />
        <Route path="/notes" element={<Notes />} />
        <Route path="/create-note" element={<CreateNote />} />
        <Route path="/edit-note/:noteId" element={<EditNote />} />
        <Route path="/view-note/:noteId" element={<ViewNote />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Footer />
    </Router>
  );
};

export default App;
