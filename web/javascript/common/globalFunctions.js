/* eslint-disable no-undef */
// eslint-disable-next-line no-undef
window.onload = () => {
  if (document.cookie.includes('jwt=')) {
    $.ajax({
      url: `${environment.URL_HEAD_USER}/isLogin`,
      method: 'GET',
      beforeSend: () => {
        console.log(`Trying to login with the saved cookie....`);
      },
      success: res => {
        console.log(res);
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
