import {Model} from './model.js';

export let View = {
changeTemperatureUnits: function () {
  let units = localStorage.getItem('temperatureUnits') || 'celsius'; // default

  let button = document.querySelector(`.button-${units}`);
  button.classList.add('active'); // change bg button

  let data = Model.dataWeather;
  
  let averageTemp = [ (data.daily.data[0].temperatureHigh + data.daily.data[0].temperatureLow) / 2,
    (data.daily.data[1].temperatureHigh + data.daily.data[1].temperatureLow) / 2,
    (data.daily.data[2].temperatureHigh + data.daily.data[2].temperatureLow) / 2];
    
    let temperatureNextFirstDay = document.querySelector('.weather__three-days__first p.day-temperature');
    let temperatureNextSecondDay = document.querySelector('.weather__three-days__second p.day-temperature');
    let temperatureNextThirdDay = document.querySelector('.weather__three-days__third p.day-temperature');   
    let tempToday;
    
    if (units === 'celsius') {    
      temperatureNextFirstDay.innerHTML =  `${Math.round( (averageTemp[0] - 32) * 0.55 )}&ordm;`;
      temperatureNextSecondDay.innerHTML =  `${Math.round( (averageTemp[1] - 32) * 0.55 )}&ordm;`;
      temperatureNextThirdDay.innerHTML =  `${Math.round( (averageTemp[2] - 32) * 0.55 )}&ordm;`;
      tempToday = Math.round( (data.currently.temperature - 32) * 0.55 );

      let tempFeelsLike = Math.round( (data.currently.apparentTemperature - 32) * 0.55 );
        document.querySelector('li.feels-like').innerHTML = `Feels like: ${tempFeelsLike}&ordm;`;
        } else {    
          temperatureNextFirstDay.innerHTML =  `${Math.round(averageTemp[0])}&ordm;`;
          temperatureNextSecondDay.innerHTML = `${Math.round(averageTemp[1])}&ordm;`;
          temperatureNextThirdDay.innerHTML =  `${Math.round(averageTemp[2])}&ordm;`;
          tempToday = Math.round(data.currently.temperature);
          
          let tempFeelsLike = Math.round(data.currently.apparentTemperature);
            document.querySelector('li.feels-like').innerHTML = `Feels like: ${tempFeelsLike}&ordm;`;
          }

          document.querySelector('.weather__today p.temperature').innerHTML = `${tempToday}<span>&ordm;</span>`;
    },

    changeIcons: function () {
      let data = Model.dataWeather;
  
      document.querySelector('li.summary').innerText = `${data.currently.summary}`;
      document.querySelector('li.wind').innerText = `Wind: ${Math.round(data.currently.windSpeed, 1)}m/s`;
      document.querySelector('li.humidity').innerText = `Humidity: ${Math.round(data.currently.humidity * 100)}%`;  
      
      let imageWeatherToday = document.querySelector('.weather__today img');
      imageWeatherToday.src = `assets/images/${data.currently.icon}.png`;
  
      let imageNextFirstDay = document.querySelector('.weather__three-days__first img');
      let imageNextSecondDay = document.querySelector('.weather__three-days__second img');
      let imageNextThirdDay = document.querySelector('.weather__three-days__third img');   
  
      imageNextFirstDay.src = `assets/images/${data.daily.data[0].icon}.png`;
      imageNextSecondDay.src = `assets/images/${data.daily.data[1].icon}.png`;
      imageNextThirdDay.src = `assets/images/${data.daily.data[2].icon}.png`;
  
      this.changeTemperatureUnits('celsius');   // default  
      Model.changeElementsLanguage();
  },

  changeInfoCityCountry: function () {
    let info = Model.userLocation.results[0].formatted.split(',');
    let country = info[info.length-1];
    let city = info[0];  
    document.querySelector('.info h1').innerHTML = `${city}, ${country}`;
  },

  displayCoords: function () {
    let lang = localStorage.getItem('language') || 'en';
    let config = {
      'coords': {
      'lat': { 'en': 'Latitude', 'ru': 'Широта', 'be': 'Шырата'},
      'lon': {'en': 'Longitude','ru': 'Долгота', 'be': 'Даўгата'}  
      }
    };

    let coords = Model.userLocation.coords;
    document.querySelector('.latitude').innerHTML = `${config.coords.lat[lang]}: <span>${coords[0][0]}&ordm;${coords[0][1]}'</span>`;
    document.querySelector('.longitude').innerHTML = `${config.coords.lon[lang]}: <span>${coords[1][0]}&ordm;${coords[1][1]}'</span>`;  
  },

  showBackgroundImage: function (url) {
    document.body.style.background = 'url(" ${url} ") 100% 100% no-repeat no-repeat';
    document.body.style.backgroundSize = 'cover'; 
  }, 

  showDaysWeek: function () {
    let dateNow = new Date();
    let days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];        
    document.querySelector('.day-week-first').innerText = days[dateNow.getDay()+1>6 ? (dateNow.getDay()+1) % 7:dateNow.getDay()+1];
    document.querySelector('.day-week-second').innerText = days[dateNow.getDay()+2>6 ?(dateNow.getDay()+2) % 7:dateNow.getDay()+2];
    document.querySelector('.day-week-third').innerText = days[dateNow.getDay()+3>6 ? (dateNow.getDay()+3) % 7:dateNow.getDay()+3];
  },

  changeTime: function () {
    function update() {
      const dateNow = new Date();
      const options = {
        timeZone: Model.dataWeather.timezone, weekday: 'short', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit',
      };
      document.querySelector('.info h3').innerHTML = `${dateNow.toLocaleString([Model.lang], options)}`;
    }
    update();
    setInterval(update, 60000);
  },
  showMap: function () {
    mapboxgl.accessToken = 'pk.eyJ1Ijoicm9tYXNycyIsImEiOiJjazRkN2d5NXgwMDQ4M2VwOXFmbWdrZmd6In0.H7FohLB6OYGBK59P9cu3Ow';
    let map = new mapboxgl.Map({
      container: 'map',
      style: 'mapbox://styles/mapbox/streets-v9'
      center: [longitude, latitude],
      zoom: 2,
    });
    
    let size = 50;
    let pulsingDot = {
      width: size,
      height: size,
      data: new Uint8Array(size * size * 4),
              
      onAdd: function() {
        let canvas = document.createElement('canvas');
        canvas.width = this.width;
        canvas.height = this.height;
        this.context = canvas.getContext('2d');
      },

      render: function() {
        let duration = 1000;
        let t = (performance.now() % duration) / duration;
        
        let radius = size / 2 * 0.3;
        let outerRadius = size / 2 * 0.7 * t + radius;
        let context = this.context;
        
        context.clearRect(0, 0, this.width, this.height);
        context.beginPath();
        context.arc(this.width / 2, this.height / 2, outerRadius, 0, Math.PI * 2);
        context.fillStyle = 'rgba(255, 200, 200,' + (1 - t) + ')';
        context.fill();
        context.beginPath();
        context.arc(this.width / 2, this.height / 2, radius, 0, Math.PI * 2);
        context.fillStyle = 'rgba(255, 100, 100, 1)';
        context.strokeStyle = 'white';
        context.lineWidth = 2 + 4 * (1 - t);
        context.fill();
        context.stroke();

        this.data = context.getImageData(0, 0, this.width, this.height).data;
        map.triggerRepaint();
        return true;
      }
    };

    function showGeolocationOnMap() {        
      let coords = Model.userLocation.loc.split(',');
      map.addImage('pulsing-dot', pulsingDot, { pixelRatio: 2 });
      map.addLayer({
        "id": "points",
        "type": "symbol",
        "source": {
          "type": "geojson",
          "data": {
            "type": "FeatureCollection",
            "features": [{
              "type": "Feature",
              "geometry": {
                "type": "Point",
                "coordinates": [coords[1], coords[0]]
              }
            }]
          }
        },
        
        "layout": {
          "icon-image": "pulsing-dot"
        }
      });
    }
    
    map.on('load', function () {   
      showGeolocationOnMap();    
    });
  }
};