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
const $speed = document.querySelector('#speed') as Element;
const canvasRendering = new CanvasRenderer('canvas');
store.subscribe(state => {
  $gameTime.textContent = state.data.get('timeSpentSeconds').toString();
  $direction.textContent = state.data.get('direction');
  $speed.textContent = state.data.get('speedMs').toString();
  canvasRendering.tick(state.data);
});
