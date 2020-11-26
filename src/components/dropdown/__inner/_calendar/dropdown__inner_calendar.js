import arrow_left from "./calendar_arrow_left.svg"
import arrow_right from "./calendar_arrow_right.svg"
import {getDateString, getDateFromString} from '../../../util';

function fillCalendar(ic, date, currentDate) {
  const firstDayOfMonth = new Date(date.getFullYear(), date.getMonth(), 1);
  let d = firstDayOfMonth.getDay();
  let diff = firstDayOfMonth.getDate() - d + (d == 0 ? -6 : 1);
  const firstDayOfWindow = new Date(new Date(firstDayOfMonth).setDate(diff));
  const lastDayOfMonth = new Date(date.getFullYear(), date.getMonth() + 1, 0);
  const lastDayOfMonthPlusOne = new Date(lastDayOfMonth);
  lastDayOfMonthPlusOne.setDate(lastDayOfMonthPlusOne.getDate() + 1);
  d = lastDayOfMonth.getDay();
  diff = lastDayOfMonth.getDate() - d + (d == 0 ? -6 : 1) + 6;
  const lastDayOfWindow = new Date(new Date(lastDayOfMonth).setDate(diff));
  const mIndex = date.getMonth();
  const mName = ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'][mIndex];
  const yNum = date.getYear() + 1900;
  let dateHeader = '<div class="calendar_date_header">';
  for (let i of ['Пн','Вт','Ср','Чт','Пт','Сб','Вс']) {
    dateHeader += '<div class="calendar_date_header_item">' + i + '</div>';
  }
  dateHeader += '</div>';
  let dateContent = '<div class="calendar_date_content">';
  let z = new Date(firstDayOfWindow);
  z.setTime(z.getTime() - 1);
  const currentDatePlusOne = currentDate ? new Date(currentDate) : undefined;
  if (currentDatePlusOne) currentDatePlusOne.setDate(currentDatePlusOne.getDate() + 1);
  while (z <= lastDayOfWindow) {
    z.setDate(z.getDate() + 1);
    let value = '' + z.getDate();
    if (value.length == 1) value = '0' + value;
    dateContent += '<div data-day="' + getDateString(z) + '" class="calendar_date_content_item ' + (z < firstDayOfMonth || z >= lastDayOfMonthPlusOne ? "gray" : "black") + ' ' + ((currentDate && (z > currentDate) && (z < currentDatePlusOne)) ? "selected" : "") + '">' + value + '</div>';
  }
  dateContent += '</div>';
  ic.innerHTML = '<div class="dropdown__inner-row calendar_title_and_control">' +
                    '<img class="arrow_left" src="./fonts/calendar_arrow_left.svg"/><label>' + mName + ' ' + yNum + '</label>' +
                    '<img class="arrow_right" src="./fonts/calendar_arrow_right.svg"/>' +
                 '</div>' +
                 dateHeader +
                 dateContent +
                 '<div style="height: 47px;">' +
                   '<div class="dropdown__inner-clear">Очистить</div>' +
                   '<div class="dropdown__inner-apply">Применить</div>' +
                 '</div>';
  ic.querySelector('.arrow_left').addEventListener('click', function () {
    const newDate = new Date(date);
    newDate.setMonth(date.getMonth() - 1);
    fillCalendar(this.parentNode.parentNode, newDate, currentDate);
  });
  ic.querySelector('.arrow_right').addEventListener('click', function () {
    const newDate = new Date(date);
    newDate.setMonth(date.getMonth() + 1);
    fillCalendar(this.parentNode.parentNode, newDate, currentDate);
  });
  ic.querySelectorAll("[data-day]").forEach(dd => dd.addEventListener('click', function () {
    const date = getDateFromString(this.getAttribute('data-day'));
    fillCalendar(this.parentNode.parentNode, date, date);
  }));
  const clr = ic.querySelector(".dropdown__inner-clear");
  if (currentDate) clr.classList.add('visible'); else clr.classList.remove('visible');
  clr.addEventListener('click', function () { fillCalendar(ic, date, null); });
  ic.querySelector(".dropdown__inner-apply").addEventListener('click', function () {
    this.parentNode.parentNode.parentNode.querySelector('.dropdown-select .dropdown-select__text').textContent = currentDate ? getDateString(currentDatePlusOne) : 'ДД.ММ.ГГГГ';
    this.parentNode.parentNode.classList.remove('dropdown__inner-wrapper_visible');
  });
}

document.querySelectorAll(".dropdown__inner_calendar").forEach(ic => {
  ic.parentNode.querySelectorAll('.dropdown-select').forEach(ds => ds.addEventListener('click', () => {
    const selectedDate = ds.querySelector(".dropdown-select__text").textContent;
    let parsedDate, currentDate;
    try {
      if (selectedDate == 'ДД.ММ.ГГГГ') throw new Error('not selected');
      const [d,m,y] = selectedDate.split('.')
      parsedDate = new Date('' + y + '-' + m + '-' + d);
      currentDate = parsedDate;
    } catch(e) {
      parsedDate = new Date();
    }
    fillCalendar(ic, parsedDate, currentDate)
  }));
});