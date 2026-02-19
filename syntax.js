document.addEventListener("DOMContentLoaded", function () {

/* ================= MENU TOGGLE ================= */
window.toggleMenu = function () {
  const nav = document.querySelector(".nav-links");
  if (nav) nav.classList.toggle("show");
};

/* ================= PRELOADER ================= */
window.addEventListener("load", function () {
  const pre = document.getElementById("preloader");
  if (pre) pre.style.display = "none";
});

/* ================= SLIDER ================= */
const slides = document.querySelectorAll(".slide");
let index = 0;

function showNextSlide() {
  if (slides.length === 0) return;
  slides[index].classList.remove("active");
  index = (index + 1) % slides.length;
  slides[index].classList.add("active");
}

function showPrevSlide() {
  if (slides.length === 0) return;
  slides[index].classList.remove("active");
  index = (index - 1 + slides.length) % slides.length;
  slides[index].classList.add("active");
}

const nextBtn = document.querySelector(".next");
const prevBtn = document.querySelector(".prev");

if (nextBtn && prevBtn && slides.length > 0) {
  nextBtn.onclick = showNextSlide;
  prevBtn.onclick = showPrevSlide;
  setInterval(showNextSlide, 5000);
}

/* ================= IMAGE MODAL ================= */
window.openFullImage = function (imgSrc) {
  const modal = document.getElementById("imageModal");
  const img = document.getElementById("imgFullView");
  if (modal && img) {
    modal.style.display = "block";
    img.src = imgSrc;
  }
};

window.closeFullImage = function () {
  const modal = document.getElementById("imageModal");
  if (modal) modal.style.display = "none";
};

window.onclick = function (event) {
  const modal = document.getElementById("imageModal");
  if (modal && event.target === modal) modal.style.display = "none";
};

/* ================= LIGHTBOX ================= */
window.openLightbox = function (src) {
  const box = document.getElementById("lightbox");
  const img = document.getElementById("lightbox-img");
  if (box && img) {
    box.style.display = "flex";
    img.src = src;
  }
};

window.closeLightbox = function () {
  const box = document.getElementById("lightbox");
  if (box) box.style.display = "none";
};

/* ================= BUY NOW ================= */
window.buyNow = function (carName) {
  const isLoggedIn = localStorage.getItem("isLoggedIn");

  if (isLoggedIn === "true") {
    const msg = document.getElementById("message");
    if (msg) msg.value = "I am interested in buying: " + carName;

    const form = document.getElementById("contact-form");
    if (form) form.scrollIntoView({ behavior: "smooth" });
  } else {
    alert("Please login first");
    window.location.href = "login.html";
  }
};

/* ================= FILTER ================= */
const priceFilter = document.getElementById("priceFilter");
const fuelFilter = document.getElementById("fuelFilter");
const cars = document.querySelectorAll(".car-card");

function filterCars() {
  cars.forEach((car) => {
    const price = parseInt(car.dataset.price || 0);
    const fuel = car.dataset.fuel;

    const priceOk =
      !priceFilter ||
      priceFilter.value === "all" ||
      (priceFilter.value === "0-500000" && price <= 500000) ||
      (priceFilter.value === "500000-1000000" &&
        price > 500000 &&
        price <= 1000000) ||
      (priceFilter.value === "1000000" && price > 1000000);

    const fuelOk =
      !fuelFilter || fuelFilter.value === "all" || fuel === fuelFilter.value;

    car.style.display = priceOk && fuelOk ? "block" : "none";
  });
}

if (priceFilter) priceFilter.addEventListener("change", filterCars);
if (fuelFilter) fuelFilter.addEventListener("change", filterCars);

/* ================= NAVBAR USER ================= */
window.logoutUser = function () {
  localStorage.removeItem("isLoggedIn");
  localStorage.removeItem("username");
  alert("Logged out");
  updateNavbarUser();
  window.location.href = "login.html";
};

window.updateNavbarUser = function () {
  const userSection = document.getElementById("user-section");
  if (!userSection) return;

  const username = localStorage.getItem("username");

  if (username) {
    userSection.innerHTML = `
      <div class="user-dropdown">
        <img id="profile-pic" src="https://i.imgur.com/6VBx3io.png">
        <span>${username}</span>
        <div class="dropdown-content">
          <a href="#">Profile</a>
          <a href="#" onclick="logoutUser()">Logout</a>
        </div>
      </div>`;
  } else {
    userSection.innerHTML = `<a href="login.html">Login</a>`;
  }
};

updateNavbarUser();

/* ================= WISHLIST ================= */
window.addToWishlist = function (name, image, price, btn) {
  let wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];

  if (wishlist.find((i) => i.name === name)) {
    alert("Already added ❤️");
    return;
  }

  wishlist.push({ name, image, price });
  localStorage.setItem("wishlist", JSON.stringify(wishlist));

  if (btn) btn.classList.add("active");
  alert("Added ❤️");
};
/* ================= SEE MORE MODAL ================= */

const seeMoreBtns = document.querySelectorAll(".see-more-btn");

seeMoreBtns.forEach(btn=>{
  btn.addEventListener("click",function(){

    const card = this.closest(".gallery-item");

    document.getElementById("modalName").innerText =
      card.dataset.name;

    document.getElementById("modalEngine").innerText =
      "Engine: " + card.dataset.engine;

    document.getElementById("modalMileage").innerText =
      "Mileage: " + card.dataset.mileage;

    document.getElementById("modalDemand").innerText =
      "Demand: " + card.dataset.demand;

    document.getElementById("modalFeatures").innerText =
      "Features: " + card.dataset.features;

    document.getElementById("carModal").style.display="flex";
  });
});



    

window.closeCarInfo = function () {
  const m = document.getElementById("carModal");
  if (m) m.style.display = "none";
};

window.viewDetails = function (car) {
  window.location.href = "car-details.html?car=" + car;
};

});
