export class TetrisLine {
  private shape: string = '1,1,1,1';
  
  getShape() {
    return this.shape;
  }
  
  rotate() {
    if ( this.shape === '1,1,1,1' ) {
      this.shape = '1|1|1|1';
    } else {
      this.shape = '1,1,1,1';
    }
  }
}