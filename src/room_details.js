function fillRoomViews(viewsLayout, roomImgs) {
  if (roomImgs.length == 1) {
    const img = document.createElement('img');
    img.src = roomImgs[0];
    img.style.width = '1440px';
    viewsLayout.appendChild(img);
  } else if (roomImgs.length == 2) {
    const img1 = document.createElement('img');
    const img2 = document.createElement('img');
    img1.addEventListener('load', function() {
      const width1 = this.naturalWidth;
      const height1 = this.naturalHeight;
      img2.addEventListener('load', function() {
        const width2 = this.naturalWidth;
        const height2 = this.naturalHeight;
        const bd = height2 * width1 / (width2 * height1);
        const d = 1440 / (bd + 1);
        const b = 1440 - d;
        img1.style.width = b + 'px';
        img2.style.width = d + 'px';
        img1.style.float = 'left';
        img2.style.float = 'left';
        viewsLayout.appendChild(img1);
        viewsLayout.appendChild(img2);
      });
    });
    img1.src = roomImgs[0];
    img2.src = roomImgs[1];
  } else if (roomImgs.length == 3) {
    const img1 = document.createElement('img');
    const img2 = document.createElement('img');
    const img3 = document.createElement('img');
    img1.addEventListener('load', function() {
      const width1 = this.naturalWidth;
      const height1 = this.naturalHeight;
      img2.addEventListener('load', function() {
        const width2 = this.naturalWidth;
        const height2 = this.naturalHeight;
        img3.addEventListener('load', function() {
          const width3 = this.naturalWidth;
          const height3 = this.naturalHeight;
          const d1 = 1440 / (1 + width1 / height1 * (height2 / width2 + height3 / width3));
          const b1 = 1440 - d1;
          const c1 = d1 * height2 / width2;
          const e1 = d1 * height3 / width3;
          const a1 = c1 + e1;
          img1.style.width = b1 + 'px';
          img2.style.width = d1 + 'px';
          img3.style.width = d1 + 'px';
          img1.style.float = 'left';
          img2.style.float = 'left';
          img3.style.float = 'left';
          viewsLayout.appendChild(img1);
          viewsLayout.appendChild(img2);
          viewsLayout.appendChild(img3);
        })
      })
    });
    img1.src = roomImgs[0];
    img2.src = roomImgs[1];
    img3.src = roomImgs[2];
  }
}

const viewsLayout = document.querySelector('.room-details__views-layout');

fillRoomViews(viewsLayout, ['./fonts/room_888_1.svg',
                            './fonts/room_888_2.svg',
                            './fonts/room_888_3.svg']);

function fillChart(chart, scores) {
  const svg = document.createElement('svg');
  //svg.setAttribute('xmlns:svg', 'http://www.w3.org/2000/svg');
  //svg.setAttribute('xmlns', 'http://www.w3.org/2000/svg');
  svg.setAttribute('width', 120);
  svg.setAttribute('height', 120);
  svg.setAttribute('viewBox', '0 0 50 50');
  const total = scores.reduce((a, c) => a + c, 0);
  let shift = 0;
  for (ind in scores) {
    const pts = Math.floor(scores[ind] / total * 100);
    const circle = document.createElement('circle');
    circle.classList.add('room-details__chart_unit');
    circle.setAttribute('r', 15.9);
    circle.setAttribute('cx', '50%');
    circle.setAttribute('cy', '50%');
    circle.style.stroke = ['#FFE39C', '#6FCF97', '#BC9CFF', '#909090'][ind];//'#86cfa3';
    circle.style.strokeWidth = '2px';
    circle.style.strokeDasharray = pts + ' 100';
    circle.style.strokeDashoffset = shift;
    //circle.style = 'stroke: #86cfa3; stroke-dasharray: ' + pts + ' 100; stroke-dashoffset: ' + shift;
    shift -= pts;
    svg.appendChild(circle);
  }
  const text = document.createElement('text');
  text.setAttribute('x', 0);
  text.setAttribute('y', 0);
  text.setAttribute('dy', 0);
  text.setAttribute('dominant-baseline', 'middle');
  text.setAttribute('text-anchor', 'middle');
  text.style.stroke = '#BC9CFF';
  text.setAttribute('font-size', '6px');
  const t1 = document.createElement('tspan');
  t1.setAttribute('x', '50%');
  t1.setAttribute('y', '50%');
  t1.setAttribute('dy', 0);
  t1.setAttribute('font-size', '8px')
  t1.appendChild(document.createTextNode(total));
  const t2 = document.createElement('tspan');
  t2.setAttribute('x', '50%');
  t2.setAttribute('y', '50%');
  t2.setAttribute('dy', '0.9em');
  t2.setAttribute('font-size', '6px')
  t2.appendChild(document.createTextNode('голосов'));
  text.appendChild(t1);
  text.appendChild(t2);
  svg.appendChild(text);
  /*
  const svg1 = document.createElement('svg');
  svg1.setAttribute('width', 120);
  svg1.setAttribute('height', 120);
  svg1.setAttribute('viewBox', '0 0 50 50');
  const circle = document.createElement('circle');
  circle.setAttribute('r', 15.9);
  circle.setAttribute('cx', '50%');
  circle.setAttribute('cy', '50%');
  circle.style.stroke = 'red';
  circle.style.strokeDasharray = '8 100';
  circle.style.strokeDashoffset = -8;
  svg1.appendChild(circle);
  chart.appendChild(svg1);*/

  const d = document.createElement('div');
  d.innerHTML = '<ul class="chart-caption-list">'
  + '<li><div class="chart-caption-item chart-caption-item-color1"></div>Великолепно</li>'
  + '<li><div class="chart-caption-item chart-caption-item-color2"></div>Хорошо</li>'
  + '<li><div class="chart-caption-item chart-caption-item-color3"></div>Удовлетворительно</li>'
  + '<li><div class="chart-caption-item chart-caption-item-color4"></div>Разочарован</li>'
  + '</ul>';

  chart.appendChild(svg);
  chart.appendChild(d);
}

const chart = document.querySelector('.room-details__chart');
fillChart(chart, [130, 65, 65, 0]);
