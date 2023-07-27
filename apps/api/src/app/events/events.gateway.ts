import {
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
  WsResponse,
  ConnectedSocket,
} from '@nestjs/websockets';
import { from, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Server, Socket } from 'socket.io';

type ChatRecieved = {
  uname: string;
  time: string;
  text: string;
};

@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
export class EventsGateway {
  @WebSocketServer()
  server: Server;

  @SubscribeMessage('events')
  findAll(@MessageBody() data: any): Observable<WsResponse<number>> {
    return from([1, 2, 3]).pipe(
      map((item) => ({ event: 'events', data: item }))
    );
  }

  @SubscribeMessage('identity')
  async identity(@MessageBody() data: number): Promise<number> {
    return data;
  }

  //クライアント側から「chatToServer」という名前のメッセージ（？）をリッスン（好きに命名できる）
  @SubscribeMessage('chatToServer')
  chatting(
    @MessageBody() payload: ChatRecieved,
    @ConnectedSocket() client: Socket
  ): void {
    //@MessageBody→受信したデータ
    //@ConnectedSocket→ユーザーのID（websocketで自動で割り当てられる）や、その他接続に関する情報など
    console.log('chat受信');
    console.log(payload);
    //emit()とすると、指定した名前をリッスンしているクライアントに情報をプッシュできる
    this.server.emit('chatToClient', { ...payload, socketId: client.id });
  }

  afterInit(server: Server) {
    //初期化
    console.log('初期化しました。');
  }

  handleConnection(client: Socket, ...args: any[]) {
    //クライアント接続時
    console.log(`Client connected: ${client.id}`);
  }

  handleDisconnect(@ConnectedSocket() client: Socket) {
    //クライアント切断時
    console.log(`Client disconnected: ${client.id}`);
  }
}
