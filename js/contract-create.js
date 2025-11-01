document.addEventListener("DOMContentLoaded", function () {
      const form = document.getElementById("contractForm");

      form.addEventListener("submit", function (e) {
        e.preventDefault();

        const contractId = document.getElementById("contractId").value.trim();
        const storeName = document.getElementById("storeName").value.trim();
        const owner = document.getElementById("owner").value.trim();
        const startDate = document.getElementById("startDate").value;
        const endDate = document.getElementById("endDate").value;
        const initialFee = document.getElementById("initialFee").value;
        const royaltyRate = document.getElementById("royaltyRate").value;

        // Validate
        if (!contractId || !storeName || !owner) {
          alert("Vui lòng nhập đầy đủ thông tin bắt buộc.");
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

        const contract = {
          contractId,
          storeName,
          owner,
          startDate,
          endDate,
          initialFee: parseInt(initialFee).toLocaleString("vi-VN") + " VNĐ",
          royaltyRate
        };

        let contracts = JSON.parse(localStorage.getItem("contracts")) || [];
        contracts.push(contract);
        localStorage.setItem("contracts", JSON.stringify(contracts));

        alert("Tạo hợp đồng thành công!");
        window.location.href = "contract.html";
      });
    });