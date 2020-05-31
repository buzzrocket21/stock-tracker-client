import React, { useState, useEffect, useContext, useCallback } from 'react';
import { Message } from '@stomp/stompjs';
import { ListGroup, Input, InputGroup, InputGroupAddon, Button, Container, Fade, Spinner, Collapse } from 'reactstrap';

import 'bootstrap/dist/css/bootstrap.min.css';

import client from '../connect/websocketClient';

import { StockModel } from './StockModel';
import StockListItem from './StockListItem';
import { stockMapContext } from './StocksContext';

function StockList() {
  const [connected, setConnected] = useState(client.connected);
  const [subscribed, setSubscribed] = useState(false);
  const [inputSymbol, setInputSymbol] = useState('');
  const { stocks, addStock, removeStock } = useContext(stockMapContext);

  console.log(client.connected)

  const subscribe = useCallback(() => {
    client.subscribe('/topic/public', (message: Message) => {
      if (message.body) {
        const stock = JSON.parse(message.body);
        if (stock) {
          addStock(stock);
        }
      }
    });
    setSubscribed(true);
  }, [addStock]);

  useEffect(() => {
    // keeps trying to reconnect until connected
    if (connected) {
      if (!subscribed) {
        subscribe();
      }
      return;
    }
    client.onConnect = () => {
      setConnected(true);

      subscribe();
    };

    client.activate();

    return () => {
      // client.deactivate();
    }
  }, [connected, subscribed, subscribe]);

  const handleAddSymbolSubmit = () => {
    client.publish({
      destination: '/app/track',
      body: inputSymbol
    });
    setInputSymbol('');
  }

  return (
    <div>
      <Collapse isOpen={!connected} className="text-center">
        <h2>Connecting...</h2>
        <Spinner color="secondary"></Spinner>
      </Collapse>
      <Fade in={connected}>
        <Container >
          <InputGroup className="mb-4">
            <Input
              placeholder="Enter ticker symbol"
              value={inputSymbol}
              onKeyPress={e => {
                if(e.charCode === 13) {
                  // enter key pressed
                  handleAddSymbolSubmit();
                }
              }}
              onChange={(e) => setInputSymbol(e.target.value)}></Input>
            <InputGroupAddon addonType="append">
              <Button onClick={handleAddSymbolSubmit}>Submit</Button>
            </InputGroupAddon>
          </InputGroup>
          <ListGroup>
            {stocks.map((stock: StockModel) => {
              return <StockListItem key={stock.key} stockKey={stock.key} value={stock} handleUntrack={(e) => {
                e.preventDefault();
                client.publish({
                  destination: '/app/untrack',
                  body: stock.key
                });

                removeStock(stock.key);
              }} />
            })}
          </ListGroup>
        </Container>
      </Fade>
    </div>
  );
}

export default StockList;
