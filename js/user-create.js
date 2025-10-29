document.getElementById("userForm").addEventListener("submit", function (e) {
  e.preventDefault();
  const user = {
    id: Date.now(),
    name: document.getElementById("name").value,
    email: document.getElementById("email").value,
    phone: document.getElementById("phone").value,
    role: document.getElementById("role").value,
  };
  let users = JSON.parse(localStorage.getItem("users")) || [];
  users.push(user);
  localStorage.setItem("users", JSON.stringify(users));
  alert("Tạo người dùng thành công!");
  window.location.href = "user.html";
});
