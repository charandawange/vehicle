/* ================= MENU TOGGLE ================= */
function toggleMenu() {
  document.querySelector(".nav-links").classList.toggle("show");
}

window.addEventListener("load", function(){
  document.getElementById("preloader").style.display="none";
});


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
        <img id="profile-pic" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS2KaNMyagvfKzOcmK1gLUutHcuDhOJVOHPb4S4WYHurfJ3VIzT9RH4D4bovrcwWhd6XaSDDWoL6SnjvTj52LVhufP5a18RxQsZdrB7stdH&s=10" alt="User Photo" class="user-photo">
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
//test drive
function bookTestDrive() {
  const car = document.getElementById('car').value.trim();
  const name = document.getElementById('td-name').value.trim();
  const email = document.getElementById('td-email').value.trim();
  const phone = document.getElementById('td-phone').value.trim();
  const date = document.getElementById('date').value;
  const time = document.getElementById('time').value;

  // Check for empty fields
  if (!car) {
    alert('Please select a car.');
    return;
  }
  if (!date) {
    alert('Please select a date.');
    return;
  }
  if (!time) {
    alert('Please select a time.');
    return;
  }
  if (!name) {
    alert('Please enter your name.');
    return;
  }
  if (!email) {
    alert('Please enter your email.');
    return;
  }
  if (!phone) {
    alert('Please enter your phone number.');
    return;
  }

  // Email validation regex
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    alert('Please enter a valid email address.');
    return;
  }

  // Phone validation: digits only, 10 to 15 length
  const phoneRegex = /^\d{10,15}$/;
  if (!phoneRegex.test(phone)) {
    alert('Please enter a valid phone number (10 to 15 digits).');
    return;
  }

  // Date validation: must be today or later
  const selectedDate = new Date(date);
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  if (selectedDate < today) {
    alert('Please select a valid date (today or in the future).');
    return;
  }

  // Time validation: 24-hour format HH:mm
  const timeRegex = /^([01]\d|2[0-3]):([0-5]\d)$/;
  if (!timeRegex.test(time)) {
    alert('Please enter a valid time (HH:mm, 24-hour format).');
    return;
  }

  // Save booking to localStorage (demo)
  let bookings = JSON.parse(localStorage.getItem('testDriveBookings') || '[]');
  bookings.push({ car, name, email, phone, date, time });
  localStorage.setItem('testDriveBookings', JSON.stringify(bookings));

  alert(`Test drive booked!\nCar: ${car}\nDate: ${date}\nTime: ${time}`);

  // Reset form fields
  document.getElementById('car').value = '';
  document.getElementById('td-name').value = '';
  document.getElementById('td-email').value = '';
  document.getElementById('td-phone').value = '';
  document.getElementById('date').value = '';
  document.getElementById('time').value = '';
}
// // Disable right click
// document.addEventListener("contextmenu", function(e) {
//   e.preventDefault();
// });
// window.onload = () => {
//   document.getElementById("preloader").style.display = "none";
// };


function addToWishlist(name, image, price, btn) {

  let wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];

  let alreadyAdded = wishlist.find(item => item.name === name);

  if (alreadyAdded) {
    alert("Already in wishlist ❤️");
    return;
  }

  let car = { name, image, price };
  wishlist.push(car);

  localStorage.setItem("wishlist", JSON.stringify(wishlist));

  // heart ko red karo
  btn.classList.add("active");

  alert(name + " added to wishlist ❤️");
}


// see more

document.querySelectorAll(".see-more-btn").forEach(btn => {
  btn.addEventListener("click", function(){

    let card = this.closest(".gallery-item");

    document.getElementById("carModal").style.display = "flex";

    document.getElementById("modalName").innerText = card.dataset.name;
    document.getElementById("modalEngine").innerText = "Engine: " + card.dataset.engine;
    document.getElementById("modalMileage").innerText = "Mileage: " + card.dataset.mileage;
    document.getElementById("modalDemand").innerText = "Demand: " + card.dataset.demand;
    document.getElementById("modalFeatures").innerText = "Features: " + card.dataset.features;
  });
});

function closeCarInfo(){
  document.getElementById("carModal").style.display = "none";
}

function viewDetails(car) {
    window.location.href = "car-details.html?car=" + car;
}
function toggleMenu() {
  document.querySelector(".nav-links").classList.toggle("show");
}
