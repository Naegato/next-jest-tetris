import { describe, expect, it } from '@jest/globals';
import { getGame, getMap, getPieces } from './main.test';

describe('tetris game control', () => {
  it('should a gamePiece go left when command are l', () => {
    const game = getGame(getMap(), getPieces('square'));
    
    game.control('l');
    
    expect(game.getPiece()?.getPosition()).toEqual({ x: 4, y: 21 });
  });
  
  it('should a gamePiece go right when command are r', () => {
    const game = getGame(getMap(), getPieces('square'));
    
    game.control('r');
    
    expect(game.getPiece()?.getPosition()).toEqual({ x: 6, y: 21 });
  });
  
  it('should a gamePiece go down when command are d', () => {
    const game = getGame(getMap(), getPieces('square'));
    
    game.control('d');
    
    expect(game.getPiece()?.getPosition()).toEqual({ x: 5, y: 20 });
  });
  
  it('should a gamePiece go left three times when command are lll', () => {
    const game = getGame(getMap(), getPieces('square'));
    
    game.control('lll');
    
    expect(game.getPiece()?.getPosition()).toEqual({ x: 2, y: 21 });
  });
  
  it('A game piece cant go left if is near the wall', () => {
    const game = getGame(getMap(), getPieces('square'));
    
    game.control('lllllll');
    
    expect(game.getPiece()?.getPosition()).toEqual({ x: 0, y: 21 });
  });
});