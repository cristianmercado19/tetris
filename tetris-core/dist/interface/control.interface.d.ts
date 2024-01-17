export interface Control {
    onMoveDown(moveDown: () => void): void;
    onMoveRight(moveRight: () => void): void;
    onMoveLeft(moveLeft: () => void): void;
}
