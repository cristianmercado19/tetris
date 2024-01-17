import { Game, View, Multiplayer, SinglePlayer } from 'tetris-core/dist';
import {
  AfterViewInit,
  Component,
  ElementRef,
  OnInit,
  ViewChild,
} from '@angular/core';
import { Piece, Board, Shape } from 'tetris-core/dist/model';
import { KeyController } from './key-controller';
import { SoundManager } from './sound-manager';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit, AfterViewInit, View {
  @ViewChild('board', { static: false })
  canvasBoard: ElementRef<HTMLCanvasElement>;
  board: CanvasRenderingContext2D;

  @ViewChild('player2Board', { static: false })
  player2CanvasBoard: ElementRef<HTMLCanvasElement>;
  player2Board: CanvasRenderingContext2D;

  @ViewChild('next', { static: false })
  canvasNext: ElementRef<HTMLCanvasElement>;
  next: CanvasRenderingContext2D;

  title = 'tetris-view';
  game = new Game();

  isMute = false;

  levelNumber = '';
  totalLines = '';
  score = 0;

  isGameOver = false;
  isLevelCompleted = false;

  backgroundLevelClass = 'backgroundLevel1';

  singleOrMultiplayerOptionsVisible = false;
  multiplayerOptionsCreateOrJoinVisible = false;
  newMultiplayerGameCreatedVisible = false;
  enterGameIdVisible = false;
  gameId = 0;

  ngAfterViewInit(): void {
    this.game.view = this;
    this.game.controller = new KeyController();
    this.game.soundPlayer = new SoundManager();

    this.game.init();
    this.setupNext();
  }

  showEnterGameId(): void {
    this.enterGameIdVisible = true;
  }

  getGameId(): number {
    return this.gameId;
  }

  hideEnterGameId(): void {
    this.enterGameIdVisible = false;
  }

  showNewMultiplayerGameCreateWithId(gameId: number): void {
    this.gameId = gameId;
    this.newMultiplayerGameCreatedVisible = true;
  }

  hideNewMultiplayerGameCreateWithId(): void {
    this.newMultiplayerGameCreatedVisible = false;
  }

  hideCreateOrJoinGame(): void {
    this.multiplayerOptionsCreateOrJoinVisible = false;
  }

  showMultiplayerOptionsCreateOrJoinGame(): void {
    this.multiplayerOptionsCreateOrJoinVisible = true;
  }

  hideSingleOrMultiplayerOptions(): void {
    this.singleOrMultiplayerOptionsVisible = false;
  }

  showSingleOrMultiplayerOptions(): void {
    this.singleOrMultiplayerOptionsVisible = true;
  }

  onCreateGame(): void {
    this.game.createMultiplayerGame();
  }

  onJoinGame(): void {
    this.game.joinGame();
  }

  onSinglePlayer(): void {
    this.game.changeMultiplayerConnection(new SinglePlayer());
    this.game.singlePlayerOptionSelected();
  }

  onJoinGameWithId(): void {
    this.game.joinGameWithId(this.gameId);
  }

  onMultiPlayer(): void {
    this.game.changeMultiplayerConnection(new Multiplayer());
    this.game.multiplayerOptionSelected();
  }

  showGameOver(): void {
    this.isGameOver = true;
  }

  hideGameOver(): void {
    this.isGameOver = false;
  }

  showLevelCompleted(): void {
    this.isLevelCompleted = true;
  }

  hideLevelCompleted(): void {
    this.isLevelCompleted = false;
  }

  showScore(score: number): void {
    this.score = score;
  }

  showNewLevelStart(levelNumber: number): void {
    this.backgroundLevelClass = `backgroundLevel${levelNumber}`;
    this.levelNumber  = '' + levelNumber;
  }

  showTotalLines(currentLevelLines: number): void {
    this.totalLines = '' + currentLevelLines;
  }

  setupBoard(rows: number, columns: number): void {
    this.board = this.canvasBoard.nativeElement.getContext('2d');
    this.setupGameBoard(rows, columns, this.board);
    this.cleanBoard(this.board);

    this.player2Board = this.player2CanvasBoard.nativeElement.getContext('2d');
    this.setupGameBoard(rows, columns, this.player2Board);
    this.cleanBoard(this.player2Board);
  }

  private setupGameBoard(rows: number, columns: number, board: CanvasRenderingContext2D): void {
    const BLOCK_SIZE = 30;

    board.canvas.width = columns * BLOCK_SIZE;
    board.canvas.height = rows * BLOCK_SIZE;

    board.scale(BLOCK_SIZE, BLOCK_SIZE);
  }

  ngOnInit(): void {}

  onNewGame(): void {
    this.game.newGame();
  }

  onMuteOrUnmute(): void {

    if (this.isMute){
      this.game.unMute();
    }else{
      this.game.mute();
    }

    this.isMute = !this.isMute;
  }

  drawPlayer2Piece(piece: Piece): void {
    console.log(`🚀 ~ file: app.component.ts ~ line 176 ~ AppComponent ~ drawPlayer2Piece ~ piece`, piece)
  }

  showPlayer2Score(score: number): void {
    console.log(`🚀 ~ file: app.component.ts ~ line 180 ~ AppComponent ~ showPlayer2Score ~ score`, score)
  }

  showPlayer2TotalLines(currentLevelLines: number): void {
    console.log(`🚀 ~ file: app.component.ts ~ line 184 ~ AppComponent ~ showPlayer2TotalLines ~ currentLevelLines`, currentLevelLines)
  }

  cleanLine(lineIndex: number): void {

    for (let x = 0; x < Board.ROWS + 1; x++) {
      this.board.fillStyle = '#DB83DB';
      this.board.strokeStyle = '#A09FDD';
      this.board.lineWidth = 0.1;

      this.roundRect(this.board, x, lineIndex, 1, 1, 0.3);

      this.board.fill();
      this.board.stroke();
    }
  }

  private setupNext(): void {
    this.next = this.canvasNext.nativeElement.getContext('2d');

    const BLOCK_SIZE = 20;
    const MAX_BLOCKS_PER_PIECE = 4 + 1; // extra 1 to avoid borders cut

    this.next.canvas.width = MAX_BLOCKS_PER_PIECE * BLOCK_SIZE;
    this.next.canvas.height = MAX_BLOCKS_PER_PIECE * BLOCK_SIZE;

    this.next.scale(BLOCK_SIZE, BLOCK_SIZE);
  }

  drawNextShape(nextShape: Shape): void {
    const shapeMiddleX = nextShape.matrix.length / 2;
    const offsetX = Math.floor(2 - shapeMiddleX) + 0.5;
    const offsetY = 0.5;

    this.cleanNextShape();

    nextShape.matrix.forEach((row, y) => {
      row.forEach((value, x) => {
        if (value > 0) {
          this.next.strokeStyle = nextShape.strokeStyle;
          this.next.fillStyle = nextShape.fillStyle;
          this.next.lineWidth = 0.1;

          this.roundRect(this.next, x + offsetX, y + offsetY, 1, 1, 0.3);

          this.next.fill();
          this.next.stroke();
        }
      });
    });
  }

  /**
   * Draws a rounded rectangle using the current state of the canvas.
   * If you omit the last three params, it will draw a rectangle
   * outline with a 5 pixel border radius
   * @param {CanvasRenderingContext2D} ctx
   * @param {Number} x The top left x coordinate
   * @param {Number} y The top left y coordinate
   * @param {Number} width The width of the rectangle
   * @param {Number} height The height of the rectangle
   * @param {Number} [radius = 5] The corner radius; It can also be an object to specify different radii for corners
   * @param {Number} [radius.tl = 0] Top left
   * @param {Number} [radius.tr = 0] Top right
   * @param {Number} [radius.br = 0] Bottom right
   * @param {Number} [radius.bl = 0] Bottom left
   */
  roundRect(
    ctx: CanvasRenderingContext2D,
    x: number,
    y: number,
    width: number,
    height: number,
    radius: number
  ): void {
    if (typeof radius === 'undefined') {
      radius = 5;
    }

    let allRadius = { tl: 0, tr: 0, br: 0, bl: 0 };

    if (typeof radius === 'number') {
      allRadius = { tl: radius, tr: radius, br: radius, bl: radius };
    } else {
      const defaultRadius = { tl: 0, tr: 0, br: 0, bl: 0 };

      // tslint:disable-next-line:forin
      for (const side in defaultRadius) {
        allRadius[side] = allRadius[side] || defaultRadius[side];
      }
    }

    ctx.beginPath();

    ctx.moveTo(x + allRadius.tl, y);
    ctx.lineTo(x + width - allRadius.tr, y);
    ctx.quadraticCurveTo(x + width, y, x + width, y + allRadius.tr);
    ctx.lineTo(x + width, y + height - allRadius.br);
    ctx.quadraticCurveTo(
      x + width,
      y + height,
      x + width - allRadius.br,
      y + height
    );
    ctx.lineTo(x + allRadius.bl, y + height);
    ctx.quadraticCurveTo(x, y + height, x, y + height - allRadius.bl);
    ctx.lineTo(x, y + allRadius.tl);
    ctx.quadraticCurveTo(x, y, x + allRadius.tl, y);

    ctx.closePath();
  }

  cleanNextShape(): void {
    this.next.clearRect(0, 0, this.next.canvas.width, this.next.canvas.height);
  }

  drawPiece(piece: Piece): void {
    piece.shape.matrix.forEach((row, y) => {
      row.forEach((value, x) => {
        if (value > 0) {
          const fromX = x + piece.x;
          const toY = y + piece.y;

          this.board.strokeStyle = piece.strokeStyle();
          this.board.fillStyle = piece.fillStyle();
          this.board.lineWidth = 0.1;

          this.roundRect(this.board, fromX, toY, 1, 1, 0.3);

          this.board.fill();
          this.board.stroke();
        }
      });
    });
  }

  private cleanBoard(board: CanvasRenderingContext2D): void {
    board.fillStyle = 'black';
    board.fillRect(
      0,
      0,
      board.canvas.width,
      board.canvas.height
    );
  }

  drawBoard(board: Board): void {
    this.drawGameBoard(this.board, board);
  }

  drawPlayer2Board(board: Board): void {
    this.drawGameBoard(this.player2Board, board);
  }

  private drawGameBoard(canvasBoard: CanvasRenderingContext2D, board: Board): void {
    this.cleanBoard(canvasBoard);

    board.board.forEach((row, y) => {
      row.forEach((value, x) => {

        if (value !== null) {
          canvasBoard.strokeStyle = value.strokeStyle;
          canvasBoard.fillStyle = value.fillStyle;
          canvasBoard.lineWidth = 0.1;

          this.roundRect(canvasBoard, x, y, 1, 1, 0.3);

          canvasBoard.fill();
          canvasBoard.stroke();
        }

      });
    });
  }
}


