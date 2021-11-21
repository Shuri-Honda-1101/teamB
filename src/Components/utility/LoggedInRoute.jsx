import React, { useContext } from "react";
import { Route } from "react-router-dom";
import { AuthContext } from "./AuthService";
import { Redirect } from "react-router-dom";

const LoggedInRoute = ({ component: Component, ...rest }) => {
  const user = useContext(AuthContext);
  return (
    <Route
      {...rest}
      render={(props) =>
        user ? <Component {...props} /> : <Redirect to={"/lp"} />
      }
    />
  );
};

export default LoggedInRoute;
