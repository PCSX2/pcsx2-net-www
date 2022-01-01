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
    const myDropdown = document.getElementById('navbarLinksDropdownMenu');
    const myDropdownInstance = new mdb.Dropdown(myDropdown);
    myDropdownInstance.hide();
    $(".navbar.fixed-top").toggleClass('navbar-expand-lg', scrolledFarEnough);
    $(".navbar.fixed-top").toggleClass('transparent', !scrolledFarEnough);
  });
});

// Hacks to get the navbar to right-align when collapsed
// There is probably a better way, should figure it out eventually
$('#navbarSupportedContent').on('show.bs.collapse', function () {
  $('.nav-middle').removeClass('w-75');
  $('.nav-right').removeClass('w-25');

  $('.nav-middle').addClass('w-100');
  $('.nav-right').addClass('w-100');

  $('.nav-middle').find('.nav-item').addClass("d-flex justify-content-end");
  $('.nav-right').find('.nav-item').addClass("d-flex justify-content-end");
});

$('#navbarSupportedContent').on('hidden.bs.collapse', function () {
  $('.nav-middle').removeClass('w-100');
  $('.nav-right').removeClass('w-100');

  $('.nav-middle').addClass('w-75');
  $('.nav-right').addClass('w-25');

  $('.nav-middle').find('.nav-item').removeClass("d-flex justify-content-end");
  $('.nav-right').find('.nav-item').removeClass("d-flex justify-content-end");
});
