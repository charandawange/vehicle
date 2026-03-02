let cars = JSON.parse(localStorage.getItem("cars")) || [];

function save(){
  localStorage.setItem("cars", JSON.stringify(cars));
  show();
}

/* ✅ ADD CAR */
function addCar(){
  const name=document.getElementById("name").value;
  const price=document.getElementById("price").value;
  const fuel=document.getElementById("fuel").value;
  const img=document.getElementById("img").value;

  if(!name || !price || !img){
    alert("Fill all fields");
    return;
  }

  cars.push({
    name,
    price:Number(price),   // ⭐ important
    fuel: fuel || "Petrol",
    img
  });

  save();

  document.getElementById("name").value="";
  document.getElementById("price").value="";
  document.getElementById("fuel").value="";
  document.getElementById("img").value="";
}

/* ✅ DELETE */
function deleteCar(i){
  if(confirm("Delete car?")){
    cars.splice(i,1);
    save();
  }
}

/* ✅ EDIT PRICE */
function editPrice(i){
  const newPrice=prompt("New price");
  if(newPrice){
    cars[i].price=Number(newPrice);   // ⭐ important
    save();
  }
}

/* ✅ SHOW */
function show(){
  const box=document.getElementById("car-list");
  if(!box) return;

  box.innerHTML="";

  cars.forEach((c,i)=>{

    const div=document.createElement("div");

    div.className="card";

    /* ⭐ FILTER FIX */
    div.dataset.price=c.price;
    div.dataset.fuel=(c.fuel || "petrol").toLowerCase();

    div.innerHTML=`
      <img src="${c.img}" alt="${c.name}">
      <h3>${c.name}</h3>
      <p>${c.fuel} • Automatic</p>
      <p style="color:#ef4444;font-weight:600;">₹${c.price}</p>
      <button onclick="editPrice(${i})">Edit Price</button>
      <button onclick="deleteCar(${i})">Delete</button>
    `;

    box.appendChild(div);
  });
}

show();