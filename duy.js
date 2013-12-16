simply.setText({ 
  title: 'Summoner Name',
  subtitle: 'Level',
  body: 'Win/Loss'
});

var player = [
  'DuyKato',
  'timolawl',
  'neoarchangel9',
  'lifeisgood'
];

var lolApi = 'https://prod.api.pvp.net/api/lol/na/v1.1/summoner/by-name/'+player[1]+'?api_key=1e0b2bdd-8bf5-43ba-8900-e7c606344517';



var requestName = function() {
  ajax({ url: lolApi, type: 'json' }, function(data) {
    simply.setText({ title: data.name.toString() });
  });
};


var requestSummonerLevel = function (){
    ajax({ url: lolApi, type: 'json' }, function(data) {
    simply.setText({ subtitle: data.summonerLevel.toString() });      
  });
}

requestName();
requestSummonerLevel();

simply.begin();
