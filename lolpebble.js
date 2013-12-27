/*global ajax, simply*/

var lolDuy = {
  playerNames: [
    'DuyKato',
    'timolawl',
    'neoarchangel9',
    'lifeisgood',
    'pr0j3kt',
  ],
  players: [],
  playerIndex: 0,
  summaryType: 'RankedSolo5x5',
  season: 'SEASON3',
};

var initPlayers = function() {
  var playerNames = lolDuy.playerNames;
  for (var i = 0, ii = playerNames.length; i < ii; ++i) {
    lolDuy.players[i] = {
      name: playerNames[i],
      id: '',
      summary: { losses: 0, wins: 0 },
    };
  }
};

var lolApiUrl = 'https://prod.api.pvp.net/api/lol/na/v1.2';
var lolApiKey = 'api_key=1e0b2bdd-8bf5-43ba-8900-e7c606344517';

var requestSummonerId = function(player, callback) {
  simply.setText({ title: player.name }, true);
  var url = lolApiUrl+'/summoner/by-name/'+player.name+'?'+lolApiKey;
  ajax({ url: url, type: 'json' }, function(data) {
    player.id = data.id;
    if (callback) { callback(player); }
  });
};

var requestGameSummary = function(player) {
  var url = lolApiUrl+'/stats/by-summoner/'+player.id+'/summary?season='+lolDuy.season+'&'+lolApiKey;
  ajax({ url: url, type: 'json' }, function(data) {
    var summaries = JSON.parse(data);

/*    
    for (var i = 0, ii = summaries.length; i < ii; ++i) {
      var summary = summaries[i];
      if (summary.playerStatSummaryType === lolDuy.summaryType) {
        player.summary = summary;
      }
    }
*/    
    
    simply.setText({ body: summaries.playerStatSummaries[0].wins + ' / ' + summaries.playerStatSummaries[0].losses });      
  });
};

initPlayers();

var updatePlayer = function() {
  requestSummonerId(lolDuy.players[lolDuy.playerIndex], requestGameSummary);
};

var changePlayer = function(delta) {
  lolDuy.playerIndex += delta;
  if (lolDuy.playerIndex < 0) {
    lolDuy.playerIndex = lolDuy.players.length - 1;
  } else if (lolDuy.playerIndex >= lolDuy.players.length) {
    lolDuy.playerIndex = 0;
  } 
};

simply.on('singleClick', function(e) {
  if (e.button === 'up') {
    changePlayer(-1);
    updatePlayer();
  } else if (e.button === 'down') {
    changePlayer(1);
    updatePlayer();
  } else if (e.button === 'select'){
}
});

updatePlayer();

simply.begin();
