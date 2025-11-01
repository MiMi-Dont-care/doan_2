document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("promoForm");

  form.addEventListener("submit", function (e) {
    e.preventDefault();

    const promo = {
      promoId: "KM" + Date.now(),
      name: document.getElementById("name").value.trim(),
      type: document.getElementById("type").value,
      value: document.getElementById("value").value.trim(),
      startDate: document.getElementById("startDate").value,
      endDate: document.getElementById("endDate").value,
      scope: document.getElementById("scope").value.trim(),
    };

    let promotions = JSON.parse(localStorage.getItem("promotions")) || [];
    promotions.push(promo);
    localStorage.setItem("promotions", JSON.stringify(promotions));

    alert("Tạo khuyến mãi thành công!");
    window.location.href = "promotion.html";
  });
});
