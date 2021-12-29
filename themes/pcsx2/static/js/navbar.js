$(document).ready(function () {
  let scrolledFarEnough = $(this).scrollTop() > $(this).height() / 4;
  $(".navbar.fixed-top").toggleClass('navbar-expand-lg', scrolledFarEnough);
  $(".navbar.fixed-top").toggleClass('transparent', !scrolledFarEnough);
  $(document).scroll(function () {
    let scrolledFarEnough = $(this).scrollTop() > $(this).height() / 4;
    $(".navbar.fixed-top").toggleClass('navbar-expand-lg', scrolledFarEnough);
    $(".navbar.fixed-top").toggleClass('transparent', !scrolledFarEnough);
  });
});
