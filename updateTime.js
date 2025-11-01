document.getElementById("update-btn").addEventListener("click", () => {
  const now = new Date().toLocaleString("th-TH", {
    hour: "2-digit",
    minute: "2-digit",
    day: "2-digit",
    month: "2-digit",
    year: "numeric"
  });

  // แสดงบนหน้าเว็บ
  document.getElementById("update-time").textContent = `อัปเดตสถานะเมื่อเวลา ${now}`;

  // ส่งข้อมูลไปยัง Google Apps Script
  fetch("https://script.google.com/macros/s/xxxxxxxxxxxx/exec", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ time: now })
  })
    .then(res => res.text())
    .then(txt => console.log(txt))
    .catch(err => console.error(err));
});

