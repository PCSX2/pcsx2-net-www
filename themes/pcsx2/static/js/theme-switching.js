var buttonElem = document.getElementById("theme-button");
// TODO - detect current theme (local storage)
let darkTheme = true;
buttonElem.onclick = () => {
  alert("why would you want light theme anyway? (havn't done it yet)");
  return;
  darkTheme = !darkTheme;
  if (darkTheme) {
    buttonElem.innerHTML = `<i class="far fa-moon theme-icon" title="Dark Theme"></i>`;
  } else {
    buttonElem.innerHTML = `<i class="far fa-sun theme-icon" title="Light Theme"></i>`;
  }
}
