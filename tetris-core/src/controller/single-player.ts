import { MultiplayerConnection } from "../interface/multiplayer-connection.interface";
import { Board, Piece } from "../model";

export class SinglePlayer implements MultiplayerConnection {

  sendNewBoardToPlayer2(board: Board): void {
  }

  sendNewPieceToPlayer2(piece: Piece): void {
  }

  onPlayer2Connected(func: () => void): void {
  }
  
  onPlayer2PieceUpdated(func: (piece: Piece) => void): void {
  }

  onPlayer2BoardUpdated(func: (board: Board) => void): void {
  }

  createNewGame(): number {
    return new Date().getTime();
  }

  joinGame(gameId: number): void {
  }
}