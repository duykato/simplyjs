/*global simply, ajax, moment*/

simply.style('mono');

var lolApiUrl = 'https://prod.api.pvp.net/api/lol/na/v1.1';
var lolApiKey = 'api_key=1e0b2bdd-8bf5-43ba-8900-e7c606344517';

var League = {};
var viewMode = 0;
League.recentGameIndex = 0;

var playerObject = {
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

var changeViewMode = function(mode) {
  var viewMode = viewMode + mode;
  if (viewMode > 1){
    viewMode = 0;
  }
};

// Allows Scrolling through Players.
var initPlayers = function() {
    var playerNames = playerObject.playerNames;
    for (var i = 0, ii = playerNames.length; i < ii; ++i){
        playerObject.players[i] = {
            id: '',
            summary: { losses: 0, wins: 0 }    
        };
    }
};

// Gets Player ID from Riot API.
League.requestSummonerId = function(player, callback) {
  simply.text({ title: player.name }, true);
  var url = lolApiUrl+'/summoner/by-name/'+player.name+'?'+lolApiKey;
  ajax({ url: url, type: 'json' }, function(data) {
    player.id = data.id;
    if (callback) { callback(player); }
  });
};

// Changes player using an index.
var changePlayer = function(delta) {
    playerObject.playerIndex += delta;
    if (playerObject < 0 ) {
        playerObject.playerIndex = playerObject.players.length - 1;
    } else if (playerObject.playerIndex >= playerObject.players.length){
        playerObject.playerIndex = 0;
    }
};
// Gets Season Total Win and Loss record for player.
var requestGameSummary = function(player) {
  var url = lolApiUrl+'/stats/by-summoner/'+player.id+'/summary?season='+playerObject.season+'&'+lolApiKey;
  ajax({ url: url, type: 'json'}, function(data){
    var summaries = data.playerStatSummaries;
    for (var i = 0, ii = summaries.length; i < ii; ++i) {
        var summary = summaries[i];
        if (summary.playerStatSummaryType === playerObject.summaryType) {
            player.summary = summary;
        }
    }
    
  });
};

// Refreshes Player Info
var updatePlayer = function(){
    League.requestSummonerId(playerObject.players[playerObject.playerIndex], requestGameSummary);
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

// Normalizes Game Type Text from Riot API.
League.gameTypeText = function(gameType){
    if (gameType == 'NORMAL') { //Renames a game subtype.
        gameType = 'Normal';
      } else if (gameType == 'RANKED_SOLO_5x5'){
        gameType = 'Ranked Solo';
      } else if (gameType == 'FIRSTBLOOD_2x2'){
        gameType = 'Showdown 2v2';
      } else if (gameType == 'FIRSTBLOOD_1x1'){
        gameType = 'Showdown 1v1';
      } else if (gameType == 'ARAM_UNRANKED_5x5'){
        gameType = 'All Random All Mid';
      }
    return(gameType);
};

// Passes a champion ID and returns the Champion name.
League.getChampion = function(championId) {
  return League.ChampionsById[championId];
};

// Displays recent game history information.
League.showRecentGame = function(recentGame) {
  simply.text({
    title: recentGame.type + '\n' + '\n',
    subtitle: recentGame.time + '\n' + '\n' + recentGame.kda + '-' + '[' + recentGame.winOrLose + ']' + '\n' + recentGame.champion,
  });
};

League.updateRecentGame = function() {
  League.showRecentGame(League.recentGames[League.recentGameIndex]);
};

League.changeRecentGame = function(delta) {
  var n = League.recentGames.length;
  League.recentGameIndex = (League.recentGameIndex + delta + n) % n;
};

// Sets Pebble Controls to scroll up and down through Players and Recent Games.
League.bindRecentGames = function(){
    simply.on('singleClick', function(e) {
      if (e.button === 'up' && viewMode === 0){
        changePlayer(-1);
        updatePlayer();
      } else if (e.button === 'down' && viewMode === 0){
        changePlayer(+1);
        updatePlayer();
      } else if (e.button === 'up' && viewMode === 1) {
        League.changeRecentGame(-1);
        League.updateRecentGame();
      } else if (e.button === 'down' && viewMode === 1) {
        League.changeRecentGame(1);
        League.updateRecentGame();
      } else if (e.button === 'select'){
        changeViewMode(1);  
      }
    });
};

// Retrieves last 10 matches from Riot API and loads it into an object named "recentGame".
var main = function() {
  ajax({ url: lolApiUrl + '/game/by-summoner/' + League.requestSummonerId + '/recent?' + lolApiKey, type: 'json' }, function(data) {
    var games = data.games;
    var recentGames = [];
    for (var i = 0; i < games.length ; ++i) {
      var game = games[i];
      var recentGame = {};
      recentGame.type = League.gameTypeText(game.subType);
      recentGame.time = moment(game.createDate).zone("-08:00").format('MM'+'/'+'DD'+'/'+'YY'+'[\n]'+'h:mm:ss a');
      recentGame.champion = League.getChampion(game.championId).name;
      var kills = 0, deaths = 0, assists = 0, winOrLose = 'NA';
      for (var j = 0; j < game.statistics.length; ++j) {
        var stat = game.statistics[j];
        if (stat.name == 'CHAMPIONS_KILLED') {
          kills = stat.value;
        }
        if (stat.name == 'NUM_DEATHS') {
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
      recentGame.kda = kills + '/' + deaths + '/' + assists;
      recentGame.winOrLose = winOrLose;
      recentGames[i] = recentGame;
    }
    League.recentGames = recentGames;
    League.bindRecentGames();
    League.updateRecentGame();
  });
};

League.requestChampions(main);
initPlayers();
