simply.setText({
  title: 'Result?',
  subtitle: '30/2/3',
  body: "Heimerdinger"
});

var winLose [
  {title: 'Victory'},
  {title: 'Defeat'},
];

simply.on('singleClick', function(e){
  if (e.button == 'select'){
    simply.setText({
      winLose[0];
    });
  }
});

simply.begin();
