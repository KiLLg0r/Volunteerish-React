import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

// Auth context
import { AuthProvider } from "./components/contexts/AuthContext";

// Custom components
import Navigation from "./components/navigation/Navigation";
import Home from "./components/pages/Home";
import NotFound from "./components/pages/NotFound";
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";
import Messages from "./components/pages/Messages";
import Announces from "./components/pages/Announces";
import PrivateRoute from "./components/PrivateRoute";
import Settings from "./components/pages/Settings";
import Account from "./components/pages/Account";
import HelpAndSupport from "./components/pages/HelpAndSupport";
import About from "./components/pages/About";
import Card from "./components/pages/Card";

//Css
import "./assets/css/main.css";

function App() {
  return (
    <Router>
      <AuthProvider>
        <Switch>
          <Route path="/login" component={Login} />
          <Route path="/register" component={Register} />
          <PrivateRoute exact path="/" component={Home} />
          <PrivateRoute path="/announces" component={Announces} />
          <PrivateRoute path="/announce/:id" component={Card} />
          <PrivateRoute path="/settings" component={Settings} />
          <PrivateRoute path="/messages" component={Messages} />
          <PrivateRoute path="/account" component={Account} />
          <Route path="/help" component={HelpAndSupport} />
          <Route path="/about" component={About} />
          <Route path="*" component={NotFound} />
        </Switch>
        <Navigation />
      </AuthProvider>
    </Router>
  );
}

export default App;
