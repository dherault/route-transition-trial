import React from 'react'
import { BrowserRouter as Router, Switch, Route, Redirect, Link } from 'react-router-dom'

import './App.css'

import Route1 from './routes/1'
import Route2 from './routes/2'
import Route3 from './routes/3'

import Blob from './components/Blob'

import { randomRange } from './utils/math'

function RandomLink({ to, children }) {
  return (
    <div
      style={{
        position: 'absolute',
        top: randomRange(0, window.innerHeight - 6),
        left: randomRange(0, window.innerWidth - 6),
      }}
    >
      <Link to={to}>
        {children}
      </Link>
    </div>
  )
}

function App() {
  return (
    <Router>
      <div style={{ position: 'relative' }}>
        <Blob />
        <RandomLink to="/1">1</RandomLink>
        <RandomLink to="/2">2</RandomLink>
        <RandomLink to="/3">3</RandomLink>
        <Switch>
          <Route exact path="/1">
            <Route1 />
          </Route>
          <Route exact path="/2">
            <Route2 />
          </Route>
          <Route exact path="/3">
            <Route3 />
          </Route>
          <Redirect from="/" to="/1" />
        </Switch>
      </div>
    </Router>
  )
}

export default App
