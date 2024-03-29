const buttonBg = $('#radio2'),
      buttonColor = $('#radio1');

addColorValue();
result('127127127');

buttonBg.state = {
  color: '',
  colorBg: '',
  checked: "color"
};

buttonBg.click(() => {
  buttonBg.state.checked = 'background';
  setColorValue(buttonBg.state.colorBg);
});

buttonColor.click(() => {
  buttonBg.state.checked = 'color';
  setColorValue(buttonBg.state.color); 
});

function addColorValue() {
   $('#red, #green, #blue').slider({
    animate: "slow",
    orientation: 'horizontal',
    range: 'min',
    max: 255,
    value: 127,
    slide: refreshSwatch,
    change: refreshSwatch
  });

  setColorValue();
};

function refreshSwatch() {
  const red = $('#red').slider('value'),
        green = $('#green').slider('value'),
        blue = $('#blue').slider('value'),
        hex = rgb2hex(red, green, blue);

  if (buttonBg.state.checked === 'background') {
    buttonBg.state.colorBg = hex;
    $('#swatch').css('background-color', '#' + hex);
  } else {
    $('#text').css('color', '#' + hex);
    $('#swatch').css('border', '2px solid #' + hex);
    buttonBg.state.color = hex;
  }

  result(hex);
};

function setColorValue(hexValue) {
  let value = hex2rgb('#' + hexValue);

  if (hexValue) {
    $('#red').slider('value', value[0]);
    $('#green').slider('value', value[1]);
    $('#blue').slider('value', value[2]);
   }
};

$(() => $('#radio').buttonset());

function rgb2hex(r, g, b) {
  var hex = [
    r.toString(16),
    g.toString(16),
    b.toString(16)
  ];

  $.each(hex, function (nr, val) {
    if (val.length === 1) {
      hex[ nr ] = '0' + val;
    }
  });

  return hex.join('');
}

function hex2rgb(c) {
  let bigint = parseInt(c.split('#')[1], 16),
      r = (bigint >> 16) & 255,
      g = (bigint >> 8) & 255,
      b = bigint & 255,
      a = [r, g, b];

  return a;
}

function result(hex) {
  $('#result-green').text($("#green").slider("value"));
  $('#result-blue').text($("#blue").slider("value"));
  $('#result-red').text($("#red").slider("value"));  
  $('#result-rgb').text(hex2rgb('#' + hex).slice(',').join(''));
  $('#result-hex').text('#' + hex);
  $('#result-rgb').css('color', '#' + hex);
  $('#result-hex').css('color', '#' + hex);
};