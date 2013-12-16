simply.setText({
  title: 'Result?',
  subtitle: '30/2/3',
  body: "Heimerdinger"
});

var map = [
  ['x','x','x','x','z','x',],
  ['x','a','x','x','x','g',],
  ['x','x','b','x','x','x',],
  ['x','x','x','x','C','x',],
  ['x','x','x','x','x','d',],
];

var pos = { x: 2, y: 2};

var dirs = [
  { x: , y: };
  { x: , y: };
  { x: , y: };{ x: , y: };
];
  
var dir = 0;

simply.on('singleClick', function(e){
  switch (e.button){
    case 'select':
      console.log('1');
      break;
    case 'up'::
      console.log('2');
      break;
    case 'down':
      console.log('3');
      break;
  }
});

simply.begin();
