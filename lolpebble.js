/*global simply, ajax, moment*/

simply.style('mono');

var lolApiUrl = 'https://prod.api.pvp.net/api/lol/na/v1.1';
var lolApiKey = 'api_key=1e0b2bdd-8bf5-43ba-8900-e7c606344517';

var League = {};
League.recentGameIndex = 0;

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

League.bindRecentGames = function(){
    simply.on('singleClick', function(e) {
      if (e.button === 'up') {
        League.changeRecentGame(-1);
        League.updateRecentGame();
      } else if (e.button === 'down') {
        League.changeRecentGame(1);
        League.updateRecentGame();
      }
    });
};

var main = function() {
  ajax({ url: lolApiUrl + '/game/by-summoner/21011088/recent?' + lolApiKey, type: 'json' }, function(data) {
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