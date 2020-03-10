import { board } from './board';

export const INITIAL_PLAYER_STATE = {
  position: 0,
  buttons: 5,
  hasSevenBySeven: false,
  score: null,
  board,
};

export const MOVE_TYPES = {
  PIECE: 0,
  BUTTON: 1,
};