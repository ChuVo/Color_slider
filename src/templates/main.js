const buttonBg = $('#radio2'),
      buttonColor = $('#radio1');

let colors = $('#radio');

colors.state = {
  background: '353535',
  color: '353535',
  checked: 'buttonBg',
  buttonColorIsClik: false
};

buttonBg.click(() => {
  colors.state.checked = 'buttonBg';
  setColorValue(colors.state.background);
});

buttonColor.click(() => {
    colors.state.checked = 'buttonColor';
    setColorValue(colors.state.color);
});

addColorValue();

function addColorValue() {
   $('#red, #green, #blue').slider({
    animate: "fast",
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

  if(colors.state.checked === 'buttonBg') {
    colors.state.background = hex;
    $('#swatch').css('background-color', '#' + hex);
  } else {
    $('#text').css('color', '#' + hex);
    colors.state.color = hex;
  }

  result(hex);
};

function setColorValue(hexValue) {
  let value = hex2rgb('#' + hexValue);

  if (hexValue) {
    $('#red').slider('value', value[0]);
    $('#green').slider('value', value[1]);
    $('#blue').slider('value', value[2]);
  } else {
    $('#red').slider('value', 127);
    $('#green').slider('value', 127);
    $('#blue').slider('value', 127);
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
  $('#result-red').text($("#red").slider("value"));
  $('#result-green').text($("#green").slider("value"));
  $('#result-blue').text($("#blue").slider("value"));
  $('#result-rgb').text(hex2rgb('#' + hex));
  $('#result-hex').text('#' + hex);
};