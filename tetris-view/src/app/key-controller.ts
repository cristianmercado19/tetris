import { Controller } from 'tetris-core/dist/interface/controller.interface';

export class KeyController implements Controller {
  private moveDown: () => void;
  private moveRight: () => void;
  private moveLef: () => void;
  private rotate: () => void;

  private isAvailable = true;

  constructor() {
    document.onkeydown = (e) => {
      switch (e.which) {
        case 37: // left
          if (this.isAvailable) {
            this.moveLef();
          }
          break;

        case 38: // up
          if (this.isAvailable) {
            this.rotate();
          }
          break;

        case 39: // right
          if (this.isAvailable) {
            this.moveRight();
          }
          break;

        case 40: // down
          if (this.isAvailable) {
            this.moveDown();
          }
          break;

        default:
          return; // exit this handler for other keys
      }
      e.preventDefault(); // prevent the default action (scroll / move caret)
    };
  }

  onMoveDown(moveDown: () => void): void {
    this.moveDown = moveDown;
  }

  onMoveRight(moveRight: () => void): void {
    this.moveRight = moveRight;
  }

  onMoveLeft(moveLeft: () => void): void {
    this.moveLef = moveLeft;
  }

  onRotate(rotate: () => void): void {
    this.rotate = rotate;
  }

  lock(): void {
    this.isAvailable = false;
  }

  unlock(): void {
    this.isAvailable = true;
  }
}
