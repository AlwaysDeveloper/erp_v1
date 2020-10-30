/* eslint-disable no-undef */
function clickEffect(element, css, revers, time) {
  $(element).css(css);
  setTimeout(() => {
    $(element).css(revers);
  }, time);
}
