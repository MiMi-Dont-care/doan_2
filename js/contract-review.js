document.addEventListener("DOMContentLoaded", function () {
  const params = new URLSearchParams(window.location.search);
  const id = params.get("id");

  let contracts = JSON.parse(localStorage.getItem("contracts")) || [];
  let contract = contracts.find((c) => c.contractId === id);

  const infoContainer = document.getElementById("contractInfo");
  const form = document.getElementById("renewForm");

  if (!contract) {
    infoContainer.innerHTML =
      "<p class='text-danger'>Không tìm thấy hợp đồng.</p>";
    form.style.display = "none";
    return;
  }

  // Hiển thị thông tin hợp đồng hiện tại
  const today = new Date();
  const isExpired = new Date(contract.endDate) < today;
  const statusText = isExpired ? "Hết hạn" : "Đang hiệu lực";

  infoContainer.innerHTML = `
        <div class="store-card">
          <p><strong>Mã hợp đồng:</strong> ${contract.contractId}</p>
          <p><strong>Tên cửa hàng:</strong> ${contract.storeName}</p>
          <p><strong>Chủ cửa hàng:</strong> ${contract.owner}</p>
          <p><strong>Ngày ký:</strong> ${contract.startDate}</p>
          <p><strong>Ngày hết hạn (cũ):</strong> ${contract.endDate}</p>
          <p><strong>Phí nhượng quyền:</strong> ${contract.initialFee}</p>
          <p><strong>% phí doanh thu:</strong> ${contract.royaltyRate}%</p>
          <p><strong>Trạng thái hiện tại:</strong> <span class="status ${
            isExpired ? "danger" : "success"
          }">${statusText}</span></p>
        </div>
      `;

  // Submit gia hạn
  form.addEventListener("submit", function (e) {
    e.preventDefault();

    const newEndDate = document.getElementById("newEndDate").value;

    const today = new Date();

    if (!newEndDate) {
      alert("Vui lòng chọn ngày hết hạn mới.");
      return;
    }

    if (new Date(newEndDate) <= new Date(contract.endDate)) {
      alert("Ngày hết hạn mới phải lớn hơn ngày hết hạn cũ.");
      return;
    }

    if (new Date(newEndDate) <= today) {
      alert("Ngày hết hạn mới phải lớn hơn ngày hiện tại.");
      return;
    }

    // Cập nhật ngày hết hạn và tính lại trạng thái
    contract.endDate = newEndDate;
    contract.status =
      new Date(contract.endDate) < new Date() ? "Hết hạn" : "Đang hiệu lực";

    localStorage.setItem("contracts", JSON.stringify(contracts));
    alert("Gia hạn hợp đồng thành công!");
    window.location.href = "contract.html";
  });
});
