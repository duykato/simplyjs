simply.setText({
  title: 'Result?',
  subtitle: '30/2/3',
  body: 'Heimerdinger'
}, true);

simply.on('singleClick', function(e) {
  if (e.button === 'select'){
    simply.setText({title: 'Victory'});
  } else if (e.button === 'up'){
    simply.setText({subtitle; '15:1:1.5'});
  } else {
    simply.setText ([title: 'Goodbye']);
  }
  
});

simply.begin();
