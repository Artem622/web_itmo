/* eslint-disable */
import {
  ConnectedSocket,
  MessageBody,
  OnGatewayConnection,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer
} from "@nestjs/websockets";
import {Socket, Server} from "socket.io";
import {JwtService} from "@nestjs/jwt";

@WebSocketGateway(
    {
        cors:{
            origin: "*"
        }
    }
)
export class SocketService implements OnGatewayConnection{
    constructor(
      private jwtService: JwtService
    ) {
    }
    private clientTokenMap: Map<number, Socket> = new Map()

    @WebSocketServer()
    server: Server;

    handleConnection(client: Socket){
        console.log(`Client connected: ${client.id}`);
    }

    @SubscribeMessage('sendToServer')
    handleSendToServerEvent(
      @ConnectedSocket() client: Socket, @MessageBody() data: any) {
      try {
        const connectedUser = this.jwtService.verify(data.token, {
          secret: "jhgiV876sdfhiuFYSUFPNJaiFIUsbfjh87Sf98sba76fadfvahdafo7isa87690SAFGU",
        })
        if (this.clientTokenMap[connectedUser.id]) {
          this.clientTokenMap[connectedUser.id].disconnect()
        }
        this.clientTokenMap[connectedUser.id] = client
        console.log(this.clientTokenMap.forEach((el, key) => {
          console.log(key, el.id)
        }))
      } catch (e) {
        console.log("Jwt exception in socket")
      }
    }

}