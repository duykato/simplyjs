simply.setText({
  title: 'Result?',
  subtitle: '30/2/3',
  body: "Heimerdinger"
}, true);

var winLose = {
  'Victory',
  'Defeat',
};

var winLoseIndex = 0;

simply.on('singleClick', function(e){
  if(e.button == 'select'){
    simply.setText({
      title: winLose[1];
    })
  }
});

simply.begin();

