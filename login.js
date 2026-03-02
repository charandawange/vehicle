async function loginUser(){

  const username=document.getElementById("username").value.trim();
  const password=document.getElementById("password").value.trim();

  if(!username || !password){
    alert("Enter username & password");
    return;
  }

  try{

    const res = await fetch("/login",{
      method:"POST",
      headers:{
        "Content-Type":"application/x-www-form-urlencoded"
      },
      body:`username=${encodeURIComponent(username)}&password=${encodeURIComponent(password)}`
    });

    const data = await res.json();

    if(data.success){

      // ⭐ user save for profile
      localStorage.setItem("user",JSON.stringify(data.user));

      alert("Login success ✔");
      window.location.href="index.html";

    }else{
      alert(data.message || "Invalid login ❌");
    }

  }catch(err){
    console.log(err);
    alert("Server error");
  }
}