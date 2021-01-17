const util = require('../../util');

document.querySelectorAll(".dropdown-select").forEach(ds => ds.addEventListener('click', function () {
  this.parentNode.querySelector(".dropdown__inner-wrapper").classList.toggle('dropdown__inner-wrapper_visible');
}));

document.querySelectorAll('.minus-control.inner-plus-minus-control__control').forEach(mc => mc.classList.add('disabled'));
document.querySelectorAll('.minus-control.inner-plus-minus-control__control').forEach(mc => mc.onclick = function () {
  const value = parseInt(this.parentNode.querySelector('.value').textContent);
  if (value < 2) this.classList.add('disabled');
  this.parentNode.querySelector('.value').textContent = value < 2 ? '0' : ('' + (value - 1));
  if (Array.from(this.parentNode.parentNode.parentNode.querySelectorAll('.value')).reduce((a, b) => a + parseInt(b.textContent), 0) == 0)
    this.parentNode.parentNode.parentNode.querySelector('.dropdown__inner-clear').classList.remove('visible');
});

document.querySelectorAll('.plus-control.inner-plus-minus-control__control').forEach(pc => pc.onclick = function () {
  const value = parseInt(this.parentNode.querySelector('.value').textContent);
  this.parentNode.querySelector('.minus-control').classList.remove('disabled');
  this.parentNode.querySelector('.value').textContent = '' + (value + 1);
  this.parentNode.parentNode.parentNode.querySelector('.dropdown__inner-clear').classList.add('visible');
});

document.querySelectorAll('.dropdown__inner_facilities .dropdown__inner-clear, .dropdown__inner_guests .dropdown__inner-clear').forEach(ic => ic.onclick = function () {
  this.parentNode.parentNode.querySelectorAll('.value').forEach(v => v.textContent = '0');
  this.parentNode.parentNode.querySelectorAll('.minus-control.inner-plus-minus-control__control').forEach(mc => mc.classList.add('disabled'));
  this.classList.remove('visible');
});

document.querySelectorAll('.dropdown__inner_facilities .dropdown__inner-apply, .dropdown__inner_guests .dropdown__inner-apply').forEach(ia => ia.onclick = function () {
  const values = Array.from(this.parentNode.parentNode.querySelectorAll('.value')).map(v => parseInt(v.textContent));
  let msg = '';
  const s = values.reduce((a, c) => a + c, 0);
  if (this.parentNode.parentNode.classList.contains('dropdown__inner_guests')) {
    msg = s == 0 ? 'Сколько гостей' : util.smart_ends(s, ['гость', 'гостя', 'гостей']);
  }
  if (this.parentNode.parentNode.classList.contains('dropdown__inner_facilities')) {
    msg = s == 0 ? 'Какие удобства' : values.map((value, index) => value == 0 ? undefined :
      util.smart_ends(value, [['спальня','спальни','спален'],
                              ['кровать','кровати','кроватей'],
                              ['ванная комната','ванные комнаты','ванных комнат']][index])).filter(el => !!el).join(',');
  }
  this.parentNode.parentNode.parentNode.querySelector('.dropdown-select__text').textContent = msg;
  this.parentNode.parentNode.classList.toggle('dropdown__inner-wrapper_visible');
});