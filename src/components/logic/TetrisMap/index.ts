export type TetrisMapProps = {
  height?: number;
  width?: number;
}

export class TetrisMap {
  
  private height: number;
  private width: number;
  
  constructor(props?: TetrisMapProps) {
    if ( props?.height && props.height < 6 ) throw new Error('Height must be superior or equal to 6');
    if ( props?.width && props.width < 6 ) throw new Error('Width must be superior or equal to 6');
    
    this.height = props?.height || 20;
    this.width = props?.width || 10;
  }
  
  getDimension() {
    return {
      height: this.height,
      width: this.width,
    }
  }
}