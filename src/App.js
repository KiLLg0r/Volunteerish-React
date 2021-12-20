import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

// Auth context
import { AuthProvider, useAuth } from "./components/contexts/AuthContext";

// Custom components
import Navigation from "./components/navigation/Navigation";
import Home from "./components/pages/Home";
import NotFound from "./components/pages/NotFound";
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";
import Shop from "./components/pages/Shop";
import Messages from "./components/pages/Messages";
import Announces from "./components/pages/Announces";
import PrivateRoute from "./components/PrivateRoute";

//Css
import "./assets/css/main.css";
import { useState, useEffect } from "react";

function App() {
  // const { currentUser } = useAuth();
  const [user, setUser] = useState(false);

  return (
    <Router>
      <AuthProvider>
        <Switch>
          <Route path="/login" component={Login} />
          <Route path="/register" component={Register} />
          <PrivateRoute exact path="/" component={Home} />
          <PrivateRoute path="/announces" component={Announces} />
          <PrivateRoute path="/shop" component={Shop} />
          <PrivateRoute path="/messages" component={Messages} />
          <Route path="*" component={NotFound} />
        </Switch>
        <Navigation />
      </AuthProvider>
    </Router>
  );
}

export default App;
