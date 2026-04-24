import { Start } from "./app/Start"
import { store } from "./store"

document.querySelector('#start')?.addEventListener('click', () => {
    store.getState().dispatch(Start);
})
