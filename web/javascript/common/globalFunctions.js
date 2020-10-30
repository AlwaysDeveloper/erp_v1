/* eslint-disable no-undef */
// eslint-disable-next-line no-undef
const preLoader = new PreLoader();
window.onload = () => {
  if (document.cookie.includes('jwt=')) {
    preLoader.preLoaderToggle();
    $.ajax({
      url: `${environment.URL_HEAD_USER}/isLogin`,
      method: 'GET',
      success: res => {
        console.log(`logged in with ${res.user.name} on ip:${res.user.ip}.......`);
        environment.ipAddress = res.user.ip;
        $('#ipBar')
          .css('color', 'white')
          .html(environment.ipAddress);
        preLoader.preLoaderToggle();
      },
      error: (xhr, e) => {
        // eslint-disable-next-line default-case
        switch (xhr.status) {
          case 401:
            console.log(e);
            window.location.replace('/');
            break;
        }
      }
    });
  }
};
