import React from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';

import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Jumbotron, Container } from 'reactstrap';
import StockList from './StockList/StockList';
import { useStocks, stockMapContext } from './StockList/StocksContext';

function App() {
  const stocks = useStocks();
  return (
    <div className="App">
      <Router>
        <div className="page-header">
          <Link to="/" style={{ textDecoration: 'none', color: 'white' }}>
            <h2>Stock Tracker</h2>
          </Link>
        </div>
        <Container className="p-3">
            <Switch>
              <Route path="/tracker">
                <stockMapContext.Provider value={stocks}>
                  <StockList />
                </stockMapContext.Provider>
              </Route>
              <Route path="/">
                <Jumbotron>
                  <h1>Stock Tracker</h1>
                  <p>Track and view the latest information on your favorite stocks!</p>
                  <Link to="/tracker">Get started!</Link>
                </Jumbotron>
              </Route>
            </Switch>
        </Container>
      </Router>
    </div>
  );
}

export default App;
