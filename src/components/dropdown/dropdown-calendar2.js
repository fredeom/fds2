import {pad0, getDateString, getDateFromString, getDateDayMonthString} from '../util';

function fillCalendar2(iw, showDate, startDate, endDate, turn) {
  const firstDayOfMonth = new Date(showDate.getFullYear(), showDate.getMonth(), 1);
  let d = firstDayOfMonth.getDay();
  let diff = firstDayOfMonth.getDate() - d + (d == 0 ? -6 : 1);
  const firstDayOfWindow = new Date(new Date(firstDayOfMonth).setDate(diff));
  const lastDayOfMonth = new Date(showDate.getFullYear(), showDate.getMonth() + 1, 0);
  const lastDayOfMonthPlusOne = new Date(lastDayOfMonth);
  lastDayOfMonthPlusOne.setDate(lastDayOfMonthPlusOne.getDate() + 1);
  d = lastDayOfMonth.getDay();
  diff = lastDayOfMonth.getDate() - d + (d == 0 ? -6 : 1) + 6;
  const lastDayOfWindow = new Date(new Date(lastDayOfMonth).setDate(diff));

  const mName = ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'][showDate.getMonth()];
  const yNum = showDate.getYear() + 1900;
  let dateHeader = '<div class="calendar_date_header">';
  for (let i of ['Пн','Вт','Ср','Чт','Пт','Сб','Вс']) {
    dateHeader += '<div class="calendar_date_header_item">' + i + '</div>';
  }
  dateHeader += '</div>';

  let dateContent = '<div class="calendar_date_content">';
  let z = new Date(firstDayOfWindow);
  z.setTime(z.getTime() - 1);
  function getPlusOne(date) {
    const datePlusOne = date ? new Date(date) : undefined;
    if (datePlusOne) datePlusOne.setDate(datePlusOne.getDate() + 1);
    return datePlusOne;
  }
  const startDatePlusOne = getPlusOne(startDate);
  const endDatePlusOne = getPlusOne(endDate);
  while (z <= lastDayOfWindow) {
    z.setDate(z.getDate() + 1);
    const value = z.getDate();//pad0(z.getDate(), 2);
    dateContent += '<div data-day="' + getDateString(z) + '" class="calendar_date_content_item ' +
                     (z < firstDayOfMonth || z >= lastDayOfMonthPlusOne ? "gray" : "black") +
                     ((startDate && (z > startDate) && (z < startDatePlusOne)) ? " selected-start" : "") +
                     ((endDate && (z > endDate) && (z < endDatePlusOne)) ? " selected-end" : "") +
                      (startDate && endDate && (z > startDatePlusOne) && (z < endDate) ? ' selected-interval' : '') + '">' + value + '</div>';
  }
  dateContent += '</div>';

  iw.innerHTML = '<div class="dropdown__inner-row calendar_title_and_control">' +
                  '<img class="arrow_left" src="./fonts/calendar_arrow_left.svg"/><label>' + mName + ' ' + yNum + '</label>' +
                  '<img class="arrow_right" src="./fonts/calendar_arrow_right.svg"/>' +
                '</div>' +
                dateHeader +
                dateContent +
                '<div style="height: 47px;">' +
                  '<div class="dropdown__inner-clear">Очистить</div>' +
                  '<div class="dropdown__inner-apply">Применить</div>' +
                '</div>';
  iw.querySelector('.arrow_left').addEventListener('click', function () {
    const newDate = new Date(showDate);
    newDate.setMonth(showDate.getMonth() - 1);
    fillCalendar2(this.parentNode.parentNode, newDate, startDate, endDate, turn);
  });
  iw.querySelector('.arrow_right').addEventListener('click', function () {
    const newDate = new Date(showDate);
    newDate.setMonth(showDate.getMonth() + 1);
    fillCalendar2(this.parentNode.parentNode, newDate, startDate, endDate, turn);
  });
  iw.querySelectorAll("[data-day]").forEach(dd => dd.addEventListener('click', function () {
    const date = getDateFromString(this.getAttribute('data-day'));
    fillCalendar2(this.parentNode.parentNode, showDate, turn == 0 ? date : startDate, turn == 1 ? date : endDate, 1 - turn);
  }));
  const clr = iw.querySelector(".dropdown__inner-clear");
  if (startDate || endDate) clr.classList.add('visible'); else clr.classList.remove('visible');
  clr.addEventListener('click', function () { fillCalendar2(iw, showDate, null, null, 0); });
  iw.querySelector(".dropdown__inner-apply").addEventListener('click', function () {
    const ds = this.parentNode.parentNode.parentNode.querySelector('.dropdown-select');
    if (startDate && endDate && (startDate > endDate)) [startDate, endDate] = [endDate, startDate];
    const startDatePlusOne = getPlusOne(startDate);
    const endDatePlusOne = getPlusOne(endDate);
    ds.querySelector('.dropdown-select__text').textContent = (startDate ? getDateDayMonthString(startDatePlusOne) : 'начало') + ' - ' + (endDate ? getDateDayMonthString(endDatePlusOne) : 'конец');
    ds.querySelector('.dropdown-calendar2__start-date').value = startDate ? startDate.toString() : '';
    ds.querySelector('.dropdown-calendar2__end-date').value = endDate ? endDate.toString() : '';
    this.parentNode.parentNode.classList.remove('dropdown__inner-wrapper_visible');
  });
}

document.querySelectorAll(".dropdown-calendar2").forEach(dc2 => {
  dc2.querySelectorAll('.dropdown-select').forEach(ds => ds.addEventListener('click', function() {
    const selectedStartDate = this.querySelector('.dropdown-calendar2__start-date').value;
    const selectedEndDate = this.querySelector('.dropdown-calendar2__end-date').value;
    const startDate = selectedStartDate == '' ? null : new Date(selectedStartDate);
    const endDate = selectedEndDate == '' ? null : new Date(selectedEndDate);
    fillCalendar2(dc2.querySelector(".dropdown__inner-wrapper"), startDate ? startDate : endDate ? endDate : new Date(), startDate, endDate, 0);
  }));
});