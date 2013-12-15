simply.setText({
  title: 'Result?',
  subtitle: '30/2/3',
  body: 'Heimerdinger'
}, true);

// a-z 0-9 _
var winLose = [
  {title: 'Victory'}, // 0
  {title: 'Defeat'},  // 1
  [title: 'NORMAL', body: 'Stats aren\'t tracked for normal games.']
];

simply.on('singleClick', function(e){
  
}



//Math.floor (0.05 * 4) = 0

/*
var getRandomIndex = function() {
  var winLoseIndex = Math.floor(Math.random() * winLose.length);
};

var winLoseIndex = 0;

var updateWinLose = function() {
  simply.setText({body: winLose[winLoseIndex] });
}

simply.on('singleClick', function(e) {
  if (e.button === 'select'){
    //Do Nothing
  } else if (e.button === 'up'){
    winLoseIndex = winLoseIndex - 1;
    if (winLose < 0){winLoseIndex = winLoseIndex.[]};
    updateWinLose();
  } else if {e.button === 'down'
    winLoseIndex = winLoseIndex + 1;
    updateWinLose();
  }
});
*/

simply.begin();
