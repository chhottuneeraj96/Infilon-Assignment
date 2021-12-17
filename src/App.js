import { Route, BrowserRouter as Router, Switch } from "react-router-dom";

import { EditUser } from "./features/users/EditUser";
import React from "react";
import { UserList } from "./features/users/UserList";

export default function App() {
  return (
    <Router>
      <div>
        <Switch>
          <Route path="/edit-user">
            <EditUser />
          </Route>
          <Route path="/">
            <UserList />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}
