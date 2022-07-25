
import Login from "./pages/login/Login";
import Register from "./pages/register/Register";
import Messenger from "./pages/messenger/Messenger";

import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "./components/context/AuthContext";

function App() {
  const { user } = useContext(AuthContext)
  return (

    <Router>
      <Routes>
        <Route exact path="/"
          element={user ? <Messenger /> : <Login />}
        />

        <Route path="/login" element={user ? <Navigate to="/" /> : <Login />} />

        <Route path="/register"
          element={user ? <Navigate to="/" /> : <Register />}
        />
        <Route path="/messenger"
          element={!user ? <Navigate to="/" /> : <Messenger />}
        />
      </Routes>
    </Router>
  );
}

export default App;
