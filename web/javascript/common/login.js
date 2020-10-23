/* eslint-disable no-undef */
// eslint-disable-next-line no-undef

window.onload = () => {
  if (document.cookie.includes('jwt=')) {
    $('#preLoader').css('display', 'block');
    $.ajax({
      url: `${environment.URL_HEAD_USER}/isLogin`,
      method: 'GET',
      success: res => {
        window.location.replace(`${environment.accessList[res.user.accessType]}/home`);
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
      $('#preLoader').css('display', 'block');
    },
    success: res => {
      window.location.replace(`${environment.accessList[res.data.user.accessType]}/home`);
    },
    error: () => {
      $('#preLoader').css('display', 'none');
    }
  });
});
