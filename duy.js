simply.setText({
  title: 'Result?',
  subtitle: '30/2/3',
  body: "Heimerdinger"
});

var winLose [
  'Victory',
  'Defeat'
];

simply.on('singleClick', function(e){
  if (e.button == 'select'){
    simply.setText({
      title: winLose[2]
    });
  }
});

simply.begin();
