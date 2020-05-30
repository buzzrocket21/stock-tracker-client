import React, { useState, useEffect } from 'react';
import { Client, Message } from '@stomp/stompjs';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faCaretDown, faCaretUp } from '@fortawesome/free-solid-svg-icons';
import moment from 'moment';

import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import { StockModel } from './StockModel';
import { ListGroup, ListGroupItem, Input, InputGroup, InputGroupAddon, Button, Container, Fade, Spinner, Collapse } from 'reactstrap';

const client = new Client({
  brokerURL: 'ws://localhost:8085/stock-tracker/websocket',
  connectHeaders: {
    connection: 'upgrade',
    upgrade: 'websocket'
  }
});

function App() {
  const [connected, setConnected] = useState(false);
  const [inputSymbol, setInputSymbol] = useState('');
  const [stockMap, setStockMap] = useState(new Map<string, StockModel>());

  useEffect(() => {
    // keeps trying to reconnect until connected
    if(connected) {
      return;
    }
    client.onConnect = (e) => {
      setConnected(true);

      client.subscribe('/topic/public', (message: Message) => {
        if(message.body) {
          const stock = JSON.parse(message.body);
          if(stock) {
            setStockMap((map)=>{
              map.set(stock.key, stock);
              return new Map<string, StockModel>(map);
            });
          }
        }
      });
    };

    client.activate();

    return () => {
      // client.deactivate();
    }
  }, [connected]);

  const handleAddSymbolSubmit = () => {
    client.publish({
      destination: '/app/track',
      body: inputSymbol
    });
    setInputSymbol('');
  }

  return (
    <div className="App">
      <div className="page-header">
        <h2>Stock Tracker</h2>
      </div>
      <Collapse isOpen={!connected} className="text-center">
        <h2>Connecting...</h2>
        <Spinner color="secondary"></Spinner>
      </Collapse>
      <Fade in={connected}>
        <Container className="p-3">
          <form onSubmit={handleAddSymbolSubmit}>
            <InputGroup className="mb-4">
              <Input
                placeholder="Enter ticker symbol"
                value={inputSymbol}
                onChange={(e) => setInputSymbol(e.target.value)}></Input>
              <InputGroupAddon addonType="append">
                <Button onClick={handleAddSymbolSubmit}>Submit</Button>
              </InputGroupAddon>
            </InputGroup>
          </form>
          <ListGroup>
          {Array.from(stockMap.entries()).map(([key, value]: [string, StockModel]) => {
            return <ListGroupItem key={key}>
              <h4>{key.toUpperCase()}</h4>
              <span className={value.change > 0 ? "text-success" : "text-danger"}>
                {value.price.toLocaleString("en-US", {
                  style: 'currency',
                  currency: 'USD'
                })}
                <sub className="pl-2">
                  <FontAwesomeIcon icon={value.change > 0 ? faCaretUp : faCaretDown} />
                  {value.change.toLocaleString("en-US", {
                  style: 'currency',
                  currency: 'USD'
                })}</sub>
              </span>
              <span className="float-right">
                <i className="p-2">{moment(value.time).fromNow()}</i>
                <a href="/" onClick={() => {
                  client.publish({
                    destination: '/app/untrack',
                    body: key
                  });
                }}>
                  <FontAwesomeIcon icon={faTrash} />
                </a>
              </span>
            </ListGroupItem>;
          })}
          </ListGroup>
        </Container>
      </Fade>
    </div>
  );
}

export default App;
