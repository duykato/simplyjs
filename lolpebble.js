simply.style('mono');
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

// Passes a champion ID and returns the Champion name.
League.getChampion = function(championId) {
  return League.ChampionsById[championId];
};
// Displays recent game history information.
var main = function() {
  ajax({ url: lolApiUrl + '/game/by-summoner/21148858/recent?' + lolApiKey, type: 'json' }, function(data) {
    var games = data.games;
    for (var i = 0; i < games.length ; ++i) {
      var game = games[i];
      var gameType = game.subType;
      if (game.subType == 'NORMAL') {		//Renames a game subtype.
        gameType = 'Normal';
      } else if (game.subType == 'RANKED_SOLO_5x5'){
        gameType = 'Ranked Solo';      
      } else if (game.subType == 'FIRSTBLOOD_2x2'){
        gameType = 'Showdown 2v2';
      } else if (game.subType == 'FIRSTBLOOD_1x1'){
        gameType = 'Showdown 1v1';
      } else if (game.subType == 'ARAM_UNRANKED_5x5'){
        gameType = 'All Random All Mid';
      }
      var gameTime = moment(game.createDate).zone("-08:00").format('MM'+'/'+'DD'+'/'+'YY'+'\n'+'h:mm:ss a');
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
        title:      gameType,
        subtitle:   gameTime,
        body:       kda + '-' + winOrLose + '\n' + champion,

      });
    }
  });
};

League.requestChampions(main);