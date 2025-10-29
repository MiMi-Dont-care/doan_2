document.addEventListener("DOMContentLoaded", function () {
  const params = new URLSearchParams(window.location.search);
  const id = params.get("id");
  let users = JSON.parse(localStorage.getItem("users")) || [];
  let user = users.find((u) => u.id == id);

  const detail = document.getElementById("userDetail");
  if (!user) {
    detail.innerHTML = "<p class='text-danger'>Không tìm thấy người dùng.</p>";
    return;
  }

  detail.innerHTML = `
        <p><strong>Tên:</strong> ${user.name}</p>
        <p><strong>Email:</strong> ${user.email}</p>
        <p><strong>SĐT:</strong> ${user.phone}</p>
        <p><strong>Role:</strong> ${user.role}</p>
      `;

  document.getElementById("btnEdit").href = `user-edit.html?id=${user.id}`;
  document.getElementById("btnDelete").addEventListener("click", () => {
    if (confirm("Bạn có chắc chắn muốn xóa?")) {
      users = users.filter((u) => u.id != id);
      localStorage.setItem("users", JSON.stringify(users));
      alert("Đã xóa!");
      window.location.href = "user.html";
    }
  });
});
