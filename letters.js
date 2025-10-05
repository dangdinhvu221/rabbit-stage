const letters = [
  "Chúc Trang có một mùa Trung Thu thật ngọt ngào, tràn đầy yêu thương và hạnh phúc nhé!",
  "Trung Thu này, mong nụ cười của Trang luôn tỏa sáng như ánh trăng rằm!",
  "Gửi đến Trang muôn vàn yêu thương, mong mọi điều tốt đẹp nhất luôn bên cạnh em!",
  "Chúc Trang một mùa trăng tròn bình yên, ấm áp và đầy ắp những khoảnh khắc đáng nhớ!",
  "Dù ở đâu, mong Trang luôn cảm nhận được tình yêu thương chân thành gửi đến em trong đêm trăng này!"
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
