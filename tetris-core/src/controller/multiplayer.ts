import P2PT from "p2pt";
import { MultiplayerConnection } from "../interface/multiplayer-connection.interface";
import { Piece, Board } from "../model";

export class Multiplayer implements MultiplayerConnection {
  private player2PieceUpdated: (piece: Piece) => void;
  private player2BoardUpdated: (board: Board) => void;
  private player2Connected: () => void;

  private trackersAnnounceURLs = [
		'wss://tracker.openwebtorrent.com',
		'wss://tracker.sloppyta.co:443/announce',
		'wss://open.tube:443/tracker/socket',
		'ws://tracker.sloppyta.co:80/announce',
		'ws://tracker.btsync.cf:6969/announce',
	];

  private p2pt: P2PT;
  private peerPlayer2: any;

  joinGame(gameId: number): void {
    this.createP2PTInstance(gameId);
  }

  createNewGame(): number {
    const gameId = this.createNewGameId();
    this.createP2PTInstance(gameId);
    return gameId;
  }

  onPlayer2Connected(func: () => void): void {
    this.player2Connected = func;
  }

  onPlayer2PieceUpdated(func: (piece: Piece) => void): void {
    this.player2PieceUpdated = func;
  }

  onPlayer2BoardUpdated(func: (board: Board) => void): void {
    this.player2BoardUpdated = func;
  }

  sendNewBoardToPlayer2(board: Board): void {
    var msg = {
      id: "[BOARD-UPDATED]",
      board: board
    };

    this.p2pt.send(this.peerPlayer2, msg);
  }

  sendNewPieceToPlayer2(piece: Piece): void {
    var msg = {
      id: "[PIECE-UPDATED]",
      piece: piece
    };

    this.p2pt.send(this.peerPlayer2, msg);
  }

  private createNewGameId(): number {
    return new Date().getTime();
  }
  
	private createP2PTInstance(gameId: number): void {
		const gameIdentifier = `tetris-${gameId}`;

    console.log(`🚀 ~ file: multiplayer.ts ~ line 35 ~ Multiplayer ~ createP2PTInstance ~ gameIdentifier`, gameIdentifier)
		
    this.p2pt = new P2PT(this.trackersAnnounceURLs, gameIdentifier);
    
    this.p2pt.on('trackerconnect', (tracker: any, stats: any) => this.onConnectionSuccess(tracker, stats));
    this.p2pt.on('peerconnect', (peer: any) => this.onPeerConnected(peer));
    this.p2pt.on('peerclose', (peer: any) => this.onPeerClose(peer));
    this.p2pt.on('msg', (peer: any, msg: any) => this.onMessageReceived(peer, msg));

    this.p2pt.start();
  }

  onMessageReceived(peer: any, msg: any): void {
    console.log(`🚀 ~ file: multiplayer.ts ~ line 45 ~ Multiplayer ~ onMessageReceived ~ peer`, peer);
    console.log(`🚀 ~ file: multiplayer.ts ~ line 45 ~ Multiplayer ~ onMessageReceived ~ msg`, msg);

    if (msg.id === "[BOARD-UPDATED]")  {
      this.player2BoardUpdated(msg.board);
    }

    if (msg.id === "[PIECE-UPDATED]")  {
      this.player2PieceUpdated(msg.piece);
    }
  }
  
  onConnectionSuccess(tracker: any, stats: any): void {
    console.log(`🚀 ~ file: multiplayer.ts ~ line 41 ~ Multiplayer ~ onConnectionSuccess ~ onConnectionSuccess`);
    console.log('Connected to tracker : ' + tracker.announceUrl);
    console.log('Tracker stats : ' + JSON.stringify(stats));
  }

  onPeerConnected(peer: any): void  {
    console.log(`🚀 ~ file: multiplayer.ts ~ line 47 ~ Multiplayer ~ onPeerConnected ~ onPeerConnected`);
    this.peerPlayer2 = peer;
    this.player2Connected();
  }

  onPeerClose(peer: any): void {
    console.log(`🚀 ~ file: multiplayer.ts ~ line 52 ~ Multiplayer ~ onPeerClose ~ onPeerClose`);

  }
}