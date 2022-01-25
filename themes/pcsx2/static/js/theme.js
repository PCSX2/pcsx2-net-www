// Theme Switching
function setTheme(themeName) {
  localStorage.setItem('pcsx2-theme', themeName);
  document.documentElement.className = themeName;
  if (themeName === "theme-light") {
    $("#theme-button").html('<i class="far fa-moon theme-icon" title="Change to Dark Theme"></i>');
  } else {
    $("#theme-button").html('<i class="fas fa-sun theme-icon" title="Change to Light Theme"></i>');
  }
}

$("#theme-button").on("click", function (evt) {
  let savedTheme = localStorage.getItem('pcsx2-theme');
  if (savedTheme === 'theme-dark' || savedTheme === undefined) {
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
    // Use System Theme
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      setTheme('theme-dark');
    } else {
      setTheme('theme-light');
    }
  }
});

// Card Animations
const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('eased-in');
    }
  });
}, {
  rootMargin: '0px',
  threshold: 0
});

document.querySelectorAll('.card.ease-in').forEach((i) => {
  if (i) {
    observer.observe(i);
  }
});

// Listen for system theme changes
const darkMediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
try {
  // Chrome & Firefox
  darkMediaQuery.addEventListener('change', (e) => {
    if (e.matches) {
      setTheme('theme-dark');
    } else {
      setTheme('theme-light');
    }
  });
} catch (e1) {
  try {
    // Safari
    darkMediaQuery.addListener((e) => {
      if (e.matches) {
        setTheme('theme-dark');
      } else {
        setTheme('theme-light');
      }
    });
  } catch (e2) {
    console.error(e2);
  }
}
