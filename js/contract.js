//<!-- JS xử lý hợp đồng -->
document.addEventListener("DOMContentLoaded", function () {
  const tableBody = document.getElementById("contractTableBody");
  const pagination = document.getElementById("pagination");
  const searchInput = document.getElementById("searchInput");
  const btnSearch = document.getElementById("btnSearch");
  const btnLoad = document.getElementById("btnLoad");

  let contracts = [];
  let filteredContracts = [];
  let currentPage = 1;
  const itemsPerPage = 10;

  // Dữ liệu mẫu
  function generateDummyContracts(count = 50) {
    const data = [];
    for (let i = 1; i <= count; i++) {
      const start = new Date(2024, i % 12, (i % 28) + 1);
      const end = new Date(2027 + (i % 5), i % 12, (i % 28) + 1); // có hợp đồng đã hết hạn

      const formatDate = (d) => d.toISOString().split("T")[0]; // YYYY-MM-DD

      data.push({
        contractId: `HD2025-${i.toString().padStart(3, "0")}`,
        storeName: `Mì Cay Đức Hiệu - CN ${i}`,
        owner: `Chủ ${String.fromCharCode(64 + (i % 26 || 26))}`,
        startDate: formatDate(start),
        endDate: formatDate(end),
        initialFee: `${200 + (i % 3) * 150} triệu`,
        royaltyRate: (i % 5) + 3,
      });
    }
    return data;
  }

  // Hiển thị Table
  function renderTable(data, page = 1) {
    tableBody.innerHTML = "";
    const start = (page - 1) * itemsPerPage;
    const end = page * itemsPerPage;
    const pageData = data.slice(start, end);

    if (pageData.length === 0) {
      tableBody.innerHTML = `<tr><td colspan="9" class="text-center">Không có dữ liệu</td></tr>`;
      return;
    }

    const today = new Date();

    pageData.forEach((contract, index) => {
      const isExpired = new Date(contract.endDate) < today;
      const statusText = isExpired ? "Hết hạn" : "Đang hiệu lực";
      const statusClass = isExpired ? "danger" : "success";

      const renewBtn = isExpired
        ? `<a href="contract-renew.html?id=${contract.contractId}" class="btn btn-primary"><i class="fas fa-sync-alt"></i></a>`
        : "";

      const row = `
        <tr>
          <td>${start + index + 1}</td>
          <td>${contract.contractId}</td>
          <td>${contract.storeName}</td>
          <td>${contract.owner}</td>
          <td>${contract.startDate}</td>
          <td>${contract.endDate}</td>
          <td>${contract.initialFee}</td>
          <td>${contract.royaltyRate}%</td>
          <td><span class="status ${statusClass}">${statusText}</span></td>
          <td>
              <a href="contract-print.html?id=${
                contract.contractId
              }" target="_blank" class="btn btn-secondary">
                <i class="fas fa-print"></i>
            </a>
            <a href="contract-detail.html?id=${
              contract.contractId
            }" class="btn btn-info"><i class="fas fa-eye"></i></a>
            <a href="contract-edit.html?id=${
              contract.contractId
            }" class="btn btn-warning"><i class="fas fa-edit"></i></a>
            ${renewBtn}
            <a class="btn btn-danger btn-delete" data-id="${
              contract.contractId
            }"><i class="fas fa-trash"></i></a>
          </td>
        </tr>
      `;
      tableBody.innerHTML += row;
    });
    renderPagination(data.length, page);
    attachDeleteEvents();
  }

  // Phân trang
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
        renderTable(filteredContracts, currentPage);
      });
      pagination.appendChild(btn);
    }
  }

  // Xoá
  function attachDeleteEvents() {
    document.querySelectorAll(".btn-delete").forEach((btn) => {
      btn.addEventListener("click", function () {
        const id = this.getAttribute("data-id");
        if (confirm("Bạn có chắc chắn muốn xóa hợp đồng này?")) {
          contracts = contracts.filter((c) => c.contractId != id);
          localStorage.setItem("contracts", JSON.stringify(contracts));
          filteredContracts = contracts;
          renderTable(filteredContracts, currentPage);
          alert("Đã xóa hợp đồng!");
        }
      });
    });
  }

  // Tìm kiếm
  function searchContracts(keyword) {
    keyword = keyword.toLowerCase();
    filteredContracts = contracts.filter(
      (contract) =>
        contract.contractId.toLowerCase().includes(keyword) ||
        contract.storeName.toLowerCase().includes(keyword) ||
        contract.owner.toLowerCase().includes(keyword)
    );
    currentPage = 1;
    renderTable(filteredContracts, currentPage);
  }

  // Load dữ liệu
  btnLoad.addEventListener("click", () => {
    contracts = generateDummyContracts(50);
    localStorage.setItem("contracts", JSON.stringify(contracts));
    filteredContracts = contracts;
    renderTable(filteredContracts, currentPage);
  });

  // Tìm kiếm
  btnSearch.addEventListener("click", () => {
    searchContracts(searchInput.value.trim());
  });

  searchInput.addEventListener("keyup", (e) => {
    if (e.key === "Enter") {
      searchContracts(searchInput.value.trim());
    }
  });

  // Lấy dữ liệu từ localstorage nếu có
  const saved = localStorage.getItem("contracts");
  if (saved) {
    contracts = JSON.parse(saved);
    filteredContracts = contracts;
    renderTable(filteredContracts, currentPage);
  }
});
