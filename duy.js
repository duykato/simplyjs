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
  if (e.button == 'select'){
    var winLoseIndex = Math.floor(Math.random() * winLose.length);
    simply.setText({
      title: winLose[winLoseIndex]
    })
  }
});

simply.begin();
