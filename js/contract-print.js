document.addEventListener("DOMContentLoaded", function () {
  const params = new URLSearchParams(window.location.search);
  const id = params.get("id");
  const container = document.getElementById("contractContent");

  let contracts = JSON.parse(localStorage.getItem("contracts")) || [];
  let contract = contracts.find((c) => c.contractId === id);

  if (!contract) {
    container.innerHTML = "<p class='text-danger'>Không tìm thấy hợp đồng.</p>";
    return;
  }

  const today = new Date();
  const isExpired = new Date(contract.endDate) < today;
  const statusText = isExpired ? "Hết hạn" : "Đang hiệu lực";

  container.innerHTML = `
        <div class="section">
          <p><strong>Số hợp đồng:</strong> ${contract.contractId}</p>
          <p><strong>Bên A:</strong> Công ty Mì Cay Đức Hiệu</p>
          <p><strong>Bên B:</strong> ${contract.owner} - ${contract.storeName}</p>
        </div>

        <div class="section">
          <p><strong>Điều 1. Đối tượng hợp đồng</strong></p>
          <p>Bên A đồng ý nhượng quyền thương mại thương hiệu <strong>Mì Cay Đức Hiệu</strong> cho Bên B theo các điều khoản trong hợp đồng này.</p>
        </div>

        <div class="section">
          <p><strong>Điều 2. Thời hạn hợp đồng</strong></p>
          <p>Hợp đồng có hiệu lực từ <strong>${contract.startDate}</strong> đến <strong>${contract.endDate}</strong>.</p>
          <p>Trạng thái hiện tại: <strong>${statusText}</strong></p>
        </div>

        <div class="section">
          <p><strong>Điều 3. Phí nhượng quyền</strong></p>
          <p>Bên B đồng ý thanh toán cho Bên A khoản phí nhượng quyền là <strong>${contract.initialFee}</strong>.</p>
          <p>Phí quản lý hằng tháng: <strong>${contract.royaltyRate}% doanh thu</strong>.</p>
        </div>

        <div class="section">
          <p><strong>Điều 4. Quyền và nghĩa vụ các bên</strong></p>
          <p>- Bên A có trách nhiệm hỗ trợ đào tạo, cung cấp công thức và nguyên liệu chuẩn.</p>
          <p>- Bên B có trách nhiệm đảm bảo doanh thu báo cáo trung thực, tuân thủ quy định thương hiệu.</p>
        </div>

        <div class="section">
          <p><strong>Điều 5. Điều khoản chung</strong></p>
          <p>Hai bên cam kết thực hiện đúng các điều khoản trên. Hợp đồng này được lập thành 02 bản, mỗi bên giữ 01 bản có giá trị pháp lý như nhau.</p>
        </div>
      `;
});
