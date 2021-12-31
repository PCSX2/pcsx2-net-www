$(document).ready(function () {
  let scrolledFarEnough = $(this).scrollTop() > $(this).height() / 5;
  if (scrolledFarEnough) {
    const myCollapse = document.getElementById('navbarSupportedContent');
    const bsCollapse = new mdb.Collapse(myCollapse, {toggle: false});
    bsCollapse.hide();
  }
  $(".navbar.fixed-top").toggleClass('navbar-expand-lg', scrolledFarEnough);
  $(".navbar.fixed-top").toggleClass('transparent', !scrolledFarEnough);
  $(document).scroll(function () {
    let scrolledFarEnough = $(this).scrollTop() > $(this).height() / 5;
    if (scrolledFarEnough) {
      const myCollapse = document.getElementById('navbarSupportedContent');
      const bsCollapse = new mdb.Collapse(myCollapse, {toggle: false});
      bsCollapse.hide();
    }
    $(".navbar.fixed-top").toggleClass('navbar-expand-lg', scrolledFarEnough);
    $(".navbar.fixed-top").toggleClass('transparent', !scrolledFarEnough);
  });
});
