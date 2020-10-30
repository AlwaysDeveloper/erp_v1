class PreLoader {
  constructor() {
    // eslint-disable-next-line no-undef
    $('body').prepend(
      // eslint-disable-next-line no-undef
      this.preLoaderBody
    );
  }
}

// eslint-disable-next-line no-undef
PreLoader.prototype.preLoaderBody = $(`<div class="col-sm-12 container container-fluid preLoader" id="preLoader">
<img class="center-position" src="./../../images/mainLoader.gif">
</div>`);

PreLoader.prototype.preLoaderToggle = function() {
  if (this.preLoaderBody[0].style.display === 'block') {
    this.preLoaderBody.css('display', 'none');
  } else {
    this.preLoaderBody.css('display', 'block');
  }
};
