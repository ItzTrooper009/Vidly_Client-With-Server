import React, { useEffect, useState } from "react";
import { Route, Redirect, Switch } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Movies from "./components/movies";
import LoginForm from "./components/loginForm";
import Logout from "./components/logout";
import MovieForm from "./components/movieForm";
import Customers from "./components/customers";
import Rentals from "./components/rentals";
import NotFound from "./components/notFound";
import NavBar from "./components/navBar";
import RegisterForm from "./components/registerForm";
import GetUser from "./components/getUser";
import ProtectedRoute from "./components/common/protectedRoute";
import auth from "./services/authService";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";

//Main Page
const App = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const currentUser = auth.getCurrentUser();
    setUser(currentUser);
  }, []);

  return (
    <>
      <ToastContainer />
      <NavBar user={user} />
      <main className="container p-3">
        <Switch>
          <Route path="/register" component={RegisterForm} />
          <Route path="/login" component={LoginForm} />
          <Route path="/profile" component={GetUser} />
          <Route path="/logout" component={Logout} />
          <ProtectedRoute path="/movies/:id" component={MovieForm} />
          <Route
            path="/movies"
            render={(props) => <Movies {...props} user={user} />}
          />
          <Route path="/customers" component={Customers} />
          <Route path="/rentals" component={Rentals} />
          <Route path="/not-found" component={NotFound} />
          <Redirect from="/" exact to="/movies" />
          <Redirect to="/not-found" />
        </Switch>
      </main>
      {/* <footer>@copy</footer> */}
    </>
  );
};

export default App;
