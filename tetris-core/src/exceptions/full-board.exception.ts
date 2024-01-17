export class FullBoardException extends Error {
  constructor() {
    super('No space on top for new piece');
    Object.setPrototypeOf(this, FullBoardException.prototype);
  }
}
