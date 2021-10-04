import { useContext } from "react";
import { Route, Redirect } from "react-router-dom";

import { UserCtx } from "../../context/UserContext";

export default function PrivateRoute(props) {
  const user = useContext(UserCtx);
  console.log(user);

  const { component: Component, ...rest } = props;

  if (user.id) {
    return <Route {...rest} render={<Component />} />;
  }

  return <Redirect to="/authorization/signup" />;
}
