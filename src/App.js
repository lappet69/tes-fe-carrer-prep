import "./App.css";
import Login from "./components/login/Login";
import Register from "./components/register/Register";
import Dashboard from "./components/dashboard/Dashboard";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import PrivateRoute from "./PrivateRoute";

function App() {
  return (
    <Router>
      <Routes>
        <>
          <Route exact path="/dashboard" element={<PrivateRoute />}>
            <Route path="/dashboard" element={<Dashboard />} />
          </Route>
          <Route path="/" element={<Login />} />
          <Route exact path="/logout" element={<Navigate to="/" />} />
          <Route path="/register" name="Register Page" element={<Register />} />
        </>
      </Routes>
    </Router>
    // // <Login />
    // {/* <Register/> */}
    // {/* <Dashboard/> */}
  );
}

export default App;
