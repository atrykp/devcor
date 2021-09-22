import { Switch, Route, Redirect } from "react-router-dom";

import "./App.scss";
import DefaultLayout from "./components/Layout/DefaultLayout";
import AuthorizationScreen from "./Screens/AuthorizationScreen/AuthorizationScreen";
import StartPage from "./Screens/StartPage/StartPage";

function App() {
  return (
    <DefaultLayout>
      <Switch>
        <Route path="/start/:message?" exact>
          <StartPage />
        </Route>
        <Route path="/authorization/:type" exact>
          <AuthorizationScreen />
        </Route>
        <Redirect to="/start" />
      </Switch>
    </DefaultLayout>
  );
}

export default App;
