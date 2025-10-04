const letters = [
  "Chúc em một mùa Trung Thu thật vui vẻ và ý nghĩa!",
  "Trung Thu này, mong nụ cười luôn rạng rỡ trên môi em!",
  "Chúc em luôn hạnh phúc và tràn đầy yêu thương!",
  "Một mùa trăng tròn an lành, bình yên bên gia đình!",
  "Gửi đến em những lời chúc ngọt ngào và ấm áp nhất!"
];

// Tạo thư rơi tự động
function createLetter() {
  const letter = document.createElement("div");
  letter.className = "letter";
  const text = letters[Math.floor(Math.random() * letters.length)];
  letter.textContent = text;

  letter.style.left = Math.random() * (window.innerWidth - 200) + "px";
  letter.style.top = Math.random() * (window.innerHeight - 100) + "px";

  // Click vào thư show popup đẹp
  letter.addEventListener("click", () => {
    // Remove popup cũ nếu có
    const oldPopup = document.querySelector(".letter-popup");
    if (oldPopup) oldPopup.remove();

    // Popup nền mờ
    const popup = document.createElement("div");
    popup.className = "letter-popup";

    // Nội dung popup
    const content = document.createElement("div");
    content.className = "letter-popup-content";
    content.textContent = text;

    popup.appendChild(content);

    // Click ra ngoài đóng popup với animation
    popup.addEventListener("click", e => {
      if (e.target === popup) {
        content.style.animation = "popupIn 0.2s reverse forwards";
        popup.style.animation = "fadeOut 0.2s forwards";
        setTimeout(() => popup.remove(), 200);
      }
    });

    document.body.appendChild(popup);
  });

  document.body.appendChild(letter);

  // Ẩn thư sau một thời gian
  setTimeout(() => {
    letter.style.opacity = 0;
    setTimeout(() => letter.remove(), 500);
  }, 8000);
}

// Tạo thư rơi liên tục mỗi 4s
setInterval(createLetter, 4000);
