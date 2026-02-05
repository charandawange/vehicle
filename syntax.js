/* ================= MENU TOGGLE ================= */
function toggleMenu() {
  document.querySelector(".nav-links").classList.toggle("show");
}

/* ================= SLIDER ================= */
const slides = document.querySelectorAll('.slide');
let index = 0;

function showNextSlide() {
  slides[index].classList.remove('active');
  index = (index + 1) % slides.length;
  slides[index].classList.add('active');
}

function showPrevSlide() {
  slides[index].classList.remove('active');
  index = (index - 1 + slides.length) % slides.length;
  slides[index].classList.add('active');
}

if (document.querySelector(".next")) {
  document.querySelector('.next').onclick = showNextSlide;
  document.querySelector('.prev').onclick = showPrevSlide;
  setInterval(showNextSlide, 5000);
}

/* ================= IMAGE MODAL ================= */
function openFullImage(imgSrc) {
  document.getElementById("imageModal").style.display = "block";
  document.getElementById("imgFullView").src = imgSrc;
}

function closeFullImage() {
  document.getElementById("imageModal").style.display = "none";
}

window.onclick = function(event) {
  let modal = document.getElementById("imageModal");
  if (event.target == modal) {
    modal.style.display = "none";
  }
};

/* ================= LIGHTBOX ================= */
function openLightbox(src) {
  document.getElementById("lightbox").style.display = "flex";
  document.getElementById("lightbox-img").src = src;
}

function closeLightbox() {
  document.getElementById("lightbox").style.display = "none";
}

/* ================= BUY NOW WITH LOGIN CHECK ================= */
function buyNow(carName) {
  const isLoggedIn = localStorage.getItem("isLoggedIn");

  if (isLoggedIn === "true") {
    const messageBox = document.getElementById("message");
    if (messageBox) {
      messageBox.value = "I am interested in buying: " + carName;
    }

    const contactForm = document.getElementById("contact-form");
    if (contactForm) {
      contactForm.scrollIntoView({ behavior: "smooth" });
    }
  } else {
    alert("Please login first to buy this car");
    window.location.href = "login.html";
  }
}

/* ================= CONTACT FORM ================= */
function submitForm(event) {
  event.preventDefault();

  const name = document.getElementById("name").value.trim();
  const email = document.getElementById("email").value.trim();
  const phone = document.getElementById("phone").value.trim();
  const message = document.getElementById("message").value.trim();

  if (name.length < 3) {
    alert("Please enter a valid name (at least 3 characters).");
    return;
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    alert("Please enter a valid email address.");
    return;
  }

  if (!/^[0-9]{10}$/.test(phone)) {
    alert("Please enter a valid 10-digit phone number.");
    return;
  }

  if (message.length < 10) {
    alert("Message should be at least 10 characters.");
    return;
  }

  alert("Form submitted successfully! ✅");
  document.querySelector(".contact-form").reset();
  window.location.href = "index.html";
}

/* ================= FEATURED CARS FILTER ================= */
const priceFilter = document.getElementById("priceFilter");
const fuelFilter = document.getElementById("fuelFilter");
const cars = document.querySelectorAll(".car-card");

function filterCars() {
  cars.forEach(car => {
    const price = parseInt(car.dataset.price);
    const fuel = car.dataset.fuel;

    let priceOk =
      priceFilter.value === "all" ||
      (priceFilter.value === "0-500000" && price <= 500000) ||
      (priceFilter.value === "500000-1000000" && price > 500000 && price <= 1000000) ||
      (priceFilter.value === "1000000" && price > 1000000);

    let fuelOk =
      fuelFilter.value === "all" || fuel === fuelFilter.value;

    car.style.display = priceOk && fuelOk ? "block" : "none";
  });
}

if (priceFilter && fuelFilter) {
  priceFilter.addEventListener("change", filterCars);
  fuelFilter.addEventListener("change", filterCars);
}

/* ================= CONTACT FORM BORDER ================= */
const contactFormElement = document.getElementById("contact-form");
if (contactFormElement) {
  contactFormElement.style.border = "2px solid #e63946";
}

/* ================= LOGOUT FUNCTION ================= */
function logoutUser() {
  localStorage.removeItem("isLoggedIn");
  localStorage.removeItem("username");
  alert("Logged out successfully");
  updateNavbarUser();
  // Redirect to login page
  window.location.href = "login.html";
}

/* ================= NAVBAR LOGIN/USER ================= */
function updateNavbarUser() {
  const userSection = document.getElementById("user-section");
  const username = localStorage.getItem("username");

  if (username) {
    const userHTML = `
      <div class="user-dropdown">
        <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS2KaNMyagvfKzOcmK1gLUutHcuDhOJVOHPb4S4WYHurfJ3VIzT9RH4D4bovrcwWhd6XaSDDWoL6SnjvTj52LVhufP5a18RxQsZdrB7stdH&s=10" alt="User Photo" class="user-photo">
        <span class="user-name">${username}</span>
        <div class="dropdown-content">
          <a href="#">Profile</a>
          <a href="#" onclick="logoutUser()">Logout</a>
        </div>
      </div>
    `;
    userSection.innerHTML = userHTML;
  } else {
    userSection.innerHTML = `<a href="login.html" id="login-btn">Login</a>`;
  }
}

/* ================= LOGIN PROTECTION ON PAGE LOAD ================= */
window.addEventListener("load", function() {
  updateNavbarUser(); // Update navbar first
  const isLoggedIn = localStorage.getItem("isLoggedIn");

  // Redirect to login if not logged in, except on login.html
  if (!isLoggedIn && !window.location.href.includes("login.html")) {
    window.location.href = "login.html";
  }
});
