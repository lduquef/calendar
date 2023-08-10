import { Route, Switch } from "react-router-dom";

import { Calendar } from "../events/Calendar";
import { Home } from "./Home";

export const Routes = () => (
  <Switch>
    <Route path="/Events" component={Calendar} />
    <Route path="/" component={Home} />
  </Switch>
);
