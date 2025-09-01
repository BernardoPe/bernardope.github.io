export class SpatialGrid {
  private cellSize: number;
  private cols: number;
  private rows: number;
  private cells: number[][] = [];

  constructor(width: number, height: number, cellSize: number) {
    this.cellSize = cellSize;
    this.cols = Math.ceil(width / cellSize);
    this.rows = Math.ceil(height / cellSize);
    this.rebuild();
  }

  rebuild() {
    const totalCells = this.cols * this.rows;
    this.cells = Array.from({ length: totalCells }, () => []);
  }

  insert(particleIndex: number, x: number, y: number) {
    const col = Math.max(0, Math.min(this.cols - 1, Math.floor(x / this.cellSize)));
    const row = Math.max(0, Math.min(this.rows - 1, Math.floor(y / this.cellSize)));
    this.cells[row * this.cols + col].push(particleIndex);
  }

  forEachNeighborPair(callback: (i: number, j: number) => void) {
    for (let cy = 0; cy < this.rows; cy++) {
      for (let cx = 0; cx < this.cols; cx++) {
        const baseIndex = cy * this.cols + cx;

        for (let oy = -1; oy <= 1; oy++) {
          for (let ox = -1; ox <= 1; ox++) {
            const nx = cx + ox;
            const ny = cy + oy;
            if (nx < 0 || ny < 0 || nx >= this.cols || ny >= this.rows) continue;

            const cellA = this.cells[baseIndex];
            const cellB = this.cells[ny * this.cols + nx];

            for (let i = 0; i < cellA.length; i++) {
              const particleA = cellA[i];
              const startJ = cellA === cellB ? i + 1 : 0;

              for (let j = startJ; j < cellB.length; j++) {
                const particleB = cellB[j];
                if (particleA !== particleB) {
                  callback(particleA, particleB);
                }
              }
            }
          }
        }
      }
    }
  }
}
