const audio = new Audio("audios/nang-tho.mp3");
const STOP_TIME = 103;

audio.play().catch(() => {
  document.body.addEventListener('click', () => {
    if(audio.paused) audio.play();
  }, { once: true });
});

const lyrics = [
  { time: 16, text: "Em, ngày em đánh rơi nụ cười vào anh" },
  { time: 21, text: "Có nghĩ sau này em sẽ chờ" },
  { time: 26, text: "Và vô tư cho đi hết những ngây thơ" },
  { time: 31, text: "Anh, một người hát mãi những điều mong manh" },
  { time: 36, text: "Lang thang tìm niềm vui đã lỡ" },
  { time: 41, text: "Chẳng buồn dặn lòng quên hết những chơ vơ" },
  { time: 46, text: "Ta yêu nhau bằng nỗi nhớ chưa khô trên những bức thư" },
  { time: 51, text: "Ta đâu bao giờ có lỗi khi không nghe tim chối từ" },
  { time: 56, text: "Chỉ tiếc rằng" },
  { time: 59, text: "Em không là nàng thơ" },
  { time: 63, text: "Anh cũng không còn là nhạc sĩ mộng mơ" },
  { time: 68, text: "Tình này nhẹ như gió" },
  { time: 72, text: "Lại trĩu lên tim ta những vết hằn" },
  { time: 77, text: "Tiếng yêu này mỏng manh" },
  { time: 81, text: "Giờ tan vỡ, thôi cũng đành" },
  { time: 85, text: "Xếp riêng những ngày tháng hồn nhiên" },
  { time: 89, text: "Trả lại..." }
];

let currentLyricIndex = 0;

function updateLyrics() {
  if(currentLyricIndex >= lyrics.length) return;

  const currentTime = audio.currentTime;
  const nextLyric = lyrics[currentLyricIndex];

  if(currentTime >= nextLyric.time) {
    const span = document.createElement("div");
    span.className = "floating-word";
    span.textContent = nextLyric.text;

    span.style.left = Math.random() * (window.innerWidth - 250) + "px";
    span.style.top = Math.random() * (window.innerHeight - 50) + "px";

    document.body.appendChild(span);

    span.addEventListener("animationend", () => {
      span.remove();
    });

    currentLyricIndex++;
  }

  if(audio.currentTime < STOP_TIME) {
    requestAnimationFrame(updateLyrics);
  }
}

audio.addEventListener('play', () => updateLyrics());

audio.addEventListener('timeupdate', () => {
  if(audio.currentTime >= STOP_TIME){
    audio.pause();
    audio.currentTime = STOP_TIME;
  }
});
