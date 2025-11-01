document.addEventListener("DOMContentLoaded", function () {
  const params = new URLSearchParams(window.location.search);
  const id = params.get("id");
  let users = JSON.parse(localStorage.getItem("users")) || [];
  let user = users.find((u) => u.id == id);

  if (!user) {
    alert("Không tìm thấy người dùng!");
    window.location.href = "user.html";
    return;
  }

  document.getElementById("name").value = user.name;
  document.getElementById("email").value = user.email;
  document.getElementById("phone").value = user.phone;
  document.getElementById("role").value = user.role;

  document.getElementById("userForm").addEventListener("submit", function (e) {
    e.preventDefault();
    user.name = document.getElementById("name").value;
    user.email = document.getElementById("email").value;
    user.phone = document.getElementById("phone").value;
    user.role = document.getElementById("role").value;
    localStorage.setItem("users", JSON.stringify(users));
    alert("Cập nhật thành công!");
    window.location.href = "user.html";
  });
});
