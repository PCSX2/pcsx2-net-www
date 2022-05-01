let dragging = false;

$(".img-compare-container").on('mouseup', function(evt) {
  dragging = false;
});

$(".img-compare-container").on('mousedown touchstart', function(evt) {
  dragging = true;
  var elem = evt.target;
  var rect = elem.getBoundingClientRect();
  var position = ((evt.pageX - rect.left) / elem.offsetWidth) * 100;
  if (position <= 100) {
    $(this).find(".img-clipper")[0].style.width = position + "%";
    $(this).find("img")[1].style.width = ((100 / position) * 100) + "%";
    $(this).find("img")[1].style.zIndex = 3;
  }
});

$(".img-compare-container").on('mousemove', function(evt) {
  if (!dragging) {
    return;
  }
  var elem = evt.target;
  var rect = elem.getBoundingClientRect();
  var position = ((evt.pageX - rect.left) / elem.offsetWidth) * 100;
  if (position <= 100) {
    $(this).find(".img-clipper")[0].style.width = position + "%";
    $(this).find("img")[1].style.width = ((100 / position) * 100) + "%";
    $(this).find("img")[1].style.zIndex = 3;
  }
});
