function fill_card_booking(cb) {
  const priceperday = 9990;
  const services = [
    {title: 'Сбор за услуги', discount: 2179, price: 0},
    {title: 'Сбор за дополнительные услуги', discount: 0, price: 300}
  ]
  const dateInterval = [];
  cb.querySelectorAll('.dropdown-select__text').forEach(st => dateInterval.push(st.textContent))
  const leavedateList = dateInterval[1].split('.')
  const leavedate = new Date(leavedateList[2], leavedateList[1], leavedateList[0])
  const arrivaldateList = dateInterval[0].split('.')
  const arrivaldate = new Date(arrivaldateList[2], arrivaldateList[1], arrivaldateList[0])
  const days_num = Math.floor((leavedate - arrivaldate) / (1000*60*60*24))
  let sum = priceperday * days_num;
  cb.querySelectorAll('.card_booking__services-row')[0].innerHTML = '<div>' + priceperday + ' x ' + days_num + ' суток</div><div>' + sum + '₽</div>';
  for (let s of services) {
    sum += s.price - s.discount;
  }
  cb.querySelectorAll('.card_booking__price-total div')[1].innerHTML = '<div>' + sum + '₽</div>';
}



document.querySelectorAll('.card_booking').forEach(cb => {
  cb.querySelectorAll('.dropdown-select').forEach(ds => {
    ds.addEventListener('change', function () {
      fill_card_booking(cb);
    })
  })
});