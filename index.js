import React from "react";
import ReactDOM from "react-dom";
import Main from "./components/Main";

import styles from "./index.css";

function Thing() {
  return <Main />;
}

ReactDOM.render(<Thing />, document.getElementById("main"));
