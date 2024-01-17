import { MultiplayerConnection } from "../interface/multiplayer-connection.interface";
import { Piece, Board } from "../model";
export declare class Multiplayer implements MultiplayerConnection {
    private player2PieceUpdated;
    private player2BoardUpdated;
    private player2Connected;
    private trackersAnnounceURLs;
    private p2pt;
    private peerPlayer2;
    joinGame(gameId: number): void;
    createNewGame(): number;
    onPlayer2Connected(func: () => void): void;
    onPlayer2PieceUpdated(func: (piece: Piece) => void): void;
    onPlayer2BoardUpdated(func: (board: Board) => void): void;
    sendNewBoardToPlayer2(board: Board): void;
    sendNewPieceToPlayer2(piece: Piece): void;
    private createNewGameId;
    private createP2PTInstance;
    onMessageReceived(peer: any, msg: any): void;
    onConnectionSuccess(tracker: any, stats: any): void;
    onPeerConnected(peer: any): void;
    onPeerClose(peer: any): void;
}
