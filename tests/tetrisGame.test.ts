import { describe, expect, it } from '@jest/globals';
import { GamePiece } from '@/components/logic/TetrisGamePiece';
import { TetrisGame } from '@/components/logic/TetrisGame';
import { getGame, getMap, getPieces } from './main.test';

describe('tetris game', () => {
  it('should a game start only with a map and a shape', () => {
    const map = getMap();
    const game = getGame(map);
    
    expect(game.isStarted()).toBe(false);
    game.addPiece(new GamePiece(getPieces('square')));
    expect(game.isStarted()).toBe(true);
  });
  
  it('a game cannot iterate if it is not started', () => {
    const game = getGame(getMap());
    
    expect(() => game.iterate()).toThrowError('Game is not started');
  });
  
  it('when a game is started, the piece go down after iteration', () => {
    const game = getGame(getMap(), getPieces('square'));
    
    expect(game.getPiece()?.getPosition()).toEqual({ x: 5, y: 21 });
    game.iterate();
    expect(game.getPiece()?.getPosition()).toEqual({ x: 5, y: 20 });
  });
  
  it('when a game is started, the piece go down after 2 iterations', () => {
    const game = getGame(getMap(), getPieces('square'));
    
    expect(game.getPiece()?.getPosition()).toEqual({ x: 5, y: 21 });
    game.iterate();
    game.iterate();
    expect(game.getPiece()?.getPosition()).toEqual({ x: 5, y: 19 });
  });
  
  it('when a gamePiece touch the bottom, it has the status placed', () => {
    const game = getGame(getMap(), getPieces('square'));
    
    const gamePiece = game.getPiece();
    while ( gamePiece?.getPosition()?.y !== 0 ) {
      game.iterate();
    }
    expect(gamePiece?.getPosition()?.y).toEqual(0);
    expect(gamePiece?.getStatus()).toEqual('placed');
  });
  
  it('when a gamePiece touch the bottom, it cannot iterate', () => {
    const game = getGame(getMap(), getPieces('square'));
    
    const gamePiece = game.getPiece();
    while ( gamePiece?.getPosition()?.y !== 0 ) {
      game.iterate();
    }
    expect(gamePiece?.getPosition()?.y).toEqual(0);
    game.addPiece(new GamePiece(getPieces('square')));
    game.iterate();
    expect(gamePiece?.getPosition()?.y).toEqual(0);
  });
  
  it('when a gamePiece touch the top of another gamePiece, the status is placed', () => {
    const game = getGame(getMap(), getPieces('square'));
    
    const gamePiece = game.getPiece();
    while ( gamePiece?.getPosition()?.y !== 0 ) {
      game.iterate();
    }
    expect(gamePiece?.getPosition()?.y).toEqual(0);
    expect(gamePiece?.getStatus()).toEqual('placed');
    
    const secondGamePiece = new GamePiece(getPieces('square'));
    game.addPiece(secondGamePiece);
    while ( secondGamePiece.getStatus() !== 'placed' ) {
      game.iterate();
    }
    
    game.addPiece(new GamePiece(getPieces('square')));
    game.iterate();
    
    expect(secondGamePiece.getStatus()).toEqual('placed');
    expect(secondGamePiece.getPosition()?.y).toEqual(2);
  });
  
  it('when assembly of game piece touch the top of the map, the game stop', () => {
    const game = getGame(getMap());
    
    const gameHandler = (game: TetrisGame) => {
      const lastGamePiece = game.getLastPiece();
      const lastGamePiecePosition = lastGamePiece.getPosition();
      if ( lastGamePiece && lastGamePiecePosition ) {
        const lastGamePieceShapeHeight = lastGamePiece.getShape().split('|').length;
        
        if ( lastGamePiecePosition.y + lastGamePieceShapeHeight >= game.getMap().getDimension().height ) {
          return false;
        }
      }
      
      return true;
    }
    
    do {
      const gamePiece = new GamePiece(getPieces('square'));
      game.addPiece(gamePiece);
      while ( gamePiece.getStatus() !== 'placed' ) {
        game.iterate();
      }
    } while (gameHandler(game));
    
    expect(game.isStop()).toBe(true);
  });
  
  it('when the game is stopped, the game cannot iterate', () => {
    const game = getGame(getMap({ height: 6 }));
    game.addPiece(new GamePiece(getPieces('square'))).setPosition({ x: 5, y: 0 }).setStatus('placed');
    game.addPiece(new GamePiece(getPieces('square'))).setPosition({ x: 5, y: 2 }).setStatus('placed');
    game.addPiece(new GamePiece(getPieces('square'))).setPosition({ x: 5, y: 4 }).setStatus('placed');
    game.addPiece(new GamePiece(getPieces('square')));
    game.iterate().iterate();
    
    expect(game.isStop()).toBe(true);
    expect(() => { game.iterate() }).toThrowError('Game is Stop');
  });
});