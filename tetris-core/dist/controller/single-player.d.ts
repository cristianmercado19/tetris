import { MultiplayerConnection } from "../interface/multiplayer-connection.interface";
import { Board, Piece } from "../model";
export declare class SinglePlayer implements MultiplayerConnection {
    sendNewBoardToPlayer2(board: Board): void;
    sendNewPieceToPlayer2(piece: Piece): void;
    onPlayer2Connected(func: () => void): void;
    onPlayer2PieceUpdated(func: (piece: Piece) => void): void;
    onPlayer2BoardUpdated(func: (board: Board) => void): void;
    createNewGame(): number;
    joinGame(gameId: number): void;
}
