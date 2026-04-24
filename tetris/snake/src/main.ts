import { StartGame } from "./app/StartGame"
import { store } from "./store"

document.querySelector('#start')?.addEventListener('click', () => {
    store.getState().dispatch(StartGame);
})
