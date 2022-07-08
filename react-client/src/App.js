import "./App.css";
import Mainpanel from "./Mainpanel";
import Login from "./Components/Login";
import Registration from "./Components/Registration";
import {
  Route,
  BrowserRouter as Router,
  Routes,
  Navigate,
} from "react-router-dom";
import PrivateRoute from "./PrivateRoute";
import React from "react";
import AuthProvider from "./AuthContext/AuthContext";

function App() {
  return (
    <div className="App">
      <Router>
        <AuthProvider>
          <Routes>
            <Route
              path="/*"
              element={
                <PrivateRoute>
                  <Mainpanel />
                </PrivateRoute>
              }
            />
            <Route path="/signin" element={<Login />} />
            <Route path="/signup" element={<Registration />} />
            <Route path="/" element={<Navigate to="/dashboard" replace />} />
          </Routes>
        </AuthProvider>
      </Router>
    </div>
  );
}

export default App;
