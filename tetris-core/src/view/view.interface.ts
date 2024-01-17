import { Board, Piece, Shape } from "../model";

export interface View {
	getGameId(): number;
	showEnterGameId(): void;
  hideEnterGameId(): void;

	showNewMultiplayerGameCreateWithId(gameId: number): void;
  hideNewMultiplayerGameCreateWithId(): void;

	hideCreateOrJoinGame(): void;
	showMultiplayerOptionsCreateOrJoinGame(): void;

	hideSingleOrMultiplayerOptions(): void;
	showSingleOrMultiplayerOptions(): void;

  hideLevelCompleted(): void;
  showLevelCompleted(): void;

  hideGameOver(): void;
  showGameOver(): void;

  showScore(score: number): void;
  showTotalLines(currentLevelLines: number): void;
  showNewLevelStart(levelNumber: number): void;
	setupBoard(rows: number, columns: number): void;

  drawNextShape(nextShape: Shape): void;
  drawPiece(piece: Piece): void;
  drawBoard(board: Board): void;

	drawPlayer2Board(board: Board): void;
  drawPlayer2Piece(piece: Piece): void;
  showPlayer2Score(score: number): void;
  showPlayer2TotalLines(currentLevelLines: number): void;

  cleanLine(lineIndex: number): void;
  cleanNextShape(): void;
}