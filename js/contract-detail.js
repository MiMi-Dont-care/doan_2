document.addEventListener("DOMContentLoaded", function () {
  const params = new URLSearchParams(window.location.search);
  const id = params.get("id");
  const detailContainer = document.getElementById("contractDetail");
  const btnEdit = document.getElementById("btnEdit");
  const btnDelete = document.getElementById("btnDelete");
  const btnRenew = document.getElementById("btnRenew");

  let contracts = JSON.parse(localStorage.getItem("contracts")) || [];
  let contract = contracts.find((c) => c.contractId === id);

  if (!contract) {
    detailContainer.innerHTML =
      "<p class='text-danger'>Không tìm thấy hợp đồng.</p>";
    btnEdit.style.display = "none";
    btnDelete.style.display = "none";
    return;
  }

  // Xác định trạng thái theo ngày
  const today = new Date();
  const isExpired = new Date(contract.endDate) < today;
  const statusText = isExpired ? "Hết hạn" : "Đang hiệu lực";
  const statusClass = isExpired ? "danger" : "success";

  detailContainer.innerHTML = `
        <div class="store-card">
          <p><strong>Mã hợp đồng:</strong> ${contract.contractId}</p>
          <p><strong>Tên cửa hàng:</strong> ${contract.storeName}</p>
          <p><strong>Chủ cửa hàng:</strong> ${contract.owner}</p>
          <p><strong>Ngày ký HĐ:</strong> ${contract.startDate}</p>
          <p><strong>Ngày hết hạn:</strong> ${contract.endDate}</p>
          <p><strong>Phí nhượng quyền:</strong> ${contract.initialFee}</p>
          <p><strong>% phí doanh thu:</strong> ${contract.royaltyRate}%</p>
          <p><strong>Trạng thái:</strong> <span class="status ${statusClass}">${statusText}</span></p>
        </div>
      `;

  // Sửa
  btnEdit.href = `contract-edit.html?id=${contract.contractId}`;

  // Gia hạn
  if (isExpired) {
    btnRenew.style.display = "inline-block";
    btnRenew.href = `contract-renew.html?id=${contract.contractId}`;
  }

  // Xoá
  btnDelete.addEventListener("click", function () {
    if (confirm("Bạn có chắc chắn muốn xóa hợp đồng này?")) {
      contracts = contracts.filter((c) => c.contractId !== id);
      localStorage.setItem("contracts", JSON.stringify(contracts));
      alert("Đã xóa hợp đồng.");
      window.location.href = "contract.html";
    }
  });
});
