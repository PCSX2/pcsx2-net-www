$(".img-compare-container").on('mousemove touchstart touchmove', function(evt) {
  var elem = evt.target;
  var rect = elem.getBoundingClientRect();
  var position = ((evt.pageX - rect.left) / elem.offsetWidth) * 100;
  if (position <= 100) {
    $(this).find(".img-clipper")[0].style.width = position + "%";
    $(this).find("img")[1].style.width = ((100 / position) * 100) + "%";
    $(this).find("img")[1].style.zIndex = 3;
  }
});
