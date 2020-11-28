document.querySelectorAll('.toggle').forEach(t => t.addEventListener('click', function() {
  this.classList.toggle('checked');
  this.querySelector('.toggle__check').classList.toggle('visible');
}));