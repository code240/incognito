import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import Download from "./Pages/Download";

import Message from './Pages/Message';
// import Sent from './Pages/Sent'
// import Loading from "./Pages/Loading";

export default function App() {
  return (
    <>
      <Router basename={process.env.PUBLIC_URL}>
          <Switch>
            <Route path="/" exact component={Download} />
            <Route path="/:user" exact component={Message} />
            <Route path="/:user/:question"  component={Message} />
          </Switch>
      </Router>
    </>
  );
}



// "react-router-dom": "^6.4.1",

