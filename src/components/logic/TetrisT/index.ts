export class TetrisT {
  private shape: string = '0,1,0|1,1,1';
  
  getShape() {
    return this.shape;
  }
  
  rotate() {
    if ( this.shape === '0,1,0|1,1,1' ) {
      this.shape = '1,0|1,1|1,0';
    } else if ( this.shape === '1,0|1,1|1,0' ) {
      this.shape = '1,1,1|0,1,0';
    } else {
      this.shape = '0,1,0|1,1,1';
    }
  }
}