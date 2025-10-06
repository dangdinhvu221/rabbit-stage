// =======================================
// 🦋 Butterfly Floating + Random Moments 💖
// =======================================
document.addEventListener("DOMContentLoaded", () => {
  const canvas = document.getElementById("butterflyCanvas");
  const ctx = canvas.getContext("2d");
  const overlay = document.getElementById("momentOverlay");
  const momentVideo = document.getElementById("momentVideo");

  let width = (canvas.width = window.innerWidth);
  let height = (canvas.height = window.innerHeight);

  // 🎬 Danh sách video
  const videos = [
    "videos/v1.mp4",
    "videos/v2.mp4",
    "videos/v3.mp4",
    "videos/v4.mp4",
    "videos/v5.mp4",
    "videos/v6.mp4",
  ];

  // 🦋 Hình chú bướm PNG dễ thương
  const butterflyImg = new Image();
  butterflyImg.src = "https://cdn.pixabay.com/animation/2023/03/05/21/13/21-13-51-872_512.gif";

  const butterflies = [];
  const numButterflies = 6;

  for (let i = 0; i < numButterflies; i++) {
    butterflies.push({
      x: Math.random() * width,
      y: Math.random() * height,
      size: 60 + Math.random() * 20,
      dx: (Math.random() - 0.5) * 0.3, // 🐢 chậm hơn rất nhiều
      dy: (Math.random() - 0.5) * 0.3,
      rotation: Math.random() * 360,
      flap: Math.random() * 360,
      glow: 0,
    });
  }

  function drawButterflies() {
    ctx.clearRect(0, 0, width, height);

    butterflies.forEach((b) => {
      b.x += b.dx;
      b.y += b.dy;
      b.rotation += 0.2; // quay chậm hơn
      b.flap += 5;
      b.glow = 0.5 + 0.5 * Math.sin(Date.now() / 600 + b.x); // ánh sáng dịu

      // bay vòng lại khi ra ngoài
      if (b.x < -80) b.x = width + 80;
      if (b.x > width + 80) b.x = -80;
      if (b.y < -80) b.y = height + 80;
      if (b.y > height + 80) b.y = -80;

      // 🌟 ánh sáng phát quanh bướm
      const glowSize = b.size * 1.3;
      const gradient = ctx.createRadialGradient(b.x, b.y, 0, b.x, b.y, glowSize);
      gradient.addColorStop(0, `rgba(255, 210, 255, ${b.glow * 0.6})`);
      gradient.addColorStop(1, "rgba(255, 200, 255, 0)");
      ctx.fillStyle = gradient;
      ctx.beginPath();
      ctx.arc(b.x, b.y, glowSize, 0, Math.PI * 2);
      ctx.fill();

      // 🦋 vẽ chú bướm
      ctx.save();
      ctx.translate(b.x, b.y);
      ctx.rotate((b.rotation * Math.PI) / 180);
      const scale = 1 + Math.sin((b.flap * Math.PI) / 180) * 0.2;
      ctx.globalAlpha = 0.9;
      ctx.drawImage(
        butterflyImg,
        -b.size / 2 * scale,
        -b.size / 2 * scale,
        b.size * scale,
        b.size * scale
      );
      ctx.restore();

      // 💖 ghi chữ cute bên dưới
      ctx.font = "16px 'Comic Sans MS'";
      ctx.fillStyle = "rgba(255, 240, 250, 0.95)";
      ctx.textAlign = "center";
      ctx.shadowColor = "rgba(127, 10, 127, 0.8)";
      ctx.shadowBlur = 8;
      ctx.fillText("💖 Dấu hiệu nhận biết cute 💖", b.x, b.y + b.size * 0.9);
      ctx.shadowBlur = 0;
    });

    requestAnimationFrame(drawButterflies);
  }

  butterflyImg.onload = drawButterflies;

  // Resize canvas khi thay đổi kích thước
  window.addEventListener("resize", () => {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
  });

  // Liên kết nhạc trong lyrics.js
  const bgAudio = window.audio;
  let wasPlaying = false;

  // 🦋 Click vào bướm => mở video
  canvas.addEventListener("click", (e) => {
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    butterflies.forEach((b) => {
      const dist = Math.hypot(b.x - x, b.y - y);
      if (dist < b.size / 2) {
        const randomVideo = videos[Math.floor(Math.random() * videos.length)];
        momentVideo.src = randomVideo;
        overlay.classList.add("show");
        overlay.classList.remove("hidden");
        canvas.style.opacity = "0.2";

        // 🔇 Tắt nhạc nền
        if (bgAudio && !bgAudio.paused) {
          wasPlaying = true;
          bgAudio.pause();
        }
      }
    });
  });

  // ✨ Click ra ngoài => đóng video + bật lại nhạc
  overlay.addEventListener("click", (e) => {
    if (e.target === overlay) {
      overlay.classList.remove("show");
      setTimeout(() => {
        overlay.classList.add("hidden");
        momentVideo.pause();
        momentVideo.src = "";
        canvas.style.opacity = "1";

        // 🔊 Phát lại nhạc nền
        if (bgAudio && wasPlaying) {
          bgAudio.play().catch(() => {});
          wasPlaying = false;
        }
      }, 400);
    }
  });
});
