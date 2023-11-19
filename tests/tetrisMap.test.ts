import { describe, expect, it } from '@jest/globals';
import { getMap } from './main.test';

describe('map', () => {
  it('blank map should have an height of 20', () => {
    const map = getMap();
    
    expect(map.getDimension().height).toBe(20);
  });
  
  it('blank map should have an width of 10', () => {
    const map = getMap();
    
    expect(map.getDimension().width).toBe(10);
  });
  
  it('map with height of 30 should have an height of 30', () => {
    const map = getMap({ height: 30 });
    
    expect(map.getDimension().height).toBe(30);
  });
  
  it('map with width of 20 should have an width of 20', () => {
    const map = getMap({ width: 20 });
    
    expect(map.getDimension().width).toBe(20);
  });
  
  it('map with height of 30 and width of 20 should have an height of 30 and width of 20', () => {
    const map = getMap({ height: 30, width: 20 });
    
    expect(map.getDimension().height).toBe(30);
    expect(map.getDimension().width).toBe(20);
  });
  
  it('map with height or width inferior to 6 should throw an error', () => {
    expect(() => getMap({ height: 5 })).toThrowError('Height must be superior or equal to 6');
    expect(() => getMap({ width: 5 })).toThrowError('Width must be superior or equal to 6');
  });
});