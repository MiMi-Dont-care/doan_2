document.addEventListener("DOMContentLoaded", function () {
      const tableBody = document.getElementById("promotionTableBody");
      const pagination = document.getElementById("pagination");
      const searchInput = document.getElementById("searchInput");
      const btnSearch = document.getElementById("btnSearch");

      // Dummy data
      let promotions = [
        { promoId: "KM01", name: "Mua 1 tặng 1", startDate: "2025-10-01", endDate: "2025-10-07", type: "Giảm giá", value: "100%", scope: "Toàn bộ menu" },
        { promoId: "KM02", name: "Giảm 20% hóa đơn", startDate: "2025-11-01", endDate: "2025-11-15", type: "Giảm %", value: "20%", scope: "Khách hàng mới" },
        { promoId: "KM03", name: "Tặng nước ngọt", startDate: "2025-09-01", endDate: "2025-09-10", type: "Quà tặng", value: "01 lon", scope: "Hóa đơn >200k" }
      ];

      let filteredPromotions = promotions;
      let currentPage = 1;
      const itemsPerPage = 10;

      function getStatus(promo) {
        const today = new Date().toISOString().split("T")[0];
        if (today < promo.startDate) return "Sắp diễn ra";
        if (today > promo.endDate) return "Hết hạn";
        return "Đang diễn ra";
      }

      function renderTable(data, page = 1) {
        tableBody.innerHTML = "";
        const start = (page - 1) * itemsPerPage;
        const end = page * itemsPerPage;
        const pageData = data.slice(start, end);

        if (pageData.length === 0) {
          tableBody.innerHTML = `<tr><td colspan="7" class="text-center">Không có dữ liệu</td></tr>`;
          return;
        }

        pageData.forEach((promo, index) => {
          const row = `
            <tr>
              <td>${start + index + 1}</td>
              <td>${promo.promoId}</td>
              <td>${promo.name}</td>
              <td>${promo.startDate} → ${promo.endDate}</td>
              <td>${promo.type} (${promo.value})</td>
              <td>${promo.scope}</td>
              <td><span class="status ${getStatus(promo) === "Đang diễn ra" ? "success" : (getStatus(promo) === "Sắp diễn ra" ? "warning" : "danger")}">${getStatus(promo)}</span></td>
            </tr>`;
          tableBody.innerHTML += row;
        });
        renderPagination(data.length, page);
      }

      function renderPagination(totalItems, page) {
        pagination.innerHTML = "";
        const totalPages = Math.ceil(totalItems / itemsPerPage);
        for (let i = 1; i <= totalPages; i++) {
          const btn = document.createElement("button");
          btn.className = "btn " + (i === page ? "btn-primary" : "");
          btn.textContent = i;
          btn.addEventListener("click", () => { currentPage = i; renderTable(filteredPromotions, currentPage); });
          pagination.appendChild(btn);
        }
      }

      function searchPromotions(keyword) {
        keyword = keyword.toLowerCase();
        filteredPromotions = promotions.filter(p =>
          p.promoId.toLowerCase().includes(keyword) ||
          p.name.toLowerCase().includes(keyword) ||
          p.type.toLowerCase().includes(keyword) ||
          p.scope.toLowerCase().includes(keyword)
        );
        currentPage = 1;
        renderTable(filteredPromotions, currentPage);
      }

      btnSearch.addEventListener("click", () => searchPromotions(searchInput.value.trim()));
      searchInput.addEventListener("keyup", e => { if (e.key === "Enter") searchPromotions(searchInput.value.trim()); });

      renderTable(filteredPromotions, currentPage);
    });