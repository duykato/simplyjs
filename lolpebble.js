/* global simply*/

var League = [];

// Object contains all player information along with a selection of names
// for scrolling through. Creates an array for player information to be stored.
League.playerInfo = {
    playerNames: [
        'duykato',
        'pr0j3kt',
        'lifeisgood',
        'neoarchangel9',
        'timolawl'
    ],
    players: [],
    playerIndex: 0,
    summaryType: 'RankedSolo5x5',
    season: 'Season3'
};

/*
var changePlayer = function(delta) {
  League.playerInfo.playerIndex += delta;
  if (League.playerInfo.playerIndex < 0) {
    League.playerInfo.playerIndex = League.playerInfo.players.length - 1;
  } else if (League.playerInfo.playerIndex >= League.playerInfo.players.length) {
    League.playerInfo.playerIndex = 0;
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
*/

for(var i = 0 ; i < League.playerInfo.playerNames.length ; ++i) {
    simply.setText({
        body: League.playerInfo.playerNames[i] + '\n' + '\n'
    });
}