export class TetrisSquare {
  private shape: string = '1,1|1,1';
  
  getShape() {
    return this.shape;
  }
  
  rotate() {
    this.shape = '1,1|1,1';
  }
}