import { Difficulty } from './app/Difficulty';
import { Pause } from './app/Pause';
import { Start } from './app/Start';
import { CanvasRenderer } from './rendering/CanvasRenderer';
import { dispatchStore, store } from './store';
import './style.css';

document.querySelector('#start')?.addEventListener('click', () => {
  dispatchStore(Start);
});
document.querySelector('#pause')?.addEventListener('click', () => {
  dispatchStore(Pause);
});
const $gameTime = document.querySelector('#game-time') as Element;
const $direction = document.querySelector('#direction') as Element;
const $difficulty = document.querySelector('#difficulty') as Element;
const $status = document.querySelector('#status') as Element;
const $reason = document.querySelector('#reason') as Element;
const canvasRendering = new CanvasRenderer('canvas');
store.subscribe(state => {
  $gameTime.textContent = state.data.get('timeSpentSeconds').toString();
  $direction.textContent = state.data.get('direction');
  $difficulty.textContent = Difficulty(state.data).toString();
  $status.textContent = state.data.get('gameStep');
  const gameOverReason = state.data.get('gameOverReason');
  if (gameOverReason) {
    $reason.textContent = ` (${gameOverReason})`;
  }
  canvasRendering.tick(state.data);
});
