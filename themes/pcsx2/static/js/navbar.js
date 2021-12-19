$(function () {
  $(document).ready(function () {
    var $nav = $(".navbar.fixed-top");
    $nav.toggleClass('scrolled', $(this).scrollTop() > $(this).height() / 4);
    $nav.toggleClass('navbar-expand-lg', $(this).scrollTop() > $(this).height() / 4);
    $(".navbar-brand").toggleClass('scrolled', $(this).scrollTop() > $(this).height() / 4);
  });
  $(document).scroll(function () {
    var $nav = $(".navbar.fixed-top");
    $nav.toggleClass('scrolled', $(this).scrollTop() > $(this).height() / 4);
    $nav.toggleClass('navbar-expand-lg', $(this).scrollTop() > $(this).height() / 4);
    $(".navbar-brand").toggleClass('scrolled', $(this).scrollTop() > $(this).height() / 4);
  });
});
