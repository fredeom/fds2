document.querySelectorAll('.radio').forEach(r => r.addEventListener('click', function() {
  const input = this.querySelector('input');
  input.checked = true;
  const groupname = input.name;
  document.querySelectorAll('.radio').forEach(nextR => {
    const nextInput = nextR.querySelector('input');
    if (nextInput.name === groupname) {
      if (nextInput.checked) {
        nextR.classList.add('checked');
        nextR.querySelector('.radio__check').classList.add('visible');
      } else {
        nextR.classList.remove('checked');
        nextR.querySelector('.radio__check').classList.remove('visible');
      }
    }
  });
}));