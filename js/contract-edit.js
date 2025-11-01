document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("contractForm");

  // Lấy id từ URL
  const params = new URLSearchParams(window.location.search);
  const id = params.get("id");

  let contracts = JSON.parse(localStorage.getItem("contracts")) || [];
  const contract = contracts.find((c) => c.contractId === id);

  if (!contract) {
    alert("Không tìm thấy hợp đồng!");
    window.location.href = "contract.html";
    return;
  }

  // Fill dữ liệu
  document.getElementById("contractId").value = contract.contractId;
  document.getElementById("storeName").value = contract.storeName;
  document.getElementById("owner").value = contract.owner;
  document.getElementById("startDate").value = contract.startDate;
  document.getElementById("endDate").value = contract.endDate;
  document.getElementById("initialFee").value = parseInt(
    contract.initialFee.replace(/\D/g, "")
  );
  document.getElementById("royaltyRate").value = contract.royaltyRate;

  // Submit
  form.addEventListener("submit", function (e) {
    e.preventDefault();

    const storeName = document.getElementById("storeName").value.trim();
    const owner = document.getElementById("owner").value.trim();
    const startDate = document.getElementById("startDate").value;
    const endDate = document.getElementById("endDate").value;
    const initialFee = document.getElementById("initialFee").value;
    const royaltyRate = document.getElementById("royaltyRate").value;

    if (!storeName || !owner) {
      alert("Vui lòng nhập đầy đủ thông tin.");
      return;
    }
    if (new Date(startDate) >= new Date(endDate)) {
      alert("Ngày hết hạn phải sau ngày ký hợp đồng.");
      return;
    }
    if (initialFee <= 0) {
      alert("Phí nhượng quyền phải lớn hơn 0.");
      return;
    }
    if (royaltyRate < 1 || royaltyRate > 20) {
      alert("Phần trăm phí doanh thu phải từ 1 đến 20.");
      return;
    }

    contract.storeName = storeName;
    contract.owner = owner;
    contract.startDate = startDate;
    contract.endDate = endDate;
    contract.initialFee = parseInt(initialFee).toLocaleString("vi-VN") + " VNĐ";
    contract.royaltyRate = royaltyRate;

    localStorage.setItem("contracts", JSON.stringify(contracts));

    alert("Cập nhật hợp đồng thành công!");
    window.location.href = "contract.html";
  });
});
