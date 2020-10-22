/* eslint-disable no-undef */
// eslint-disable-next-line no-undef

window.onload = () => {
  if (document.cookie.includes('jwt=')) {
    $('#preLoader').css('display', 'block');
    $.ajax({
      url: `${environment.URL_HEAD_USER}/isLogin`,
      method: 'GET',
      success: res => {
        $('#preLoader').css('display', 'none');
      },
      error: () => {
        $('#preLoader').css('display', 'none');
      }
    });
  }
};

$('#login').click(() => {
  const data = {
    id: $('#id').val(),
    password: $('#password').val()
  };
  $.ajax({
    url: `${environment.URL_HEAD_USER}/login`,
    method: 'POST',
    data,
    beforeSend: () => {
      console.log(`Trying to login with the credentials....`);
    },
    success: res => {
      console.log(res);
    }
  });
});
