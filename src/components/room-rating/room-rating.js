import './room_888_1.svg';
import './room_840_1.svg';

function fill_room_rating(className, imgs, roomnumber, isLux, priceperday, stars, responseCount) {
  const rr = document.querySelector('.room-rating.' + className);
  rr.style.background = '#fff';
  const img_wrapper = document.createElement('div');
  img_wrapper.style.position = 'relative';
  const img = document.createElement('img');
  img.src = imgs[0];
  const slider_wrapper = document.createElement('div');
  slider_wrapper.style.position = 'absolute';
  slider_wrapper.style.right = '15px';
  slider_wrapper.style.bottom = '15px';
  const slider_points = [];
  for (let i = 0; i < 4; ++i) {
    const slider_point = document.createElement('div');
    slider_points.push(slider_point);
    slider_point.style.display = 'inline-block';
    slider_point.style.marginLeft = '3.75px';
    slider_point.style.borderRadius = '50%';
    slider_point.style.width = '5px';
    slider_point.style.height = '5px';
    slider_point.style.border = '1px solid white';
    slider_point.style.cursor = 'pointer';
    if (i == 0) {
      slider_point.style.background = '#fff';
    }
    slider_point.addEventListener('click', function(i) {
      return () => {
        for (let j = 0; j < slider_points.length; j++) {
          slider_points[j].style.background = i == j ? '#fff' : '';
        };
        img.src = imgs[i % imgs.length];
      }
    }(i));
    slider_wrapper.appendChild(slider_point);
  }
  img_wrapper.appendChild(img);
  img_wrapper.appendChild(slider_wrapper);
  /////////////////////////////////////////////////////
  const rr_content = document.createElement('div');
  rr_content.style.marginTop = "20px";
  rr_content.style.marginLeft = "30px";
  rr_content.style.marginRight = "30px";
  rr_content.style.display = "flex";
  rr_content.style.flexFlow = 'row nowrap';
  rr_content.style.justifyContent = 'space-between';
  rr_content.style.alignItems = 'center';
  rr_content.style.width = '210px';
  rr_content.innerHTML = '<div><span class="room-rating__roomnumber">№</span><span class="room-rating__roomnumber_number">' + roomnumber + '</span>' +
                         (isLux ? '<span class="room-rating__lux"> люкс</span>' : '') +
                         '</div><div><span class="room-rating__priceperday">' + priceperday + '₽ в сутки</span></div>';

  const hr = document.createElement('div');
  hr.style.background = 'rgba(31, 32, 65, 0.1)';
  hr.style.width = '230px';
  hr.style.height = '1px';
  hr.style.marginTop = '10px';
  hr.style.marginLeft = '20px';
  hr.style.marginBottom = '8px';

  const stars_comments_wrapper = document.createElement('div');
  stars_comments_wrapper.style.marginLeft = '20px';
  stars_comments_wrapper.style.display = "flex";
  stars_comments_wrapper.style.flexFlow = 'row nowrap';
  stars_comments_wrapper.style.justifyContent = 'space-between';
  stars_comments_wrapper.style.alignItems = 'center';
  stars_comments_wrapper.style.width = '210px';

  const stars_wrapper = document.createElement('div');
  for(let i = 0; i < 5; ++i) {
    const star = document.createElement('img');
    star.style = "cursor: pointer";
    star.src = './fonts/star' + ((i < stars) ? '_filled' : '') + '.svg';
    stars_wrapper.appendChild(star);
  }
  stars_comments_wrapper.appendChild(stars_wrapper);

  const comments = document.createElement('div');
  comments.classList.add('rooom-rating__comments');
  comments.innerHTML = responseCount + ' отзывов';
  stars_comments_wrapper.appendChild(comments);

  rr.appendChild(img_wrapper);
  rr.appendChild(rr_content);
  rr.appendChild(hr);
  rr.appendChild(stars_comments_wrapper);
}

fill_room_rating('class_888', ['./fonts/room_888_1.svg', './fonts/room_840_1.svg'], 888, true, 9990, 5, 145)
fill_room_rating('class_840', ['./fonts/room_840_1.svg', './fonts/room_888_1.svg'], 840, false, 9900, 4, 65)