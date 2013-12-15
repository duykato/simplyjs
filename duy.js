simply.setText({
  title: 'Result?',
  subtitle: '30/2/3',
  body: 'Heimerdinger'
});

// a-z 0-9 _
var catText = 'Positive Etropy Negative Enthalpy';

var winLose = [
  'Victory',
  'Defeat',
];

//Math.floor (0.05 * 4) = 0



simply.on('singleClick', function(e) {
  if (e.button === 'select'){
    var winLoseIndex = Math.floor(Math.random() * winLose.length);
    simply.setText({ title: winLose[winLoseIndex] });
  } else if (e.button === 'up'){
    simply.setText({ subtitle; '15:1:1.5'});
  } else {
    simply.setText({ title: catText});
  }
});

simply.begin();
