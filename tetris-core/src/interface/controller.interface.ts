export interface Controller {
	unlock(): void;
	lock(): void;
  onMoveDown(moveDown: () => void): void;
  onMoveRight(moveRight: () => void): void;
  onMoveLeft(moveLeft: () => void): void;
  onRotate(rotate: () => void): void;
}