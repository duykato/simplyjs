/* global simply*/
simply.style('mono');
var League = [];

// Object contains all player information along with a selection of names for scrolling through.
League.playerInfo = {
    playerNames: [
        'duykato',
        'pr0j3kt',
        'lifeisgood',
        'neoarchangel9',
        'timolawl'
    ],
    players: [], // This is where all the player info will be stored. REMEMBER THIS SHIT. NO SERIOSLY REMEMBER IT.
    playerIndex: 0,
    summaryType: 'RankedSolo5x5',
    season: 'Season3'
};

var printPlayerStats = function(input) {
    simply.text({
        title: League.playerInfo.playerNames[input],
        subtitle: 'yep',
        body: '',
    });
};

printPlayerStats(0);