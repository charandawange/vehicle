let container = document.getElementById("wishlist-container");

function getWishlist(){
  return JSON.parse(localStorage.getItem("wishlist")) || [];
}

function showWishlist() {
  if (!container) return;

  let wishlist = getWishlist();
  container.innerHTML = "";

  if (wishlist.length === 0) {
    container.innerHTML = "<h2>Your wishlist is empty ❤️</h2>";
    return;
  }

  wishlist.forEach((car, index) => {
    container.innerHTML += `
      <div style="border:1px solid #ccc;padding:10px;margin:10px;width:250px">
        <img src="${car.image}" width="200">
        <h3>${car.name}</h3>
        <p>₹${car.price}</p>
        <button onclick="removeItem(${index})">Remove</button>
      </div>
    `;
  });
}

function removeItem(index) {
  let wishlist = getWishlist();
  wishlist.splice(index, 1);
  localStorage.setItem("wishlist", JSON.stringify(wishlist));
  showWishlist();
}

function addToWishlist(name, image, price, btn) {
  let wishlist = getWishlist();

  // duplicate stop
  if (wishlist.find(item => item.name === name)) {
    alert("Already added ❤️");
    return;
  }

  wishlist.push({ name, image, price });
  localStorage.setItem("wishlist", JSON.stringify(wishlist));

  if (btn) btn.classList.add("active");
  alert(name + " added to wishlist ❤️");
}

showWishlist();
