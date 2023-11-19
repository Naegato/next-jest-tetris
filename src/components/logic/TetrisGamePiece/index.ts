import { TetrisSquare } from '@/components/logic/TetrisSquare';
import { TetrisLine } from '@/components/logic/TetrisLine';
import { TetrisT } from '@/components/logic/TetrisT';

export class GamePiece {
  private shape: string;
  private position?: { x: number, y: number };
  private status: 'placed' | 'moving' = 'moving';
  
  constructor(piece: TetrisSquare | TetrisLine | TetrisT) {
    this.shape = piece.getShape();
  }
  
  setPosition(position: { x: number, y: number }) {
    this.position = position;
    if ( this.position.y === 0 ) {
      this.setStatus('placed');
    }
    return this;
  }
  
  getPosition() {
    return this.position;
  }
  
  setStatus(status: 'placed' | 'moving') {
    this.status = status;
    return this;
  }
  
  getStatus() {
    return this.status;
  }
  
  getShape() {
    return this.shape;
  }
}