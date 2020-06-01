
import { Client } from '@stomp/stompjs';
const client = new Client({
    brokerURL: `${process.env.REACT_APP_WEBSOCKET_URL}/stock-tracker/websocket`,
    connectHeaders: {
      connection: 'upgrade',
      upgrade: 'websocket'
    }
});

export default client;