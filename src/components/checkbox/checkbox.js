document.querySelectorAll('.checkbox').forEach(cb => cb.addEventListener('click', function() {
  this.classList.toggle('checked');
  this.querySelector('.check').classList.toggle('visible');
}));