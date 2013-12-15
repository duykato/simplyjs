simply.setText({
  title: 'Result?',
  subtitle: '30/2/3',
  body: 'Heimerdinger'
});

// a-z 0-9 _
var catText = 'Positive Etropy Negative Enthalpy';

simply.on('singleClick', function(e) {
  if (e.button === 'select'){
    simply.setText({ title: 'Victory'});
  } else if (e.button === 'up'){
    simply.setText({ subtitle; '15:1:1.5'});
  } else {
    simply.setText({ title: catText});
  }
});

simply.begin();
