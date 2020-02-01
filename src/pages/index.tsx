import React from "react"

import { Ballot } from "../papeleta/Form/components/Ballot"
import { StateBallot, LegislativeBallot } from "../papeleta/ballots"

import "../components/layout.css"

const stateBallot = new StateBallot()
const legislativeBallot = new LegislativeBallot()

const IndexPage = () => (
  <div className="App">
    <h1 className="text-9xl m-1 uppercase font-body">Pratica Tu Voto</h1>
    <hr />
    <h2>State Ballot</h2>
    <hr />
    <Ballot ballotRef={stateBallot.getService()} />
    <h2>Legislative Ballot</h2>
    <hr />
    <Ballot ballotRef={legislativeBallot.getService()} />
  </div>
)

export default IndexPage
