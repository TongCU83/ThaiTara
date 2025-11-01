const sheetId = "14cBczT-A_TfudSiAfMVbGeema-mPkLrTW5wAcLyQVck";
const url = `https://docs.google.com/spreadsheets/d/${sheetId}/gviz/tq?tqx=out:json`;

fetch(url)
  .then(res => res.text())
  .then(text => {
    const json = JSON.parse(text.substr(47).slice(0, -2));
    const rows = json.table.rows;

    let html = "";
    rows.forEach(r => {
      const name = r.c[0]?.v || "";
      const img = r.c[1]?.v || "";
      const status = r.c[2]?.v || "";
      const role = r.c[3]?.v || "";

      if (status.includes("✅")) {
        html += `
          <div class="card">
            <img src="${img}" alt="${name}">
            <h3>${name}</h3>
            <p>${role}</p>
          </div>`;
      }
    });

    // แสดงรายชื่อพนักงาน
    document.getElementById("staff-list").innerHTML =
      html || "<p>วันนี้ยังไม่มีพนักงานเข้ามาทำงาน</p>";

    // const lastUpdateCell = json.table.rows[0]?.c[4]?.v || "";
// if (lastUpdateCell) {
  // document.getElementById("last-update").textContent = lastUpdateCell;
// } else {
  // document.getElementById("last-update").textContent = "ยังไม่มีการอัปเดตสถานะ";
// }
  })
  .catch(err => {
    document.getElementById("staff-list").innerHTML = "<p>โหลดข้อมูลไม่สำเร็จ</p>";
    document.getElementById("last-update").textContent = "ไม่สามารถโหลดเวลาอัปเดตได้";
    console.error(err);
  });
