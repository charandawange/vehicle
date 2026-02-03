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

document.querySelector('.next').onclick = showNextSlide;
document.querySelector('.prev').onclick = showPrevSlide;

setInterval(showNextSlide, 5000); 

 // 1. Function to open full image
    function openFullImage(imgSrc) {
        document.getElementById("imageModal").style.display = "block";
        document.getElementById("imgFullView").src = imgSrc;
    }

    // 2. Function to close full image
    function closeFullImage() {
        document.getElementById("imageModal").style.display = "none";
    }

    // 3. Buy Button Action
    function buyNow(carName) {
        alert("Thank you for choosing the " + carName + "! Our team will contact you soon.");
    }

    // Modal ko screen click se band karna
    window.onclick = function(event) {
        let modal = document.getElementById("imageModal");
        if (event.target == modal) {
            modal.style.display = "none";
        }
    }

// Lightbox functions
  function openLightbox(src) {
    document.getElementById("lightbox").style.display = "flex";
    document.getElementById("lightbox-img").src = src;
  }

  function closeLightbox() {
    document.getElementById("lightbox").style.display = "none";
  }

// contact form validation

function submitForm(event) {
  event.preventDefault();
  alert("Thank you! Your message has been sent.");
}


function submitForm(event) {
  event.preventDefault(); // Stop form from submitting

  // Get form values
  const name = document.getElementById("name").value.trim();
  const email = document.getElementById("email").value.trim();
  const phone = document.getElementById("phone").value.trim();
  const message = document.getElementById("message").value.trim();

  // Simple validations
  if (name.length < 10) {
    alert("Please enter a valid name (at least 3 characters).");
    return;
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    alert("Please enter a valid email address.");
    return;
  }

  const phoneRegex = /^[0-9]{10}$/;
  if (!phoneRegex.test(phone)) {
    alert("Please enter a valid 10-digit phone number.");
    return;
  }

  if (message.length < 10) {
    alert("Message should be at least 10 characters.");
    return;
  }

  // If validation passes
  alert("Form submitted successfully! ✅");

  // Optional: Reset form
  document.querySelector(".contact-form").reset();
}


// featured cars section 
 const priceFilter = document.getElementById("priceFilter");
const fuelFilter = document.getElementById("fuelFilter");
const cars = document.querySelectorAll(".car-card");

function filterCars() {
  const priceValue = priceFilter.value;
  const fuelValue = fuelFilter.value;

  cars.forEach(car => {
    const carPrice = parseInt(car.dataset.price);
    const carFuel = car.dataset.fuel;

    let priceMatch = false;
    let fuelMatch = false;

    // PRICE FILTER
    if (priceValue === "all") {
      priceMatch = true;
    } else if (priceValue === "0-500000") {
      priceMatch = carPrice <= 500000;
    } else if (priceValue === "500000-1000000") {
      priceMatch = carPrice > 500000 && carPrice <= 1000000;
    } else if (priceValue === "1000000") {
      priceMatch = carPrice > 1000000;
    }

    // FUEL FILTER
    if (fuelValue === "all") {
      fuelMatch = true;
    } else {
      fuelMatch = carFuel === fuelValue;
    }

    // SHOW / HIDE
    if (priceMatch && fuelMatch) {
      car.style.display = "block";
    } else {
      car.style.display = "none";
    }
  });
}

// EVENT LISTENERS
priceFilter.addEventListener("change", filterCars);
fuelFilter.addEventListener("change", filterCars);
