simply.setText({
  title: 'Result?',
  subtitle: '30/2/3',
  body: "Heimerdinger"
}, true);

var winLose = {
  'Victory',
  'Defeat',
  'Palo+alto,us',
};

var winLoseIndex = 0;

simply.on('singleClick', function(e){
  if(e.button == 'select'){
    simply.setText({
      title: winLose[0];
    })
  }
})

simply.begin();

