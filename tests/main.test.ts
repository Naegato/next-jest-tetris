import { describe, expect, it } from '@jest/globals';
import { TetrisMap, TetrisMapProps } from '@/components/logic/TetrisMap';
import { TetrisSquare } from '@/components/logic/TetrisSquare';
import { TetrisT } from '@/components/logic/TetrisT';
import { TetrisLine } from '@/components/logic/TetrisLine';
import { GamePiece } from '@/components/logic/TetrisGamePiece';
import { TetrisGame } from '@/components/logic/TetrisGame';

export const getMap = (props?: TetrisMapProps) => {
  return new TetrisMap(props);
}

export const getPieces = (identifier: 'square' | 'line' | 'T') => {
  switch (identifier) {
    case 'square':
      return new TetrisSquare();
    case 'line':
      return new TetrisLine();
    case 'T':
      return new TetrisT();
  }
}

export const getGame = (map: TetrisMap, piece?: TetrisSquare | TetrisLine | TetrisT) => {
  const gamePiece = piece && new GamePiece(piece);
  
  return new TetrisGame(map, gamePiece);
}

describe('main', () => {
  it('should pass', () => {
    expect(true).toBe(true);
  });
});