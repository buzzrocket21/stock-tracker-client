import React, { useState, useEffect } from 'react';
import { Client, Message } from '@stomp/stompjs';

import './App.css';
import { StockModel } from './StockModel';

const client = new Client({
  brokerURL: 'ws://localhost:8085/stock-tracker/websocket',
  connectHeaders: {
    connection: 'upgrade',
    upgrade: 'websocket'
  }
});

function App() {
  const [connected, setConnected] = useState(false);
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
          stockMap.set(stock.key, stock);
          setStockMap(new Map<string, StockModel>(stockMap));
        }
      });

      client.publish({
        destination: '/app/track',
        body: 'intl'
      });
    };

    client.activate();

    return () => {
      // client.deactivate();
    }
  }, [connected, stockMap]);

  return (
    <div className="App">
      {connected ? 'true' : 'false'}
      <ul>
      {Array.from(stockMap.entries()).map(([key, value]: [string, StockModel]) => {
        return <li key={key}>{`${key}: ${JSON.stringify(value)}`}</li>;
      })}
      </ul>
    </div>
  );
}

export default App;
