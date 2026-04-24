import { Pause } from './app/Pause';
import { Start } from './app/Start';
import { store } from './store';

document.querySelector('#start')?.addEventListener('click', () => {
  store.getState().dispatch(Start);
});
document.querySelector('#pause')?.addEventListener('click', () => {
  store.getState().dispatch(Pause);
});
const $gameTime = document.querySelector('#game-time') as Element;
const $direction = document.querySelector('#direction') as Element;
store.subscribe(state => {
  $gameTime.textContent = state.timeSpentSeconds.toString();
  $direction.textContent = state.direction;
});
