import { Board, Level, LevelFactory, Piece, ScoringSystem } from '../model';
import { View } from '../view/view.interface';
import { Controller } from '../interface/controller.interface';
import { MultiplayerConnection } from '../interface/multiplayer-connection.interface';
import { SoundPlayer } from '../sound/sound-manager.interface';
import { FullBoardException } from '../exceptions/full-board.exception';

export class Game {

	public view: View;
	public soundPlayer: SoundPlayer;
	public controller: Controller;
	private multiplayer: MultiplayerConnection;

	private gameId = 0;

  private scoring = new ScoringSystem();

	private levels: Array<Level> = [];
	private level: Level;
	private currentLevelIndex = -1;
  private completedLinesCurrentLevel: number;

	private piece: Piece;
	private nextPiece: Piece;

	private board = new Board();
	private fallingPieceInterval: number;

	public init(): void {
		this.attachToController();
		this.view.setupBoard(Board.ROWS, Board.COLUMNS);
		this.view.drawBoard(this.board);
    this.initializeLevels();
	}

	public newGame(): void {
		this.view.showSingleOrMultiplayerOptions();
	}

	public changeMultiplayerConnection(singleOrMultiplayerConnection: MultiplayerConnection): void {
		this.multiplayer = singleOrMultiplayerConnection;
		this.attachToMultiplayer();
	}

	public singlePlayerOptionSelected(): void {
		this.view.hideSingleOrMultiplayerOptions();
		this.start();
	}

	public multiplayerOptionSelected(): void {
		this.view.hideSingleOrMultiplayerOptions();
		this.view.showMultiplayerOptionsCreateOrJoinGame();
	}

	public createMultiplayerGame(): void {
		this.view.hideCreateOrJoinGame();
		this.gameId = this.multiplayer.createNewGame();
		this.showMultiplayerGameId();
	}

	public joinGame(): void {
		this.view.hideCreateOrJoinGame();
		this.view.showEnterGameId();
	}

	public joinGameWithId(gameId: number): void {
		this.gameId = gameId;
		this.multiplayer.joinGame(gameId);
		this.view.hideEnterGameId();
	}

	public showMultiplayerGameId(): void {
		this.view.showNewMultiplayerGameCreateWithId(this.gameId);
	}

	public mute(): void {
		this.soundPlayer.mute();
	}

	public unMute(): void {
		this.soundPlayer.unMute();
	}

	private start(): void {
    this.currentLevelIndex = -1;
    this.scoring.reset();
    this.view.hideGameOver();

    this.startNewLevel();
	}

  private initializeLevels(): void {
    this.levels = LevelFactory.Levels();
  }

  private attachToController(): void {
    this.controller.onMoveLeft(() => this.moveLeft());
    this.controller.onMoveRight(() => this.moveRight());
    this.controller.onMoveDown(() => this.moveDown());
    this.controller.onRotate(() => this.rotate());
  }

	private attachToMultiplayer(): void {
		this.multiplayer.onPlayer2BoardUpdated((board: Board) => this.updatePlayer2Board(board));
		this.multiplayer.onPlayer2PieceUpdated((piece: Piece) => this.updatePlayer2Piece(piece));
		this.multiplayer.onPlayer2Connected(() => this.player2Connected());
	}

	private player2Connected(): void {
		this.view.hideNewMultiplayerGameCreateWithId();
		this.start();
	}

	private updatePlayer2Piece(piece: Piece): void {
		this.view.drawPlayer2Piece(piece);
	}

	private updatePlayer2Board(board: Board): void {
		this.view.drawPlayer2Board(board);
	}

	private moveLeft(): void {
		const pieceInNewPosition = this.piece.clone();
		pieceInNewPosition.moveLeft();
		this.movePieceToNewPositionIfNoCollision(pieceInNewPosition);
	}

	private moveRight(): void {
		const pieceInNewPosition = this.piece.clone();
		pieceInNewPosition.moveRight();
		this.movePieceToNewPositionIfNoCollision(pieceInNewPosition);
	}

	private async moveDown(): Promise<void> {
		const pieceInNewPosition = this.piece.clone();
		pieceInNewPosition.moveDown();

		if (!this.movePieceToNewPositionIfNoCollision(pieceInNewPosition)) {
			await this.freezePiece();
		}
	}

	private rotate(): void {
		const pieceInNewPosition = this.piece.clone();
		pieceInNewPosition.rotate();

		if (this.movePieceToNewPositionIfNoCollision(pieceInNewPosition)) {
			this.soundPlayer.playRotate();
		}
	}

	private async freezePiece(): Promise<void> {
		this.pauseFallingPiece();
		this.controller.lock();
    this.freezePieceOnDashboard();
    this.calculateScoringForNewFreezedPiece();

    await this.removeLinesIfAny();

    try {

      if (this.nextPiece) {
        this.putNextPieceIntoBoard();
        this.controller.unlock();
        this.startFallingPiece();
      } else {
        this.levelCompleted();
      }

    } catch (error) {
      if (error instanceof FullBoardException) {
        this.gameOver();
      }
    }
	}

