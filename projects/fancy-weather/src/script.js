
require('babel-core/register');
require('babel-polyfill');

import {Controller} from './controller.js';
import {View} from './view.js';
import {Model} from './model.js';

window.addEventListener('DOMContentLoaded', () => {
  document.body.style.height = `${window.innerHeight}px`;

  Model.createHtmlElements();
  Controller.addEventListeners();
  Model.getCoordsByCity();
});