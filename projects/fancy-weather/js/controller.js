import {View} from './view.js';
import {Model} from './model.js';


export let Controller = {
    addEventListeners: function () {
        let buttonChangeBackground = document.getElementById('button-change-background');
        buttonChangeBackground.addEventListener('click', () => Model.getLinkToImage());

        let buttonFahrenheit = document.querySelector('.button-fahrenheit');
        let buttonCelsius = document.querySelector('.button-celsius');

        buttonFahrenheit.addEventListener('click', () => {
            buttonFahrenheit.classList.add('active');
            buttonCelsius.classList.remove('active');
            localStorage.setItem('temperatureUnits', 'fahrenheit');
            View.changeTemperatureUnits();
        });
        buttonCelsius.addEventListener('click', () => {
            buttonFahrenheit.classList.remove('active');
            buttonCelsius.classList.add('active');
            localStorage.setItem('temperatureUnits', 'celsius');
            View.changeTemperatureUnits();
        });

        let buttonSearchCity = document.querySelector('#search-city');
            buttonSearchCity.addEventListener('click', (e) => {
            e.preventDefault();
            
            let city = document.querySelector('#data-search-city').value;
            Model.getCoordsByCity(city);
        });


        let select = document.querySelector('select#change-language');
        select.addEventListener('change', () => {
            localStorage.setItem('language', select.value);
            Model.lang = select.value;
            Model.changeElementsLanguage();
        });

        let voiceSearch = document.querySelector('.voice-search');
        voiceSearch.addEventListener('click', () => {
            document.querySelector('#data-search-city').value = 'Please, Saying the city...';
            Model.getCityFromVoice();
        });
    },
};