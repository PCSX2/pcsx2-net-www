// Theme Switching
function setTheme(themeName) {
  localStorage.setItem('pcsx2-theme', themeName);
  document.documentElement.className = themeName;
  $('#theme-toggle').prop('checked', themeName === "theme-light");
}

$("#theme-toggle").on("change", function (evt) {
  if (evt.target.checked) {
    setTheme('theme-light');
  } else {
    setTheme('theme-dark');
  }
});

$(function() {
  let savedTheme = localStorage.getItem('pcsx2-theme');
  if (savedTheme === undefined || savedTheme === null || savedTheme === "" || savedTheme === "null") {
    // Use System Theme
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      setTheme('theme-dark');
    } else {
      setTheme('theme-light');
    }
  } else {
    setTheme(savedTheme);
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
    // Safari - ignore the deprecation
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
