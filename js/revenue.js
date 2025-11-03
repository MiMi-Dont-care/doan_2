document.addEventListener("DOMContentLoaded", function () {
            const form = document.getElementById("revenueForm");
            const tableBody = document.getElementById("revenueTableBody");
            const pagination = document.getElementById("pagination");

            let revenues = JSON.parse(localStorage.getItem("revenues")) || [];
            let currentPage = 1;
            const itemsPerPage = 10;

            // Sắp xếp theo ngày mới nhất
            function sortRevenues() {
                revenues.sort((a, b) => new Date(b.reportDate) - new Date(a.reportDate));
            }

            // Render bảng
            function renderTable(data, page = 1) {
                sortRevenues(); // luôn sort trước khi render
                tableBody.innerHTML = "";
                const start = (page - 1) * itemsPerPage;
                const end = page * itemsPerPage;
                const pageData = data.slice(start, end);

                if (pageData.length === 0) {
                    tableBody.innerHTML = `<tr><td colspan="3" class="text-center">Không có dữ liệu</td></tr>`;
                    return;
                }

                pageData.forEach((r, index) => {
                    tableBody.innerHTML += `
          <tr>
            <td>${start + index + 1}</td>
            <td>${r.reportDate}</td>
            <td class="amount">${r.revenue.toLocaleString()}</td>
          </tr>
        `;
                });

                renderPagination(data.length, page);
            }

            // Phân trang
            function renderPagination(totalItems, page) {
                pagination.innerHTML = "";
                const totalPages = Math.ceil(totalItems / itemsPerPage);
                if (totalPages <= 1) return;

                for (let i = 1; i <= totalPages; i++) {
                    const btn = document.createElement("button");
                    btn.className = "btn " + (i === page ? "active" : "");
                    btn.textContent = i;
                    btn.addEventListener("click", () => {
                        currentPage = i;
                        renderTable(revenues, currentPage);
                    });
                    pagination.appendChild(btn);
                }
            }

            // Thêm mới
            form.addEventListener("submit", function (e) {
                e.preventDefault();
                const reportDate = document.getElementById("date").value;
                const revenue = parseInt(document.getElementById("amount").value);

                revenues.push({
                    id: Date.now(),
                    reportDate,
                    revenue
                });

                localStorage.setItem("revenues", JSON.stringify(revenues));
                renderTable(revenues, currentPage);
                form.reset();
            });

            // Load dữ liệu ban đầu
            renderTable(revenues, currentPage);
        });