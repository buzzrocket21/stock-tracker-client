
import { Client } from '@stomp/stompjs';
const client = new Client({
    brokerURL: 'ws://localhost:8085/stock-tracker/websocket',
    connectHeaders: {
      connection: 'upgrade',
      upgrade: 'websocket'
    }
});

export default client;