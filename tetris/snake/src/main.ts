import { Pause } from './app/Pause';
import { Start } from './app/Start';
import { CanvasRenderer } from './rendering/CanvasRenderer';
import { store } from './store';

document.querySelector('#start')?.addEventListener('click', () => {
  store.getState().dispatch(Start);
});
document.querySelector('#pause')?.addEventListener('click', () => {
  store.getState().dispatch(Pause);
});
const $gameTime = document.querySelector('#game-time') as Element;
const $direction = document.querySelector('#direction') as Element;
const $speed = document.querySelector('#speed') as Element;
const canvasRendering = new CanvasRenderer('canvas');
store.subscribe(state => {
  $gameTime.textContent = state.timeSpentSeconds.toString();
  $direction.textContent = state.direction;
  $speed.textContent = state.speedMs.toString();
  canvasRendering.tick(state);
});
