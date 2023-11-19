import { describe, expect, it } from '@jest/globals';
import { getPieces } from './main.test';

describe('tetris piece', () => {
  it('tetris square should have a shape like 1,1|1,1', () => {
    const square = getPieces('square');
    
    expect(square.getShape()).toBe('1,1|1,1');
  });
  
  it('tetris square should have a shape like 1,1|1,1 after rotation', () => {
    const square = getPieces('square');
    square.rotate();
    
    expect(square.getShape()).toBe('1,1|1,1');
  });
  
  it('tetris line should have a shape like 1,1,1,1', () => {
    const line = getPieces('line');
    
    expect(line.getShape()).toBe('1,1,1,1');
  });
  
  it('tetris line should have a shape like 1|1|1|1 after rotation', () => {
    const line = getPieces('line');
    line.rotate();
    
    expect(line.getShape()).toBe('1|1|1|1');
  });
  
  it('tetris line should have a shape like 1,1,1,1 after 2 rotations', () => {
    const line = getPieces('line');
    line.rotate();
    line.rotate();
    
    expect(line.getShape()).toBe('1,1,1,1');
  });
  
  it('tetris T should have a shape like 0,1,0|1,1,1', () => {
    const T = getPieces('T');
    
    expect(T.getShape()).toBe('0,1,0|1,1,1');
  });
  
  it('tetris T should have a shape like 1,0|1,1|1,0 after rotation', () => {
    const T = getPieces('T');
    T.rotate();
    
    expect(T.getShape()).toBe('1,0|1,1|1,0');
  });
  
  it('tetris T should have a shape like 1,1,1|0,1,0 after 2 rotations', () => {
    const T = getPieces('T');
    T.rotate();
    T.rotate();
    
    expect(T.getShape()).toBe('1,1,1|0,1,0');
  });
  
  it('tetris T should have a shape like 0,1,0|1,1,1 after 3 rotations', () => {
    const T = getPieces('T');
    T.rotate();
    T.rotate();
    T.rotate();
    
    expect(T.getShape()).toBe('0,1,0|1,1,1');
  });
});