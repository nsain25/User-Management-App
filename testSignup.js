const fetch = require("node-fetch");

async function testSignup() {
  const response = await fetch("http://localhost:3000/api/auth/signup", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email: "test@example.com", password: "testpassword" }),
  });

  const data = await response.json();
  console.log(data);
}

testSignup();
