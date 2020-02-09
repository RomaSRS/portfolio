// jshint esversion: 8
require("babel-core/register");
require("babel-polyfill");

import {Controller} from './controller';
import {View} from './view';
import {Model} from './model';

window.addEventListener('DOMContentLoaded', function () {
  document.body.style.height = `${window.innerHeight}px`;

  Model.createHtmlElements();
  Controller.addEventListeners();
  Model.getCoordsByCity();
});