/* eslint-disable no-undef */
// eslint-disable-next-line no-undef
window.onload = () => {
  if (document.cookie.includes('jwt=')) {
    preLoader.preLoaderToggle();
    $.ajax({
      url: `${environment.URL_HEAD_USER}/isLogin`,
      method: 'GET',
      success: res => {
        window.location.replace(`${environment.accessList[res.user.accessType]}/home`);
      },
      error: () => {
        preLoader.preLoaderToggle();
      }
    });
  }
};

$('#login').click(() => {
  clickEffect('#login', { 'background-color': 'rgba(231, 99, 82, 0.849)' }, { 'background-color': '' }, 500);
  const data = {
    id: $('#id').val(),
    password: $('#password').val()
  };
  $.ajax({
    url: `${environment.URL_HEAD_USER}/login`,
    method: 'POST',
    data,
    beforeSend: () => {
      preLoader.preLoaderToggle();
    },
    success: res => {
      window.location.replace(`${environment.accessList[res.data.user.accessType]}/home`);
    },
    error: () => {
      preLoader.preLoaderToggle();
    }
  });
});

window.addEventListener('keypress', event => {
  if (event.charCode === 13) {
    document.getElementById('login').click();
  }
});
