import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Custom components
import Navigation from "./components/navigation/Navigation";
import Home from "./components/pages/Home";
import NotFound from "./components/pages/NotFound";
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";
import Shop from "./components/pages/Shop";
import Messages from "./components/pages/Messages";
import Settings from "./components/pages/Settings";
import Announces from "./components/pages/Announces";

//Css
import "./assets/css/main.css";
import { useState } from "react";

function App() {
  const userLogged = useState(false);

  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/" element={<Home />} />
        <Route path="/announces" element={<Announces />} />
        <Route path="/shop" element={<Shop />} />
        <Route path="/messages" element={<Messages />} />
        {/* <Route path="/settings" element={<Settings />} /> */}
        <Route path="*" element={<NotFound />} />
      </Routes>
      {!userLogged ? <Navigation /> : null}
    </Router>
  );
}

export default App;
