import React from "react";
import { Route, Redirect } from "react-router-dom";
import { useCurrentUser } from "../../contexts/CurrentUserContext";

function PrivateRoute({ component: Component, ...rest }) {
  const currentUser = useCurrentUser();
  return (
    <Route
      {...rest}
      render={(props) => {
        if (!currentUser) {
          // not logged in so redirect to login page
          return (
            <Redirect
              to={{ pathname: "/signin", state: { from: props.location } }}
            />
          );
        }
        // authorized so return component
        return <Component {...props} />;
      }}
    />
  );
}

export default PrivateRoute;
