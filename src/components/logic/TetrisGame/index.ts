import { TetrisMap } from '@/components/logic/TetrisMap';
import { GamePiece } from '@/components/logic/TetrisGamePiece';

export class TetrisGame {
  private map: TetrisMap;
  private pieces: GamePiece[] = [];
  private status?: 'started' | 'stop';
  
  constructor(map: TetrisMap, piece?: GamePiece) {
    this.map = map;
    
    const dimension = this.map.getDimension();
    
    if ( piece ) {
      this.pieces.push(piece.setPosition({x: Math.round(dimension.width / 2), y: dimension.height + 1}));
      this.status = 'started';
    }
  }
  
  getMap() {
    return this.map;
  }
  
  addPiece(piece: GamePiece) {
    if ( !this.isStarted() ) this.status = 'started';
    const dimension = this.map.getDimension();
    this.pieces.push(piece.setPosition({x: Math.round(dimension.width / 2), y: dimension.height + 1}));
    return piece;
  }
  
  getPiece() {
    return this.pieces.find((piece) => piece.getStatus() === 'moving');
  }
  
  getLastPiece() {
    return this.pieces[this.pieces.length - 1];
  }
  
  isStarted() {
    return this.status === 'started';
  }
  
  isStop() {
    return this.status === 'stop';
  }
  
  iterate() {
    if ( !this.isStarted() ) {
      if ( this.isStop() ) {
        throw new Error('Game is Stop')
      }
      
      throw new Error('Game is not started')
    }
    
    const piece = this.getPiece();
    if ( piece ) {
      const position = piece.getPosition();
      if ( !position ) throw new Error('No position');
      
      const shape = piece.getShape();
      
      const explodedShape = shape.split('|');
      const explodedShapeLength = explodedShape.length;
      
      const nextPlannedPosition = { x: position.x, y: position.y - 1 };
      
      const haveAnotherPieceAtNextSupposedPosition = this.pieces.some((gamePiece) => {
        const gamePiecePosition = gamePiece.getPosition();
        if ( !gamePiecePosition ) throw new Error('No position');
        
        const gamePieceShape = gamePiece.getShape();
        
        const explodedGamePieceShape = gamePieceShape.split('|').reverse();
        const explodedGamePieceShapeLength = explodedGamePieceShape.length;
        
        for ( let i = 0; i < explodedGamePieceShapeLength; i++ ) {
          const row = explodedGamePieceShape[i];
          
          for ( let j = 0; j < row.length; j++ ) {
            if ( row[j] === '1' ) {
              if ( nextPlannedPosition.x === gamePiecePosition?.x + j && nextPlannedPosition.y === gamePiecePosition?.y + i ) {
                return true;
              }
            }
          }
        }
      });
      
      if ( !haveAnotherPieceAtNextSupposedPosition ) {
        piece.setPosition({ x: position.x, y: position.y - 1 });
      } else {
        piece.setStatus('placed');
        ((piece.getPosition()?.y || 0) + explodedShapeLength) >= this.map.getDimension().height && (this.status = 'stop');
      }
    } else {
      throw new Error('No pieces');
    }
    
    return this;
  }
  
  control(commands: string) {
    if ( !this.isStarted() ) {
      if ( this.isStop() ) {
        throw new Error('Game is Stop')
      }
      
      throw new Error('Game is not started')
    }
    
    const piece = this.getPiece();
    if ( !piece ) throw new Error('No pieces');
    
    const position = piece.getPosition();
    if ( !position ) throw new Error('No position');
    
    const command = commands[0];
    commands = commands.slice(1);
    
    if (command === 'l') {
      piece.setPosition({ x: position.x - 1, y: position.y });
    }
    
    if (command === 'r') {
      piece.setPosition({ x: position.x + 1, y: position.y });
    }
    
    if (command === 'd') {
      this.iterate();
    }
    
    if ( commands.length > 0 ) {
      this.control(commands);
    }
  }
}