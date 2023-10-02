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

  private connectedUsers: Set<string> = new Set();

  // emit to the current client that a user has connected and send the updated list of connected users to all clients
  handleConnection(client: Socket) {
    this.connectedUsers.add(client.id);
    client.emit('connected', { id: client.id });
    this.emitConnectedUsers();
  }

  // emit to all connected clients except the current one that a user has disconnected and send the updated list of connected users to all clients
  handleDisconnect(client: Socket) {
    this.connectedUsers.delete(client.id);
    client.broadcast.emit('disconnected', { id: client.id });
    this.emitConnectedUsers();
  }

  // Send the updated list of connected users to all clients
  private emitConnectedUsers() {
    const usersArray = Array.from(this.connectedUsers);
    this.server.emit('connectedUsers', usersArray);
  }
}
