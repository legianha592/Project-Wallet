import React from "react";
import { BrowserRouter, Switch, Route, Link } from "react-router-dom";

import Authentication from "./Authentication/Authentication"

function App() {
  return (
    <div>
      <Authentication />
    </div>
  );
}

export default App;
