var lolApi = 'https://prod.api.pvp.net/api/lol/na/v1.1/summoner/by-name/duykato?api_key=1e0b2bdd-8bf5-43ba-8900-e7c606344517';

var requestName = function() {
  ajax({ url: lolApi, type: 'json' }, function(data) {
    simply.setText({ subtitle: data.name.toString() });
  });
};

requestName();



simply.begin();
