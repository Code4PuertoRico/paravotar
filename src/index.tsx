import React from "react";
import ReactDOM from "react-dom";

import * as serviceWorker from './serviceWorker';
import "./styles.css";
import { Ballot } from "./papeleta/Form/components/Ballot";
import { StateBallot, LegislativeBallot } from "./papeleta/ballots";

const stateBallot = new StateBallot();
const legislativeBallot = new LegislativeBallot();

function App() {
  return (
    <div className="App">
      <h1>Pratica Tu Voto</h1>
      <hr />
      <h2>State Ballot</h2>
      <hr />
      <Ballot ballotRef={stateBallot.getService()} />
      <h2>Legislative Ballot</h2>
      <hr />
      <Ballot ballotRef={legislativeBallot.getService()} />
    </div>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
