simply.setText({
  title: 'Result?',
  subtitle: '30/2/3',
  body: "Heimerdinger"
}, true);

simply.on('singleClick', function(e) {
  simply.setText({
    title: 'Victory';
  })
}
