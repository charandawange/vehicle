document.addEventListener("DOMContentLoaded", function () {

/* ================= USER CHECK ================= */
function getUser(){
  return JSON.parse(localStorage.getItem("user"));
}

/* ================= NAVBAR USER ================= */
window.updateNavbarUser = function () {
  const userSection = document.getElementById("user-section");
  if (!userSection) return;

  const user = getUser();

  if (user) {

    // 🔹 Get saved profile image
    const savedImage = localStorage.getItem("profileImage") 
      || "https://i.imgur.com/6VBx3io.png";

    userSection.innerHTML = `
      <div class="user-dropdown">
        <img id="profile-pic" src="${savedImage}">
        <span>${user.username}</span>
        <div class="dropdown-content">
          <a href="profile.html">Profile</a>
          <a href="#" onclick="logoutUser()">Logout</a>
          <button onclick="adminLogin()">Admin</button>
        </div>
      </div>`;

    // 🔹 Dropdown Click Toggle
    setTimeout(() => {
      const drop = document.querySelector(".user-dropdown");
      if (drop) {
        drop.addEventListener("click", () => {
          drop.classList.toggle("open");
        });
      }
    }, 100);

  } else {
    userSection.innerHTML = `<a href="login.html">Login</a>`;
  }
  
};

window.logoutUser = function () {
  localStorage.removeItem("user");
  alert("Logged out");
  window.location.href = "login.html";
};

updateNavbarUser();

/* ================= WISHLIST ================= */
const wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];

document.querySelectorAll(".wishlist-btn").forEach(btn=>{
  const name = btn.dataset.name;
  if(wishlist.find(i=>i.name===name)){
    btn.classList.add("active");
  }
});

window.addToWishlist = function (name, price, image, btn) {

  if(!getUser()){
    alert("Please login first");
    window.location.href="login.html";
    return;
  }

  let wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];

  if (wishlist.find((i) => i.name === name)) {
    alert("Already added ❤️");
    return;
  }

  wishlist.push({ name, price, image });
  localStorage.setItem("wishlist", JSON.stringify(wishlist));

  if (btn) btn.classList.add("active");
  alert("Added ❤️");
};

/* ================= ADMIN CARS SHOW ================= */
const adminCars = JSON.parse(localStorage.getItem("cars")) || [];
const grid = document.getElementById("carsGrid");

if(grid){
  adminCars.forEach(car=>{
    const div=document.createElement("div");
    div.className="car-card";
    div.innerHTML=`
      <img src="${car.img}">
      <div class="car-info">
        <h3>${car.name}</h3>
        <p>${car.fuel || "Petrol"} • Automatic</p>
        <span class="price">${car.price}</span>
      </div>
    `;
    grid.appendChild(div);
  });
}

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
  slides[0].classList.add("active");
}

/* ================= BUY NOW ================= */
window.buyNow = function (carName) {

  if (getUser()) {
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

/* ================= SEE MORE MODAL ================= */

const seeMoreBtns = document.querySelectorAll(".see-more-btn");

seeMoreBtns.forEach(btn => {
  btn.addEventListener("click", function () {

    const card = this.closest(".gallery-item");
    if (!card) return;

    document.getElementById("modalName").innerText = card.dataset.name;
    document.getElementById("modalEngine").innerText = "Engine: " + card.dataset.engine;
    document.getElementById("modalMileage").innerText = "Mileage: " + card.dataset.mileage;
    document.getElementById("modalDemand").innerText = "Demand: " + card.dataset.demand;
    document.getElementById("modalFeatures").innerText = "Features: " + card.dataset.features;

    document.getElementById("carModal").style.display = "flex";
  });
});
});
/* ================= CLOSE CAR MODAL ================= */

function closeCarInfo() {
  const modal = document.getElementById("carModal");
  if (modal) modal.style.display = "none";
}

window.addEventListener("click", function (e) {
  const modal = document.getElementById("carModal");
  if (e.target === modal) {
    modal.style.display = "none";
  }
});
/* ================= BACK TO TOP ================= */
let topBtn = document.getElementById("topBtn");

window.onscroll = function(){
  if(!topBtn) return;

  if(document.body.scrollTop > 200 || document.documentElement.scrollTop > 200){
    topBtn.style.display = "block";
  }else{
    topBtn.style.display = "none";
  }
};

function topFunction(){
  window.scrollTo({
    top:0,
    behavior:"smooth"
  });
}

// contact ka data save in localStorage

async function submitForm(e){
  e.preventDefault();

  const name = document.getElementById("name").value;
  const email = document.getElementById("email").value;
  const phone = document.getElementById("phone").value;
  const message = document.getElementById("message").value;

  const contact = { name, email, phone, message, date: new Date() };

  // 🔹 localStorage save (optional)
  let contacts = JSON.parse(localStorage.getItem("contacts")) || [];
  contacts.push(contact);
  localStorage.setItem("contacts", JSON.stringify(contacts));

  // 🔹 Server pe save
  const res = await fetch("/contact",{
    method:"POST",
    headers:{ "Content-Type":"application/json" },
    body:JSON.stringify({
      name,
      email,
      phone,
      message
    })
  });

  const data = await res.json();

  if(data.success){
    alert("Message saved in server ✅");
  }else{
    alert("Server error ❌");
  }

  e.target.reset();
}

// test drive form submit
async function bookTestDrive(){

  const car = document.getElementById("car").value;
  const date = document.getElementById("date").value;
  const time = document.getElementById("time").value;
  const name = document.getElementById("td-name").value;
  const email = document.getElementById("td-email").value;
  const phone = document.getElementById("td-phone").value;

  if(!car || !date || !time || !name || !email || !phone){
    alert("Please fill all fields");
    return;
  }

  const res = await fetch("/testdrive",{
    method:"POST",
    headers:{ "Content-Type":"application/json" },
    body: JSON.stringify({
      car,
      date,
      time,
      name,
      email,
      phone
    })
  });

  const data = await res.json();

  if(data.success){
    alert("Test Drive Booked Successfully 🚗");
  }else{
    alert("Something went wrong");
  }
}
/* ================= LIGHTBOX ================= */

function openLightbox(imageSrc) {
  const lightbox = document.getElementById("lightbox");
  const lightboxImg = document.getElementById("lightbox-img");

  if (!lightbox || !lightboxImg) return;

  lightbox.style.display = "flex";
  lightboxImg.src = imageSrc;
}

function closeLightbox() {
  const lightbox = document.getElementById("lightbox");
  if (lightbox) {
    lightbox.style.display = "none";
  }
}