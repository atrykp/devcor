import { useContext } from "react";
import { Switch, Route, Redirect } from "react-router-dom";

import "./App.scss";
import DefaultLayout from "./components/Layout/DefaultLayout";
import Modal from "./components/Modal/Modal";
import NotificationBar from "./components/NotificationBar/NotificationBar";
import { NotificationCtx } from "./context/NotificationContext";
import AuthorizationScreen from "./Screens/AuthorizationScreen/AuthorizationScreen";
import LanguageScreen from "./Screens/LanguageScreen/LanguageScreen";
import ProfileScreen from "./Screens/ProfileScreen/ProfileScreen";
import StartPage from "./Screens/StartPage/StartPage";

function App() {
  const ctx = useContext(NotificationCtx);

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
          <Route path="/profile/:id" exact>
            <ProfileScreen />
          </Route>
          <Route path="/language" exact>
            <LanguageScreen />
          </Route>
          <Redirect to="/start" />
        </Switch>
      </>
    </DefaultLayout>
  );
}

export default App;
