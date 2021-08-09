import React from "react";
import ReactDOM from "react-dom";
import App from "./routes/App";
import { FirebaseAppProvider } from "reactfire";
import firebaseConfig from "./firebaseConfig";

ReactDOM.render(
  <FirebaseAppProvider firebaseConfig={firebaseConfig}>
    <App />
  </FirebaseAppProvider>,

  document.getElementById("App")
);
