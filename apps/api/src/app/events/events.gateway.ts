import { Inject } from '@nestjs/common';
import {
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
  ConnectedSocket,
} from '@nestjs/websockets';
import {
  ChatPost,
  PrismaService,
} from '@study-mongodb-stream/prisma-client-main';
import { ChangeStream, Collection, Db, ObjectId } from 'mongodb';
import { Server, Socket } from 'socket.io';

@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
export class EventsGateway {
  @WebSocketServer()
  private readonly server: Server;
  private readonly chatCollection: Collection<ChatPost>;
  // stream接続管理用のMap
  private readonly chatChangeStreams: Map<string, ChangeStream> = new Map();

  constructor(
    @Inject('DATABASE_CONNECTION') private db: Db,
    private prisma: PrismaService
  ) {
    this.chatCollection = this.db.collection<ChatPost>('ChatPost');
  }
  //初期化時
  afterInit(server: Server) {
    console.log('server init');
  }

  //クライアント接続時
  handleConnection(client: Socket) {
    console.log(`Client connected: ${client.id}`);
    console.log(client.handshake.query.roomId);
    const roomId = client.handshake.query.roomId as string;
    const chatChangeStream = this.chatCollection.watch<ChatPost>([
      {
        $match: {
          operationType: 'insert',
          'fullDocument.roomId': new ObjectId(roomId),
        },
      },
    ]);
    chatChangeStream.on('change', (next: any) => {
      console.log(next);
      client.emit('chat:send', next.fullDocument);
    });
    // ChangeStreamをマップに保存
    this.chatChangeStreams.set(client.id, chatChangeStream);
    // 初期表示のために過去のチャットを送信;
    this.prisma.chatPost
      .findMany({
        where: {
          roomId: client.handshake.query.roomId as string,
        },
        include: {
          sender: true,
        },
      })
      .then((data) => {
        client.emit('chat:list', data);
      });
  }

  @SubscribeMessage('chat:send')
  chat(@MessageBody() payload: ChatPost): void {
    this.prisma.chatPost
      .create({
        data: {
          ...payload,
        },
        include: {
          sender: true,
        },
      })
      .then((data) => {
        console.log(data);
      });
  }

  //クライアント切断時
  handleDisconnect(@ConnectedSocket() client: Socket) {
    console.log(`Client disconnected: ${client.id}`);
    // 接続ごとのChangeStreamを閉じる
    const chatChangeStream = this.chatChangeStreams.get(client.id);
    if (chatChangeStream) {
      chatChangeStream.close();
      this.chatChangeStreams.delete(client.id);
    }
  }
}
