simply.setText({
  title: 'Result?',
  subtitle: '30/2/3',
}, true);

var locations = {
  'London,uk',
  'San+Jose,us',
  'Palo+alto,us',
};

var locationIndex = 0;

var weatherUrl = 'http://api.openweathermap.org/data/2.5/weather?q=London, uk';

var requestWeather = function(){
  ajax({ url: weatherUrl, type: 'json'}, function(data) {
    simply.setText({ subtitle: data.main.temp.toString() });
  });
};

simply.on('singleClick', function(e){
  if(e.button == 'select'){
    requestWeather();
  }
})

simply.begin();
