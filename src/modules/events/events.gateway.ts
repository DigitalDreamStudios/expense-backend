import {
  WebSocketGateway,
  WebSocketServer,
  OnGatewayConnection,
  OnGatewayDisconnect,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';

@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
export class EventsGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer()
  server: Server;

  // emit to the current client that a user has connected
  handleConnection(client: Socket) {
    client.emit('connected', { id: client.id });
  }

  // emit to all connected clients except the current one that a user has disconnected
  handleDisconnect(client: Socket) {
    client.broadcast.emit('disconnected', { id: client.id });
  }
}
