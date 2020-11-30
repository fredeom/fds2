// Initial source taken from https://codepen.io/zebresel/pen/xGLYOM

var RangeSlider = function(rs) {
  var self = this;
  var startX = 0, x = 0;

  // retrieve touch button
  var slider     = rs;
  var touchLeft  = slider.querySelector('.range-slider__touch-left');
  var touchRight = slider.querySelector('.range-slider__touch-right');
  var lineSpan   = slider.querySelector('.range-slider__line span');
  var result     = slider.querySelector('.range-slider__result');

  // get some properties
  var min   = parseFloat(slider.getAttribute('se-min'));
  var max   = parseFloat(slider.getAttribute('se-max'));

  // retrieve default values
  var defaultMinValue = min;
  if(slider.hasAttribute('se-min-value')) defaultMinValue = parseFloat(slider.getAttribute('se-min-value'));

  var defaultMaxValue = max;
  if(slider.hasAttribute('se-max-value')) defaultMaxValue = parseFloat(slider.getAttribute('se-max-value'));

  // check values are correct
  if(defaultMinValue < min) defaultMinValue = min;
  if(defaultMaxValue > max) defaultMaxValue = max;
  if(defaultMinValue > defaultMaxValue) defaultMinValue = defaultMaxValue;

  var step  = 0.0;

  if (slider.getAttribute('se-step')) step  = Math.abs(parseFloat(slider.getAttribute('se-step')));

  var normalizeFact = 2;

  self.slider = slider;
  self.reset = function() {
    touchLeft.style.left = '0px';
    touchRight.style.left = (slider.offsetWidth - touchLeft.offsetWidth) + 'px';
    lineSpan.style.marginLeft = '0px';
    lineSpan.style.width = (slider.offsetWidth - touchLeft.offsetWidth) + 'px';
    startX = 0;
    x = 0;
  };

  self.updateResult = function() {
    result.innerHTML = slider.getAttribute('se-min-value') + '₽ - ' + slider.getAttribute('se-max-value') + '₽';
  }

  self.setLineSpaneStyle = function () {
    lineSpan.style.marginLeft = touchLeft.offsetLeft + 'px';
    lineSpan.style.width = (touchRight.offsetLeft - touchLeft.offsetLeft) + 'px';
  }

  self.setMinValue = function(minValue) {
    var ratio = ((minValue - min) / (max - min));
    touchLeft.style.left = Math.ceil(ratio * (slider.offsetWidth - (touchLeft.offsetWidth + normalizeFact))) + 'px';
    self.setLineSpaneStyle();
    slider.setAttribute('se-min-value', minValue);
    self.updateResult();
  }

  self.setMaxValue = function(maxValue) {
    var ratio = ((maxValue - min) / (max - min));
    touchRight.style.left = Math.ceil(ratio * (slider.offsetWidth - (touchLeft.offsetWidth + normalizeFact)) + normalizeFact) + 'px';
    self.setLineSpaneStyle();
    slider.setAttribute('se-max-value', maxValue);
    self.updateResult();
  }

  // initial reset
  self.reset();

  // usefull values, min, max, normalize fact is the width of both touch buttons
  var maxX = slider.offsetWidth - touchRight.offsetWidth;
  var selectedTouch = null;
  var initialValue = (lineSpan.offsetWidth - normalizeFact);

  // set defualt values
  self.setMinValue(defaultMinValue);
  self.setMaxValue(defaultMaxValue);

  // setup touch/click events
  function onStart(event) {

    // Prevent default dragging of selected content
    event.preventDefault();
    var eventTouch = event;

    if (event.touches) eventTouch = event.touches[0];

    if(this === touchLeft) x = touchLeft.offsetLeft; else x = touchRight.offsetLeft;

    startX = eventTouch.pageX - x;
    selectedTouch = this;
    document.addEventListener('mousemove', onMove);
    document.addEventListener('mouseup', onStop);
    document.addEventListener('touchmove', onMove);
    document.addEventListener('touchend', onStop);
  }

  function onMove(event) {
    var eventTouch = event;

    if (event.touches) eventTouch = event.touches[0];

    x = eventTouch.pageX - startX;

    if (selectedTouch === touchLeft) {
      if(x > (touchRight.offsetLeft - selectedTouch.offsetWidth - normalizeFact)) {
        x = (touchRight.offsetLeft - selectedTouch.offsetWidth - normalizeFact)
      } else if(x < 0) {
        x = 0;
      }
      selectedTouch.style.left = x + 'px';
    } else if (selectedTouch === touchRight) {
      if(x < (touchLeft.offsetLeft + touchLeft.offsetWidth + normalizeFact)) {
        x = (touchLeft.offsetLeft + touchLeft.offsetWidth + normalizeFact)
      } else if(x > maxX) {
        x = maxX;
      }
      selectedTouch.style.left = x + 'px';
    }

    // update line span
    lineSpan.style.marginLeft = touchLeft.offsetLeft + 'px';
    lineSpan.style.width = (touchRight.offsetLeft - touchLeft.offsetLeft) + 'px';

    // write new value
    calculateValue();

    self.updateResult();
  }

  function onStop(event) {
    document.removeEventListener('mousemove', onMove);
    document.removeEventListener('mouseup', onStop);
    document.removeEventListener('touchmove', onMove);
    document.removeEventListener('touchend', onStop);

    selectedTouch = null;

    // write new value
    calculateValue();

    self.updateResult();
  }

  function calculateValue() {
    var newValue = (lineSpan.offsetWidth - normalizeFact) / initialValue;
    var minValue = lineSpan.offsetLeft / initialValue;
    var maxValue = minValue + newValue;

    var minValue = minValue * (max - min) + min;
    var maxValue = maxValue * (max - min) + min;

    if (step !== 0.0) {
      var multi = Math.floor((minValue / step));
      minValue = step * multi;

      multi = Math.floor((maxValue / step));
      maxValue = step * multi;
    }

    slider.setAttribute('se-min-value', minValue);
    slider.setAttribute('se-max-value', maxValue);
  }

  // link events
  touchLeft.addEventListener('mousedown', onStart);
  touchRight.addEventListener('mousedown', onStart);
  touchLeft.addEventListener('touchstart', onStart);
  touchRight.addEventListener('touchstart', onStart);
};

document.querySelectorAll('.range-slider').forEach(rs => new RangeSlider(rs));