import { useContext } from "react";
import { Switch, Route, Redirect } from "react-router-dom";

import "./App.scss";
import DefaultLayout from "./components/Layout/DefaultLayout";
import NotificationBar from "./components/NotificationBar/NotificationBar";
import { NotificationCtx } from "./context/NotificationContext";
import { useAuth } from "./hooks/useAuth";
import AuthorizationScreen from "./Screens/AuthorizationScreen/AuthorizationScreen";
import ProfileScreen from "./Screens/ProfileScreen/ProfileScreen";
import PrivateRoute from "./Screens/router/PrivateRoute";
import StartPage from "./Screens/StartPage/StartPage";

function App() {
  const ctx = useContext(NotificationCtx);
  const [user] = useAuth();

  return (
    <DefaultLayout>
      <>
        {ctx.message && <NotificationBar />}
        <Switch>
          <Route path="/start/:message?" exact>
            <StartPage />
          </Route>
          <Route path="/authorization/:type" exact>
            <AuthorizationScreen />
          </Route>
          <PrivateRoute path="/profile/:id" component={ProfileScreen} exact />
          <Redirect to="/start" />
        </Switch>
      </>
    </DefaultLayout>
  );
}

export default App;