  private freezePieceOnDashboard(): void {
    this.board.freezePiece(this.piece);
    this.drawBoard();
    this.soundPlayer.playFreeze();
  }

  private calculateScoringForNewFreezedPiece() {
    this.scoring.pieceDrop(this.currentLevelIndex + 1);
    this.showScore();
  }

  private showScore(): void {
    const score = this.scoring.getScore();
    this.view.showScore(score);
  }

	private levelCompleted(): void {
		this.soundPlayer.stopMusicBackground();
    this.view.showLevelCompleted();
		this.soundPlayer.playLevelComplete();

		setTimeout(() => {
      this.view.hideLevelCompleted();
			this.startNewLevel();			
		}, 5000);

	}

  private async removeLinesIfAny(): Promise<void> {
    let totalCompletedLines = 0;
    let completedLineInfo = this.board.isACompletedLine();

    while(completedLineInfo !== null) {
			totalCompletedLines++;

      const lineIndex = completedLineInfo.lineIndex;

      await this.cleanALine(lineIndex);
      this.showTotalLines();

      completedLineInfo = this.board.isACompletedLine();
    }

		this.completedLinesCurrentLevel += totalCompletedLines;

    if (totalCompletedLines> 0) {
      this.scoring.linesPerClear(totalCompletedLines, this.currentLevelIndex +1);
      this.showScore();
    }
  }

  private async cleanALine(lineNumber: number): Promise<void> {
		const me = this;

		this.soundPlayer.playLineCompleted();
		this.view.cleanLine(lineNumber);

		const waitForContinue = new Promise((resolve, reject) => {
			setTimeout(() => {
				me.board.removeLine(lineNumber);
				me.drawBoard();			
	
				resolve('');
			}, 500);
		});

		await waitForContinue;
  }

  private putNextPieceIntoBoard() {
    this.piece = this.nextPiece;
    this.centerPiece();
    this.drawPiece();
    this.moveNextShape();
  }

  private gameOver(): void {
    this.pauseFallingPiece();
    this.soundPlayer.stopMusicBackground();
    this.soundPlayer.playGameOver();
    this.view.showGameOver();
  }

  private moveNextShape() {
    const nextShape = this.level.getNextShape();

    if (nextShape) {
      this.nextPiece = new Piece(nextShape);
      this.drawNextShape();
    } else {
      this.nextPiece = null;
      this.view.cleanNextShape();
    }
  }

	private drawNextShape(): void {
		this.view.drawNextShape(this.nextPiece.shape);
	}

	private movePieceToNewPositionIfNoCollision(pieceInNewPosition: Piece): boolean {

		const canAllocatePiece = this.board.canAllocatePiece(pieceInNewPosition);

		if (canAllocatePiece) {
      this.drawBoard();
      this.piece = pieceInNewPosition;
      this.drawPiece()
		} 
		
		return canAllocatePiece;
	}

	private startNewLevel() {
		this.pauseFallingPiece();
    this.currentLevelIndex++;
		this.initLevelVariables();
    this.startLevelGame();
    this.startFallingPiece();
  }

	private initLevelVariables(): void {
    this.completedLinesCurrentLevel = 0;
		this.board.clean();
		this.level = this.levels[this.currentLevelIndex];
    this.level.init();
		this.piece = new Piece(this.level.getNextShape());
		this.nextPiece = new Piece(this.level.getNextShape());
	}

	private startLevelGame(): void {
    this.showNewLevelStart();
    this.showTotalLines();
    this.showScore();
		this.centerPiece();
		this.drawBoard();
		this.drawPiece();
    this.drawNextShape();

    this.playLevelMusic();
		this.resumeControl();
	}

	private resumeControl(): void {
		this.controller.unlock();
	}

	private playLevelMusic(): void {
		this.soundPlayer.playMusicBackground(this.currentLevelIndex);
	}

  private showTotalLines(): void {
    this.view.showTotalLines(this.completedLinesCurrentLevel);
  }

  private showNewLevelStart(): void {
    this.view.showNewLevelStart(this.currentLevelIndex+1);
  }

	private startFallingPiece(): void {
		const me = this;
		this.fallingPieceInterval = setInterval(() => me.moveDown(), me.level.speed)
	}

  private pauseFallingPiece(): void {
    clearInterval(this.fallingPieceInterval);
  }

	private drawPiece(): void {
		this.view.drawPiece(this.piece);
		this.multiplayer.sendNewPieceToPlayer2(this.piece);
	}

	private drawBoard(): void {
		this.view.drawBoard(this.board);
		this.multiplayer.sendNewBoardToPlayer2(this.board);
	}

	private centerPiece(): void {
    const boardMiddleX = this.board.getMiddleX();
    const shapeMiddleX = this.piece.shape.matrix.length / 2;

		this.piece.x = Math.floor(boardMiddleX - shapeMiddleX);
		this.piece.y = this.board.getTopY();

		if (!this.board.canAllocatePiece(this.piece)){
			throw new FullBoardException();				
		}
	}
}
