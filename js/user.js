document.addEventListener("DOMContentLoaded", function () {
  const tableBody = document.getElementById("userTableBody");
  const pagination = document.getElementById("pagination");
  const searchInput = document.getElementById("searchInput");
  const btnSearch = document.getElementById("btnSearch");
  const btnLoad = document.getElementById("btnLoad");

  let users = [];
  let filteredUsers = [];
  let currentPage = 1;
  const itemsPerPage = 10;

  // Dummy data
  function generateDummyUsers(count = 20) {
    const roles = ["Chủ cửa hàng", "Kế toán"];
    const data = [];
    for (let i = 1; i <= count; i++) {
      data.push({
        id: Date.now() + i,
        name: `Người dùng ${i}`,
        email: `user${i}@example.com`,
        phone: "09" + Math.floor(10000000 + Math.random() * 89999999),
        role: roles[i % 2],
      });
    }
    return data;
  }

  // Render table
  function renderTable(data, page = 1) {
    tableBody.innerHTML = "";
    const start = (page - 1) * itemsPerPage;
    const end = page * itemsPerPage;
    const pageData = data.slice(start, end);

    if (pageData.length === 0) {
      tableBody.innerHTML = `<tr><td colspan="6" class="text-center">Không có dữ liệu</td></tr>`;
      return;
    }

    pageData.forEach((user, index) => {
      tableBody.innerHTML += `
            <tr>
              <td>${start + index + 1}</td>
              <td>${user.name}</td>
              <td>${user.email}</td>
              <td>${user.phone}</td>
              <td>${user.role}</td>
              <td>
                <a href="user-detail.html?id=${
                  user.id
                }" class="btn btn-info"><i class="fas fa-eye"></i></a>
                <a href="user-edit.html?id=${
                  user.id
                }" class="btn btn-warning"><i class="fas fa-edit"></i></a>
                <a class="btn btn-danger btn-delete" data-id="${
                  user.id
                }"><i class="fas fa-trash"></i></a>
              </td>
            </tr>
          `;
    });

    renderPagination(data.length, page);
    attachDeleteEvents();
  }

  // Pagination
  function renderPagination(totalItems, page) {
    pagination.innerHTML = "";
    const totalPages = Math.ceil(totalItems / itemsPerPage);

    if (totalPages <= 1) return;

    for (let i = 1; i <= totalPages; i++) {
      const btn = document.createElement("button");
      btn.className = "btn " + (i === page ? "btn-primary" : "");
      btn.textContent = i;
      btn.addEventListener("click", () => {
        currentPage = i;
        renderTable(filteredUsers, currentPage);
      });
      pagination.appendChild(btn);
    }
  }

  // Delete
  function attachDeleteEvents() {
    document.querySelectorAll(".btn-delete").forEach((btn) => {
      btn.addEventListener("click", function () {
        const id = this.getAttribute("data-id");
        if (confirm("Bạn có chắc chắn muốn xóa người dùng này?")) {
          users = users.filter((u) => u.id != id);
          localStorage.setItem("users", JSON.stringify(users));
          filteredUsers = users;
          renderTable(filteredUsers, currentPage);
          alert("Đã xóa người dùng!");
        }
      });
    });
  }

  // Search
  function searchUsers(keyword) {
    keyword = keyword.toLowerCase();
    filteredUsers = users.filter(
      (user) =>
        user.name.toLowerCase().includes(keyword) ||
        user.email.toLowerCase().includes(keyword) ||
        user.phone.toLowerCase().includes(keyword) ||
        user.role.toLowerCase().includes(keyword)
    );
    currentPage = 1;
    renderTable(filteredUsers, currentPage);
  }

  // Load dummy
  btnLoad.addEventListener("click", () => {
    users = generateDummyUsers(20);
    localStorage.setItem("users", JSON.stringify(users));
    filteredUsers = users;
    renderTable(filteredUsers, currentPage);
  });

  // Search
  btnSearch.addEventListener("click", () => {
    searchUsers(searchInput.value.trim());
  });
  searchInput.addEventListener("keyup", (e) => {
    if (e.key === "Enter") {
      searchUsers(searchInput.value.trim());
    }
  });

  // Init
  const saved = localStorage.getItem("users");
  if (saved) {
    users = JSON.parse(saved);
    filteredUsers = users;
    renderTable(filteredUsers, currentPage);
  }
});
