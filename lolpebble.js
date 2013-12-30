var lolApiUrl = 'https://prod.api.pvp.net/api/lol/na/v1.1';
var lolApiKey = 'api_key=1e0b2bdd-8bf5-43ba-8900-e7c606344517';

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

var League = {};

League.requestSummonerId = function(player, callback) {
  simply.text({ title: player.name }, true);
  var url = lolApiUrl+'/summoner/by-name/'+player.name+'?'+lolApiKey;
  ajax({ url: url, type: 'json' }, function(data) {
    player.id = data.id;
    if (callback) { callback(player); }
  });
};

var requestGameSummary = function(player) {
  var url = lolApiUrl+'/stats/by-summoner/'+player.id+'/summary?season='+lolDuy.season+'&'+lolApiKey;
  ajax({ url: url, type: 'json' }, function(data) {
    var summaries = data.playerStatSummaries;
    for (var i = 0, ii = summaries.length; i < ii; ++i) {
      var summary = summaries[i];
      if (summary.playerStatSummaryType === lolDuy.summaryType) {
        player.summary = summary;
      }
    }
    simply.setText({ body: player.summary.wins + ' / ' + player.summary.losses });      
  });
};

League.requestChampions = function(callback) {
  var url = lolApiUrl + '/champion'+'?' + lolApiKey;
  ajax({ url: url, type: 'json' }, function(data) {
    League.Champions = data.champions;
    League.makeChampionMap();
    if (callback) { callback(data); }
  });
};

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

League.getChampion = function(championId) {
  return League.ChampionsById[championId];
};

var main = function() {
  ajax({ url: lolApiUrl + '/game/by-summoner/21148858/recent?' + lolApiKey, type: 'json' }, function(data) {
    var games = data.games;
//  for (var i = 0; i < games.length; ++i) {    
    for (var i = 0; i < games.length ; ++i) {
      var game = games[i];
      var gameType = game.subType;
      if (game.subType == 'NORMAL'){
        gameType = 'Normal';
      } else if (game.subType == 'RANKED_SOLO_5x5'){
        gameType = 'Ranked Solo';      
      } else if (game.subType == 'FIRSTBLOOD_1x1'){
        gameType = 'Showdown 1v1';
      } else if (game.subType == 'ARAM_UNRANKED_5x5'){
        gameType = 'All Random All Mid';
      }
      var gameTime = moment(game.createDate).zone("-08:00").format('MM'+'/'+'DD'+'/'+'YY, h:mm:ss a');
      var champion = League.getChampion(game.championId).name;     
      var kills = 0, deaths = 0, assists = 0, winOrLose = 0;
      for (var j = 0; j < game.statistics.length; ++j) {
        var stat = game.statistics[j];
        if (stat.name == 'CHAMPIONS_KILLED') {
          kills = stat.value;
        }
        if (stat.name == 'DEATHS') {
          deaths = stat.value;
        }
        if (stat.name == 'ASSISTS') {
          assists = stat.value;
        }
        if (stat.name == 'WIN'){
          var win = stat.value;        
          if (win == 1){
            winOrLose = 'Win';
          }
        }
        if (stat.name == 'LOSE'){
          var lose = stat.value;        
          if (lose == 1){
            winOrLose = 'Lose';
          } 
        }              
      }
      var kda = kills + '/' + deaths + '/' + assists;
      simply.text({
        body: gameType + '\n' + gameTime + '\n' + kda + '-' + winOrLose + '\n' + champion          
      });
      console.log();
    }
  });
};

initPlayers();

var updatePlayer = function() {
  requestSummonerId(lolDuy.players[lolDuy.playerIndex], requestGameSummary);
};

League.requestChampions(main);
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
  }
});

updatePlayer();

simply.begin();
