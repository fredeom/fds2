exports.smart_ends = function(num, words) {
  let choose = 0;
  const n100 = num % 100;
  const n10 = num % 10;
  if (n100 == 11) {
    choose = 2;
  } else if (n10 == 1) {
    choose = 0;
  } else if (n100 >= 12 && n100 <= 14) {
    choose = 2;
  } else if (n10 >= 2 && n10 <= 4) {
    choose = 1;
  } else {
    choose = 2;
  }
  return '' + num + ' ' + words[choose];
}