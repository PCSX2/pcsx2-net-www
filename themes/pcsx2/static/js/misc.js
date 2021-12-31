// Theme Switching
function setTheme(themeName) {
  localStorage.setItem('pcsx2-theme', themeName);
  document.documentElement.className = themeName;
  if (themeName === "theme-light") {
    $("#theme-button").html('<i class="far fa-moon theme-icon" title="Change to Dark Theme"></i>');
  } else {
    $("#theme-button").html('<i class="far fa-sun theme-icon" title="Change to Light Theme"></i>');
  }
}

$("#theme-button").on("click", function (evt) {
  if (localStorage.getItem('pcsx2-theme') === 'theme-dark') {
    setTheme('theme-light');
  } else {
    setTheme('theme-dark');
  }
});

$(document).ready(function () {
  let savedTheme = localStorage.getItem('pcsx2-theme');
  if (savedTheme !== undefined && savedTheme === "theme-light") {
      $("#theme-button").html('<i class="far fa-moon theme-icon" title="Change to Dark Theme"></i>');
  } else {
    $("#theme-button").html('<i class="far fa-sun theme-icon" title="Change to Light Theme"></i>');
  }
});

// Card Animations
const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('ease-in');
    }
  });
}, {
  rootMargin: '0px',
  threshold: 0.75
});

document.querySelectorAll('.card').forEach((i) => {
  if (i) {
    observer.observe(i);
  }
});
