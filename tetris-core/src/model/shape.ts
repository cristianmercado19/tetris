export class Shape {
  matrix: number[][];
  strokeStyle: string;
  fillStyle: string;

  clone(): Shape {
    const clone = new Shape();

    clone.matrix = JSON.parse(JSON.stringify(this.matrix));
    clone.strokeStyle = this.strokeStyle;
    clone.fillStyle = this.fillStyle;

    return clone;
  }

  rotate(): void {
    const N = this.matrix.length - 1;   // use a constant
    // use arrow functions and nested map;
    const result = this.matrix.map((row, i) => 
         row.map((val, j) => this.matrix[N - j][i])
    );
    this.matrix.length = 0;       // hold original array reference
    this.matrix.push(...result);  // Spread operator
  }
}