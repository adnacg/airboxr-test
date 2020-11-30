import React from "react";
import "./App.css";
import { Home } from "./pages/Home";
import { Route, Switch } from "react-router-dom";
import { SelectSource } from "./pages/SelectSource";
import { SelectTable } from "./pages/SelectTable";

function App() {
  return (
    <div className="App">
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/sources" exact component={SelectSource} />
        <Route path="/sources/:source" exact component={SelectTable} />
      </Switch>
    </div>
  );
}

export default App;
