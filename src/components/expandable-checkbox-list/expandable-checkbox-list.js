document.querySelectorAll(".expandable-checkbox-list").forEach(ecl => {
  ecl.querySelector('.expandable-checkbox-list__header').addEventListener('click', function() {
    this.querySelector('.expandable-checkbox-list__arrow').classList.toggle('rotate225');
    ecl.querySelector('.expandable-checkbox-list__item-wrapper').classList.toggle('visible');
  })
})