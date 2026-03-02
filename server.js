const http = require("http");
const fs = require("fs");
const path = require("path");
const querystring = require("querystring");

const port = 3000;

const server = http.createServer((req, res) => {

  /* ================= REGISTER ROUTE ================= */
  if (req.url === "/register" && req.method === "POST") {

    let body = "";

    req.on("data", chunk => body += chunk);

    req.on("end", () => {

      const formData = querystring.parse(body);

      const file = path.join(__dirname, "register.json");

      let existing = [];

      if (fs.existsSync(file)) {
        existing = JSON.parse(fs.readFileSync(file));
      }

      existing.push(formData);

      fs.writeFileSync(file, JSON.stringify(existing, null, 2));

      res.writeHead(302, { Location: "/login.html" });
      res.end();
    });

    return;
  }


  /* ================= LOGIN ROUTE (UPDATED) ================= */
  if (req.url === "/login" && req.method === "POST") {

    let body = "";

    req.on("data", chunk => body += chunk);

    req.on("end", () => {

      const formData = querystring.parse(body);

      const file = path.join(__dirname, "register.json");

      if (!fs.existsSync(file)) {
        res.end(JSON.stringify({ success:false }));
        return;
      }

      const users = JSON.parse(fs.readFileSync(file));

      const user = users.find(
        u => u.username === formData.username &&
             u.password === formData.password
      );

      if (user) {

        // ⭐ send user data
        res.writeHead(200, {"Content-Type":"application/json"});
        res.end(JSON.stringify({success:true,user}));

      } else {
        res.writeHead(200, {"Content-Type":"application/json"});
        res.end(JSON.stringify({success:false}));
      }

    });

    return;
    
  }

/* ================= CONTACT ROUTE ================= */
if (req.url === "/contact" && req.method === "POST") {

  let body = "";

  req.on("data", chunk => body += chunk);

  req.on("end", () => {

    const data = JSON.parse(body);

    const folderPath = path.join(__dirname, "data");
    const filePath = path.join(folderPath, "contact.json");

    // ✅ Folder automatic create
    if (!fs.existsSync(folderPath)) {
      fs.mkdirSync(folderPath);
    }

    let contacts = [];

    if (fs.existsSync(filePath)) {
      contacts = JSON.parse(fs.readFileSync(filePath));
    }

    contacts.push({
      ...data,
      date: new Date().toISOString()
    });

    fs.writeFileSync(filePath, JSON.stringify(contacts, null, 2));

    res.writeHead(200, {"Content-Type":"application/json"});
    res.end(JSON.stringify({ success:true }));

  });

  return;
}

/* ================= TEST DRIVE ROUTE ================= */
if (req.url === "/testdrive" && req.method === "POST") {

  let body = "";

  req.on("data", chunk => body += chunk);

  req.on("end", () => {

    const data = JSON.parse(body);

    const folderPath = path.join(__dirname, "data");
    const filePath = path.join(folderPath, "testdrive.json");

    // folder auto create
    if (!fs.existsSync(folderPath)) {
      fs.mkdirSync(folderPath);
    }

    let drives = [];

    if (fs.existsSync(filePath)) {
      drives = JSON.parse(fs.readFileSync(filePath));
    }

    drives.push({
      ...data,
      date: new Date().toISOString()
    });

    fs.writeFileSync(filePath, JSON.stringify(drives, null, 2));

    res.writeHead(200, {"Content-Type":"application/json"});
    res.end(JSON.stringify({success:true}));
  });

  return;
}
  /* ================= STATIC SERVER ================= */

  let filePath = "." + req.url;

  if (filePath === "./") {
    filePath = "./index.html";
  }

  const ext = path.extname(filePath);

  const types = {
    ".html": "text/html",
    ".css": "text/css",
    ".js": "text/javascript",
    ".jpg": "image/jpeg",
    ".png": "image/png",
    ".mp4": "video/mp4"
  };

  const contentType = types[ext] || "text/plain";

  fs.readFile(filePath, (err, data) => {
    if (err) {
      res.writeHead(404);
      res.end("File not found");
    } else {
      res.writeHead(200, { "Content-Type": contentType });
      res.end(data);
    }
  });

});

server.listen(port, () => {
  console.log("Server running → http://localhost:3000");
});