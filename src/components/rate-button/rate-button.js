import './star.svg'
import './star_filled.svg'

function fillRateButton(rb) {
  const mark = parseInt(rb.getAttribute('data-mark'));
  const max = parseInt(rb.getAttribute('data-max'));
  rb.innerHTML = '';
  for(let i = 0; i < max; ++i) {
    const star = document.createElement('img');
    star.style = "cursor: pointer";
    star.src = './fonts/star' + ((i < mark) ? '_filled' : '') + '.svg';
    star.dataIndex = i + 1;
    star.addEventListener('click', function() {
      rb.setAttribute('data-mark', star.dataIndex);
      fillRateButton(rb);
    });
    rb.appendChild(star);
  }
}

document.querySelectorAll('.rate-button').forEach(rb => fillRateButton(rb));