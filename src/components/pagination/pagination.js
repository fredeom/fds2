import './pagination__arrow_right.svg';

function fillPagination(p, total, current) {
  if (current > 1) {
    const arrow_left = document.createElement("div");
    const img = document.createElement('img');
    img.src = 'fonts/pagination__arrow_right.svg';
    img.style.transform = 'rotate(180deg)';
    arrow_left.classList.add('pagination__arrow_highlight');
    arrow_left.appendChild(img);
    p.appendChild(arrow_left);
  }
  let num_ = document.createElement('div')
  if (current == 1) num_.classList.add('pagination__selected');
  num_.classList.add('pagination__text' + (current > 1 ? '_normal' : ''));
  num_.appendChild(document.createTextNode(1));
  p.appendChild(num_);
  if (current > 3) {
    const numdotdotdot = document.createElement('div')
    numdotdotdot.classList.add('pagination__text_normal');
    numdotdotdot.appendChild(document.createTextNode("..."));
    p.appendChild(numdotdotdot);
  }
  for (let i = -1; i < 2; i++) {
    if (i + current > 1 && i + current < total) {
      const numbetween = document.createElement('div');
      if (i == 0) numbetween.classList.add('pagination__selected');
      numbetween.classList.add('pagination__text' + (i != 0 ? '_normal' : ''));
      numbetween.appendChild(document.createTextNode(i + current));
      p.appendChild(numbetween);
    }
  }
  if (current < total - 2) {
    const numdotdotdot = document.createElement('div')
    numdotdotdot.classList.add('pagination__text_normal');
    numdotdotdot.appendChild(document.createTextNode("..."));
    p.appendChild(numdotdotdot);
  }
  num_ = document.createElement('div')
  if (current == total) num_.classList.add('pagination__selected');
  num_.classList.add('pagination__text' + (current < total ? '_normal' : ''));
  num_.appendChild(document.createTextNode(total));
  p.appendChild(num_);
  if (current < total) {
    const arrow_right = document.createElement("div");
    const img = document.createElement('img');
    img.src = 'fonts/pagination__arrow_right.svg';
    arrow_right.classList.add('pagination__arrow_highlight');
    arrow_right.appendChild(img);
    p.appendChild(arrow_right);
  }
}

document.querySelectorAll('.pagination').forEach(p => fillPagination(p, parseInt(p.getAttribute('data-total')), parseInt(p.getAttribute('data-current'))));