simply.setText({
  title: 'Result?',
  subtitle: '30/2/3',
  body: 'Heimerdinger'
}, true);

var weatherUrl = 'http://api.openweathermap.org/data/2.5/weather?q=London, uk';

var requestWeather = function(){
  ajax({ url: weatherUrl, type: 'json'}, function(data) {
    simply.setText({ subtitle: data.main.temp});
  });
};

simply.on('singleClick', function(e){
  if(e.button=='select'){
    requestWeather();
  }
})

simply.begin();
