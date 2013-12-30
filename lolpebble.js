var lolApiUrl = 'https://prod.api.pvp.net/api/lol/na/v1.1';
var lolApiKey = 'api_key=1e0b2bdd-8bf5-43ba-8900-e7c606344517';

var League = {};

// Gets Player ID from Riot API.
League.requestSummonerId = function(player, callback) {
  simply.text({ title: player.name }, true);
  var url = lolApiUrl+'/summoner/by-name/'+player.name+'?'+lolApiKey;
  ajax({ url: url, type: 'json' }, function(data) {
    player.id = data.id;
    if (callback) { callback(player); }
  });
};

// Gets Characters from Riot API.
League.requestChampions = function(callback) {
  var url = lolApiUrl + '/champion'+'?' + lolApiKey;
  ajax({ url: url, type: 'json' }, function(data) {
    League.Champions = data.champions;
    League.makeChampionMap();
    if (callback) { callback(data); }
  });
};

// Creates a map for all LOL Characters.
League.makeChampionMap = function() {
  var champions = League.Champions;
  var map = {};
  for (var i = 0; i < champions.length; ++i) {
    var champion = champions[i];
    map[champion.id] = champion;
  }
  League.ChampionsById = map;
  return map;
};



simply.text({
    body: 'hello world.'
});
