function changeBackgroundColor() {
    var color = document.getElementById('colorPicker').value;
    document.body.style.backgroundColor = color;
}
function setLightMode() {
    document.body.style.backgroundColor = '#ffffff';
}

function setDarkMode() {
    document.body.style.backgroundColor = '#0A0A0A';
}
const cookieBox = document.querySelector(".wrapper"),
  buttons = document.querySelectorAll(".button");

const executeCodes = () => {
  // Check if the cookie is accepted
  if (checkCookiesAccepted()) {
      // If the cookie is accepted, hide the cookie consent box and show the form
      document.querySelector('.wrapper').style.display = 'none';
      document.getElementById('myForm').style.display = 'block';
      return;
  }

  // If the cookie is not accepted, show the cookie consent box
  cookieBox.classList.add("show");

  buttons.forEach((button) => {
      button.addEventListener("click", () => {
          cookieBox.classList.remove("show");

          // If the "Accept" button is clicked, set the cookie
          if (button.id == "acceptBtn") {
              document.cookie = "cookieBy=LaSalle_Coding; max-age=" + 60 * 60 * 24 * 30;
          } else if (button.id == "declineBtn") {
              // If the "Decline" button is clicked, delete the cookie
              document.cookie = "cookieBy=LaSalle_Coding; max-age=0";
          }
      });
  });
};

// Call the executeCodes function when the page loads
window.addEventListener("load", executeCodes);
  
function acceptCookies() {
  setCookie("cookie", true, 30);
  load1();
}

function rejectCookies() {
  document.querySelector("#cookies").style.display = "none";
  document.querySelector("#other").style.display = "flex";
  load();
}
function checkCookiesAccepted() {
    const cookies = document.cookie.split(";").map(cookie => cookie.trim().split("="));
    const cookieValues = Object.fromEntries(cookies);
    return cookieValues.cookieBy === "LaSalle_Coding";
}
  //executeCodes function will be called on webpage load
  window.addEventListener("load", executeCodes);

buttons.forEach((button) => {
  button.addEventListener("click", () => {
      cookieBox.style.display = 'none';
      setTimeout(() => {
          document.getElementById('myForm').style.display = 'block';
      }, 500);
      if (button.id == "acceptBtn") {
          // Set cookies for 1 month. 60 = 1 min, 60 = 1 hours, 24 = 1 day, 30 = 30 days
          document.cookie = "cookieBy = LaSalle_Coding; max-age=" + 60 * 60 * 24 * 30;
      }
  });
});
document.addEventListener('DOMContentLoaded', function() {
  // if user has already accepted the cookie policy, hide the cookie box
  document.getElementById('acceptBtn').addEventListener('click', function() {
      document.querySelector('.wrapper').style.display = 'none';
      document.getElementById('myForm').style.display = 'block';
  });

  document.getElementById('declineBtn').addEventListener('click', function() {
      document.querySelector('.wrapper').style.display = 'none';
      document.getElementById('rememberMe').style.display = 'none';
      document.getElementById('rememberMeCheckbox').style.display = 'none';
  });
});
function setCookie(name, value, days) {
  var expires = "";
  if (days) {
    var date = new Date();
    date.setTime(date.getTime() + (days*24*60*60*1000));
    expires = "; expires=" + date.toUTCString();
  }
  document.cookie = name + "=" + (value || "")  + expires + "; path=/";
}

function getCookie(name) {
  var nameEQ = name + "=";
  var ca = document.cookie.split(';');
  for(var i=0;i < ca.length;i++) {
    var c = ca[i];
    while (c.charAt(0)==' ') c = c.substring(1,c.length);
    if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
  }
  return null;
}

function eraseCookie(name) {
  document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 UTC;path=/;";
}

const storedUsername = getCookie('username');
const storedPassword = getCookie('password');
const form = document.getElementById('myForm');
const savedColor = getCookie('color');
const savedLanguage = getCookie('language');
const savedFontSize = getCookie('fontSize');
let currentScore = getCookie('currentScore');
let highScore = getCookie('highScore');

document.getElementById('currentScore').textContent = currentScore;
document.getElementById('highScore').textContent = highScore;

