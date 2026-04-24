import { Pause } from './app/Pause';
import { Start } from './app/Start';
import { store } from './store';

document.querySelector('#start')?.addEventListener('click', () => {
  store.getState().dispatch(Start);
});
document.querySelector('#pause')?.addEventListener('click', () => {
  store.getState().dispatch(Pause);
});
