simply.setText({
  title: 'Result?',
  subtitle: '30/2/3',
  body: 'Heimerdinger'
}, true);

simply.on('singleClick', function(e) {
  if (e.button == 'select'){
    simply.setText({title: 'Victory'});
  } else {
    simply.setText({subtitle; '(^_^)'})
  } 
  
});

simply.begin();
