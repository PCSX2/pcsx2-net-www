$(function () {
  $(document).scroll(function () {
    var $nav = $(".navbar.sticky-top");
    $nav.toggleClass('scrolled', $(this).scrollTop() > $nav.height());
  });
});