if (savedLanguage) {
  document.getElementById('language').value = savedLanguage;
}
if (savedFontSize) {
  document.getElementById('fontSize').value = savedFontSize;
  document.body.style.fontSize = savedFontSize;
}
if (savedColor) {
  document.body.style.backgroundColor = savedColor;
  document.getElementById('colorPicker').value = savedColor;
}

// Add event listener to language select
document.getElementById('language').addEventListener('change', (event) => {
  const language = event.target.value;
  localStorage.setItem('language', language);
});

// Add event listener to font size select
document.getElementById('fontSize').addEventListener('change', (event) => {
  const fontSize = event.target.value;
  localStorage.setItem('fontSize', fontSize);
  document.body.style.fontSize = fontSize;
});

// Add event listener to color picker
document.getElementById('colorPicker').addEventListener('change', (event) => {
  const color = event.target.value;
  localStorage.setItem('color', color);
  document.body.style.backgroundColor = color;
});

form.addEventListener('submit', function(event) {
  event.preventDefault();
  var username = document.getElementById('username').value;
  var password = document.getElementById('password').value;
  var rememberMe = document.getElementById('rememberMeCheckbox').checked;
  if (rememberMe) {
    setCookie('language', document.getElementById('language').value, 30);
    setCookie('fontSize', document.getElementById('fontSize').value, 30);
    setCookie('color', document.getElementById('colorPicker').value, 30);
    setCookie('username', username, 30);
    setCookie('password', password, 30);
    // hide cookie box if user has already accepted
    if (document.cookie.includes("cookieBy=LaSalle_Coding")) {
      document.getElementById('myForm').style.display = 'none';}
  } else {
    eraseCookie('username');
    eraseCookie('password');
    eraseCookie('color');
    eraseCookie('language');
    eraseCookie('fontSize');
    eraseCookie('currentScore');
    eraseCookie('highScore');
  }
  
});

if (storedUsername && storedPassword) {
  document.getElementById('username').value = storedUsername;
  document.getElementById('password').value = storedPassword;
  document.getElementById('rememberMeCheckbox').checked = true;
}
highScore = 0;

function playGame() {
  let currentScore = Math.floor(Math.random() * 101);
  document.getElementById('currentScore').textContent = currentScore;
  setCookie('currentScore', currentScore, 30); 
  if (currentScore > highScore) {
      highScore = currentScore;
      document.getElementById('highScore').textContent = highScore;
      setCookie('highScore', highScore, 30); 
  }
}

document.getElementById('toggleVisibility').addEventListener('click', function () {
  let passwordInput = document.getElementById('password');
  if (passwordInput.type === "password") {
      passwordInput.type = "text";
      this.className = "fas fa-eye-slash"; 
  } else {
      passwordInput.type = "password";
      this.className = "fas fa-eye"; 
  }
});

document.getElementById('declineBtn').addEventListener('click', function() {
  cookiesAllowed = false;
  eraseCookie('username');
  eraseCookie('password');
  eraseCookie('color');
  eraseCookie('language');
  eraseCookie('fontSize');
  eraseCookie('currentScore');
  eraseCookie('highScore');

  document.getElementById('myForm').reset();

  // Reset the background color
  document.body.style.backgroundColor = '#ffffff';
  // Reset score
  document.getElementById('currentScore').textContent = "";
  document.getElementById('highScore').textContent = "";
});
// Reset all fields
function resetallFields() {
  document.getElementById('myForm').reset();
  document.body.style.backgroundColor = '#ffffff';
  eraseCookie('username');
  eraseCookie('password');
  eraseCookie('color');
  eraseCookie('language');
  eraseCookie('fontSize');
  eraseCookie('currentScore');
  eraseCookie('highScore');
  eraseCookie('cookieBy'); // Erase the cookie consent cookie
  document.getElementById('currentScore').textContent = "";
  document.getElementById('highScore').textContent = "";
  document.querySelector('.wrapper').style.display = 'block'; // Show the cookie consent box
  document.getElementById('myForm').style.display = 'none'; // Hide the form
}
document.getElementById('resetBtn').addEventListener('click', resetallFields);

