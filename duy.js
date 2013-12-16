simply.setText({
  title: 'Result?',
  subtitle: '30/2/3',
  body: "Heimerdinger"
});



var winLose = [
  'Victory',
  'Defeat'
];



simply.on('singleClick', function(e){
  var winLoseIndex = Math.floor(Math.random() * winLose.length);
  if (e.button == 'select'){
    simply.setText({
      title: winLose[winLoseIndex]
    })
  }
});

simply.begin();
