import {View} from './view.js';

export let Model = {
  dataWeather: null,
  userLocation: null,
  lang: localStorage.getItem('language') || 'en',

  getCurrentUserLocation: async function() {
    let url,
      queryApi = `https://ipinfo.io/json?`,
      accessKey = `token=c2a09f5b7265ff`;
      url = queryApi + accessKey;
      
      let res = await fetch(url);
      let data = await res.json();
        
      this.getCoordsByCity(data.city);
  },    

  getLinkToImage: async function () {
    let dataWeather = this.dataWeather;
    let season = dataWeather.season;
    let time = dataWeather.timeOfDay;
    
    let url,
      queryApi = `https://api.unsplash.com/photos/random?orientation=landscape&query=`,
      queries = `${season},${time},${dataWeather.currently.icon}`,
      accessKey = `&client_id=f5702d603a0b6c8cd1f38a27cdf39d99cbfad99ce3a6453610e7fbcc3dd1be33`;
    
      url = queryApi + queries + accessKey;

      let res = await fetch(url);
      let data = await res.json();

      View.showBackgroundImage(data.urls.regular);        
  },

  getWeather: async function () {
    let userLocation = this.userLocation;
    let lang = this.lang;
    let url,
      proxyUrl = 'https://cors-anywhere.herokuapp.com/',
      query = 'https://api.darksky.net/forecast/',
      secretKey = '032ac0bad2771605f8ff2a580a9be706',
      geo = `/${userLocation.loc}?lang=${lang}`;
      
      url = proxyUrl + query + secretKey + geo;
      let res = await fetch(url);  
      let data = await res.json();
      
      this.dataWeather = data;  
      this.getDateForLinkToImage();    
      this.getLinkToImage();

      View.showDaysWeek();
      View.changeIcons();
      View.changeTime();
  },
  getDateForLinkToImage: function () {
    let dateNow = new Date();
    let dataWeather = this.dataWeather;

    let months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

    let month = months[dateNow.getMonth()];

    if (months.indexOf(month) > 1 & months.indexOf(month) < 5) 
        dataWeather.season = 'spring';
    else if (months.indexOf(month) > 4 & months.indexOf(month) < 8)
        dataWeather.season = 'summer';
    else if (months.indexOf(month) > 7 & months.indexOf(month) < 11)
        dataWeather.season = 'autumn';
    else dataWeather.season = 'winter';

    let hour = dateNow.getHours();  
    if (hour >= 3 & hour < 9)
        dataWeather.timeOfDay = 'morning';
    else if (hour >= 9 & hour < 15)
        dataWeather.timeOfDay = 'afternoon';
    else if (hour >= 15 & hour < 21)
        dataWeather.timeOfDay = 'evening';
    else dataWeather.timeOfDay = 'night';
},

  async getCoordsByCity(city) {
    if (!city) {
      this.getCurrentUserLocation();
    } else {
      const { lang } = this;
      document.querySelector(`option.${lang}`).selected = true;

      const queryApi = 'https://api.opencagedata.com/geocode/v1/json?';
      const accessKey = `q=${city}&key=ddc1c7bc04434a968ca2655d83467aee&pretty=1&no_annotations=1&language=${lang}`;
      const url = queryApi + accessKey;
      const res = await fetch(url);
      const data = await res.json();
      this.userLocation = data;
      const { userLocation } = this;

      userLocation.loc = `${data.results[0].geometry.lat},${data.results[0].geometry.lng}`;

      View.changeInfoCityCountry();
      this.changeDataGeolocation();
      this.getWeather();
      View.showMap();
    }
  },

  getCityFromVoice() {
    window.SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    const recognition = new SpeechRecognition();
    recognition.interimResults = true;
    recognition.addEventListener('result', (e) => {
      if (e.results[0].isFinal) {
        const city = e.results[0][0].transcript;
        document.querySelector('#data-search-city').value = city;
        this.getCoordsByCity(city);
      }
    });
    recognition.start();
  }    
    changeElementsLanguage: function () {        
      this.CoordinatesOtherLang();
      let lang = this.lang;
      let arrayOfWords = [];to obtain the name of the city of voices);
      arrayOfWords.push(document.querySelector('.day-week-second').innerText);
      arrayOfWords.push(document.querySelector('.day-week-third').innerText);

      arrayOfWords.push(document.querySelector('li.summary').innerHTML);
  
      let dateNow = new Date();

      let options = {timeZone: this.dataWeather.timezone, weekday: 'short', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit'};
      let textHeader3 = dateNow.toLocaleString([this.lang], options);

      textHeader3 = textHeader3.split(' ');
      arrayOfWords.push(textHeader3[2]);
      open
      arrayOfWords = arrayOfWords.join(', ');
 
      async function TEST() {            
        let url,
        query = 'https://api.darksky.net/forecast/',
        secretKey = '032ac0bad2771605f8ff2a580a9be706'; 
        url = `https://translate.yandex.net/api/v1.5/tr.json/translate?key=trnsl.1.1.20191130T110548Z.6f4de0dc48c49659.aae3063cbc52820b92300a5990f86052fd1a893b&text=${arrayOfWords}&lang=${lang}`;
        let res = await fetch(url);  
        let data = await res.json();  
        data.text = data.text[0].split(', ');
        document.querySelector('.day-week-first').innerText = data.text[0];
        document.querySelector('.day-week-second').innerText = data.text[1];
        document.querySelector('.day-week-third').innerText = data.text[2];
        document.querySelector('li.summary').innerHTML = data.text[3];
        textHeader3[2] = data.text[4];
        document.querySelector('.info h3').innerHTML = `${textHeader3.join(' ')}`;
      }  
      
      changeElementsLanguage: function () {        
        this.CoordinatesOtherLang();
        let lang = this.lang;
        let arrayOfWords = [];to obtain the name of the city of voices);
        arrayOfWords.push(document.querySelector('.day-week-second').innerText);
        arrayOfWords.push(document.querySelector('.day-week-third').innerText);
        arrayOfWords.push(document.querySelector('li.summary').innerHTML);
        TEST();
        TEST
        let config = {
          feels: {
          'ru': 'Ощущается, как',
          'be': 'Адчуваецца як',
          'en': 'Feels like'
          },

          wind: {
            'ru': 'Ветер',
            'be': 'Вецер',
            'en': 'Wind'  
          },
          
          humidity: {
            'ru': 'Влажность',
            'be': 'Вільготнасць',
            'en': 'Humidity'  
          },

          days: [
            {'ru': 'Понедельник', 'be': 'Панядзелак', 'en': 'Monday'},
            {'ru': 'Вторник', 'be': 'Аўторак', 'en': 'Tuesday'},
            {'ru': 'Среда', 'be': 'Серада', 'en': 'Wednesday'},
            {'ru': 'Четверг', 'be': 'Чацвер', 'en': 'Thursday'},
            {'ru': 'Пятница', 'be': 'Пятніца', 'en': 'Friday'},
            {'ru': 'Суббота', 'be': 'Субота', 'en': 'Saturday'},
            {'ru': 'Воскресенье', 'be': 'Нядзеля', 'en': 'Sunday'},
          ]
        };

        let strFeels = document.querySelector('li.feels-like').innerHTML.split(':');
        let strWind = document.querySelector('li.wind').innerHTML.split(':');
        let strHumidity = document.querySelector('li.humidity').innerHTML.split(':');

        document.querySelector('li.feels-like').innerHTML = config.feels[lang] + ': ' + strFeels[1];
        document.querySelector('li.wind').innerHTML = config.wind[lang] + ': ' + strWind[1];
        document.querySelector('li.humidity').innerHTML = config.humidity[lang] + ': ' + strHumidity[1];
  
        View.displayCoords();    
}

  CoordinatesOtherLang: async function () {
    let lang = Model.lang;
    let city = document.querySelector('#data-search-city').value || 'Minsk';
    let url,
    queryApi = `https://api.opencagedata.com/geocode/v1/json?`,
    accessKey = `q=${city}&key=3ef002fdc8f540119f1c4d2e00e2c0f8=1&no_annotations=1&language=${lang}`;  
    url = queryApi + accessKey;
    let res = await fetch(url);
    let data = await res.json();
    Model.userLocation = data;
    Model.userLocation.loc = `${data.results[0].geometry.lat},${data.results[0].geometry.lng}`;
    Model.changeDataGeolocation();
    View.changeInfoCityCountry();   
  }

  changeDataGeolocation: function () {
    let userLocation = this.userLocation;
    let coords = [];
    let location = userLocation.loc.split(',');
    location.forEach(element => {    
      element = (element*1).toFixed(2);
      coords.push(element.split('.'));
    });
    userLocation.coords = coords;
    View.displayCoords(); 
  }

  createHtmlElements: function () {
    const markup = `
      <header>
        <div class="control-panel">
        <div class="button-change-background" id="button-change-background"></div>
          <form action="#" class="change-language">
          <select name="" id="change-language">
          <option class="en" value="en">en</option>
          <option class="ru" value="ru">ru</>
          <option class="be" value="be">be</option>
        </select>
        </form>
        <div class="buttons-change-temperature-units">
          <div class="button-fahrenheit">&ordm; f</div>
          <div class="button-celsius">&ordm; c</div>
        </div>           
        </div>
        <form action="#" class="form-search">    
            <input type="search" id="data-search-city" placeholder="Search city or ZIP"/>
            <input type="submit" id="search-city" value="search"/>
          <div class="voice-search"></div>        
        </form>  
      </header>
      <div class="wrapper">
      <div class="weather">
      <div class="weather__today">
      <div class="info">        
        <h1></h1>                         
        <h3></h3>                
      </div>
      <div class="temperature-summary">                    
        <p class="temperature"></p>
        <img src="" alt="" class="icon-weather">
        <ul>
          <li class="summary"></li>
          <li class="feels-like"></li>
          <li class="wind"></li>
          <li class="humidity"></li>
         </ul>
      </div>
      </div>
      <div class="weather__three-days">
      <div class="weather__three-days__first">
        <p class="day-week day-week-first"></p>
        <div class="info-day">
        <p class="day-temperature"></p>
        <img src="" alt="" class="day-icon">
        </div>                        
      </div>
      <div class="weather__three-days__second">
        <p class="day-week day-week-second"></p>
        <div class="info-day">
        <p class="day-temperature"></p>
        <img src="" alt="" class="day-icon">
      </div>
      </div>
      <div class="weather__three-days__third">
        <p class="day-week day-week-third"></p>
        <div class="info-day">
        <p class="day-temperature"></p>
        <img src="" alt="" class="day-icon">
      </div>
      </div>
    </div>
  </div>
  <div class="geolocation">
  <div class="geolocation__map">
  <div class="map" id="map"></>                
  </>
  <div class="geolocation__coordinates">
    <p class="latitude"></p>
    <p class="longitude"></p>
  </div>
  </div>
  </div>
  ;
  document.body.innerHTML = markup;
  }
};