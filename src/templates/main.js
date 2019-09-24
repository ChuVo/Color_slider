let hexColor = 'df7f33',
    hexBgColor = '317fda',
    mainHex = hexBgColor;

const buttonBg = $( '#radio2' ),
      buttonColor = $( '#radio1' );

buttonBg.click(() => { mainHex = hexBgColor; setColorValue() });
buttonColor.click(() => { mainHex = hexColor; setColorValue() });

function refreshSwatch() {
  const red = $( '#red' ).slider( 'value' ),
        green = $( '#green' ).slider( 'value' ),
        blue = $( '#blue' ).slider( 'value' ),
        hex = rgb2hex( red, green, blue );

  if(buttonBg.prop( 'checked' )) {
    $( '#swatch' ).css( 'background-color', '#' + hex );
    hexBgColor = hex;
  } else {
    $( '#text' ).css( 'color', '#' + hex );
    hexColor = hex;
  }
}

$( () => {
  $( '#red, #green, #blue' ).slider({
    orientation: 'horizontal',
    range: 'min',
    max: 255,
    value: 127,
    slide: refreshSwatch,
    change: refreshSwatch
  });

  setColorValue();
});

function setColorValue() {
  let value = hex2rgb('#' + mainHex);

  $( '#red' ).slider( 'value', value[0] );
  $( '#green' ).slider( 'value', value[1] );
  $( '#blue' ).slider( 'value', value[2] );
}

$( () => $( '#radio' ).buttonset() );

function rgb2hex(r, g, b) {
  var hex = [
    r.toString(16),
    g.toString(16),
    b.toString(16)
  ];

  $.each( hex, function( nr, val ) {
    if ( val.length === 1 ) {
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