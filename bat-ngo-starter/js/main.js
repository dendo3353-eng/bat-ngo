const scenes = [...document.querySelectorAll(".scene")];
const toast = document.getElementById("toast");
let found = new Set();

function showScene(id) {
  scenes.forEach(scene => {
    const active = scene.id === id;
    scene.classList.toggle("active", active);
    scene.setAttribute("aria-hidden", String(!active));
  });
  window.scrollTo({top: 0, behavior: "smooth"});
}
function notify(message) {
  toast.textContent = message;
  toast.classList.add("show");
  clearTimeout(notify.timer);
  notify.timer = setTimeout(() => toast.classList.remove("show"), 2100);
}

document.getElementById("startBtn").addEventListener("click", () => {
  showScene("garden");
  notify("Cánh cửa đã mở. Mình cùng khám phá nhé! ♡");
});

document.querySelectorAll(".flower").forEach(button => {
  button.addEventListener("click", () => {
    const index = Number(button.dataset.flower);
    if (found.has(index)) return;
    found.add(index);
    button.classList.add("found");
    button.textContent = "♡";
    document.getElementById("progress").textContent = `Em đã tìm được ${found.size}/3 bông hoa`;
    if (found.size === 3) {
      document.getElementById("letterBtn").disabled = false;
      notify("Em đã tìm đủ hoa rồi. Có một lá thư đang chờ em! ♡");
    } else {
      notify("Tìm thấy một bông hoa rồi! Còn tiếp nhé. ✿");
    }
  });
});

document.getElementById("letterBtn").addEventListener("click", () => showScene("letter"));
document.getElementById("backBtn").addEventListener("click", () => showScene("welcome"));
document.getElementById("againBtn").addEventListener("click", () => showScene("garden"));
