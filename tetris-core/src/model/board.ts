import { Piece } from "./piece";
import { BlockStyle } from "./block-style";

export class Board  {

  static COLUMNS = 10;
  static ROWS = 20;

  board: BlockStyle[][] = [];

  constructor() {
    this.clean();
  }
  
  removeLine(lineToRemove: number): void {
    const newBoard: BlockStyle[][] = []; 
    
    for(var r = 0; r < Board.ROWS; ++r)
    {
      const row = this.board[r];

      if (r !== lineToRemove) {
        newBoard.push(row);
      }
    }

    newBoard.unshift(this.createEmptyRow());

    this.board = newBoard;
  }

  isACompletedLine(): CompletedLineInfo {

    for (let rowIndex = this.board.length -1; rowIndex >= 0; rowIndex--) {
      const row = this.board[rowIndex];
      
      var completedLine = this.isRowCompleted(row);

      if (completedLine) {
        const completedLine = new CompletedLineInfo(rowIndex);
        return completedLine;
      }
    }

    return null;
  }

  private isRowCompleted(row: BlockStyle[]) {
    for (let columnIndex = 0; columnIndex < row.length; columnIndex++) {
      const value = row[columnIndex];

      if (value === null) {
        return false;
      }
    }

    return true;
  }

  freezePiece(piece: Piece) {
    const matrix = piece.shape.matrix;

    for (let rowIndex = 0; rowIndex < matrix.length; rowIndex++) {
      const row = matrix[rowIndex];
      
      for (let columnIndex = 0; columnIndex < row.length; columnIndex++) {
        
        const value = row[columnIndex];

        if (value > 0) {
          const xInBoard = columnIndex + piece.x;
          const yInBoard = rowIndex + piece.y;
          
          this.maskAsOccupied(xInBoard, yInBoard, piece);
        }
      }
    }

  }
  
  canAllocatePiece(tentativePiece: Piece): boolean {
    const matrix = tentativePiece.shape.matrix;

    for (let rowIndex = 0; rowIndex < matrix.length; rowIndex++) {
      const row = matrix[rowIndex];
      
      for (let columnIndex = 0; columnIndex < row.length; columnIndex++) {
        
        const value = row[columnIndex];

        if (value > 0) {
          const tentativeXInBoard = columnIndex + tentativePiece.x;
          const tentativeYInBoard = rowIndex + tentativePiece.y;

          if ((tentativeXInBoard < 0) || (tentativeXInBoard > Board.COLUMNS-1)|| 
              (tentativeYInBoard > Board.ROWS-1) ||
              this.isOccupied(tentativeXInBoard, tentativeYInBoard)) {
            return false;
          }
        }

      }
    }
    
    return true;
  }

  maskAsOccupied(x: number, y: number, piece: Piece): void {
    const blockStyle = new BlockStyle();
    blockStyle.fillStyle = piece.fillStyle();
    blockStyle.strokeStyle = piece.strokeStyle();

    this.board[y][x] = blockStyle;
  }

  isOccupied(x: number, y: number): boolean {
    const value = this.board[y][x];
    return value !== null;
  }

  getTopY(): number {
    return 0;
  }

  getMiddleX(): number {
    return Board.COLUMNS /2;
  }

  clean(): void {

    for(var r = 0; r < Board.ROWS; ++r)
    {
      this.board[r] = this.createEmptyRow();
    }
  }


  private createEmptyRow(): Array<BlockStyle> {
    const emptyRow: Array<BlockStyle> = [];

    for (var c = 0; c < Board.COLUMNS; ++c) {
      emptyRow[c] = null;
    }

    return emptyRow;
  }
}

export class CompletedLineInfo {
  lineIndex: number;

  constructor(lineNumber: number) {
    this.lineIndex = lineNumber;    
  }
}