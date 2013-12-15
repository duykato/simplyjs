simply.setText({
  title: 'Victory',
  subtitle: '30/2/3',
  body: 'Champion?'
}, true);

simply.on('singleClick', function(e) {
  if (e.button == 'select'){
    simply.setText({body: 'Heimerdinger'});
  }
});
