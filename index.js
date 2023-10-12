import { rootRender } from './components/cartItem.js'
import { items } from './data.js'

document.addEventListener('DOMContentLoaded', () => {
  document.querySelector('#delivery-modal').style.display = 'none';
  document.querySelector('#payment-modal-display').style.display = 'none';

  rootRender(items);


})