const placedRabbits = [];
const MIN_DISTANCE = 20;

// Ảnh thật
const rabbitImages = [
  'doi-ta/a1.jpg',
  'doi-ta/a2.jpg',
  'doi-ta/a3.jpg',
  'doi-ta/a4.jpg',
  'doi-ta/a5.jpg',
  'doi-ta/a6.jpg'
];

// Ảnh placeholder (tho1 → tho6)
const placeholderImages = [
  'images/tho1.gif',
  'images/tho2.gif',
  'images/tho3.gif',
  'images/tho4.gif',
  'images/tho5.gif',
  'images/tho6.gif'
];

// Lời mật ngọt 💖
// 🌷 Lời thương gửi em 💖
const sweetMessages = [
  "Gặp được em là điều may mắn nhất trong cuộc đời anh 🍀",
  "Chỉ cần nghĩ đến em, mọi mệt mỏi trong anh đều tan biến 🌤️",
  "Anh không hứa nhiều, chỉ hứa luôn bên em những lúc em cần 🤝",
  "Nụ cười của em là lý do để anh cố gắng mỗi ngày 🌼",
  "Anh muốn cùng em đi qua những ngày bình thường, mà vẫn thấy hạnh phúc 💞",
  "Không cần điều gì quá lớn lao, chỉ cần có em – là đủ rồi 🌙"
];

function randomPosition(stage, w=80, h=80){
  const rect = stage.getBoundingClientRect();
  let pos, safe=false, attempts=0;
  while(!safe && attempts<100){
    const x = Math.random()*(rect.width-w-20);
    const y = Math.random()*(rect.height-h-20);
    pos = {left:x, top:y}; safe=true;
    for(const r of placedRabbits){
      if(x < r.left+w+MIN_DISTANCE && x+w+MIN_DISTANCE > r.left &&
         y < r.top+h+MIN_DISTANCE && y+h+MIN_DISTANCE > r.top){ safe=false; break; }
    }
    attempts++;
  }
  placedRabbits.push(pos);
  return pos;
}

function createRabbit(index){
  const stage = document.querySelector(".stage");
  const rabbit = document.createElement("div");
  rabbit.className = "rabbit";
  rabbit.style.backgroundImage = `url('${placeholderImages[index]}')`;

  const pos = randomPosition(stage);
  rabbit.style.position = "absolute";
  rabbit.style.left = pos.left + "px";
  rabbit.style.top = pos.top + "px";
  rabbit.style.width = '80px';
  rabbit.style.height = '80px';
  rabbit.style.backgroundSize = 'cover';
  rabbit.style.cursor = 'pointer';

  rabbit.addEventListener("click", ()=>{
    // Hiển thị ảnh thật + lời mật ngọt
    const message = sweetMessages[Math.floor(Math.random()*sweetMessages.length)];
    showImagePopup(rabbitImages[index], message);
  });

  // Drag thỏ
  rabbit.onmousedown = function(e){
    e.preventDefault();
    let shiftX = e.clientX - rabbit.getBoundingClientRect().left;
    let shiftY = e.clientY - rabbit.getBoundingClientRect().top;

    function moveAt(pageX, pageY){
      rabbit.style.left = pageX - shiftX + "px";
      rabbit.style.top = pageY - shiftY + "px";
    }

    function onMouseMove(e){ moveAt(e.pageX, e.pageY); }

    document.addEventListener('mousemove', onMouseMove);
    document.onmouseup = function(){
      document.removeEventListener('mousemove', onMouseMove);
      document.onmouseup = null;
    };
  };
  rabbit.ondragstart = () => false;

  stage.appendChild(rabbit);
}

function showImagePopup(url, message){
  const stage = document.querySelector(".stage");
  const old = stage.querySelector(".image-popup");
  if(old) old.remove();
  const popup = document.createElement("div");
  popup.className = "image-popup";
  popup.style.position = "absolute";
  popup.style.left = 0;
  popup.style.top = 0;
  popup.style.width = "100%";
  popup.style.height = "100%";
  popup.style.display = "flex";
  popup.style.flexDirection = "column";
  popup.style.alignItems = "center";
  popup.style.justifyContent = "center";
  popup.style.background = "rgba(0,0,0,0.45)";
  popup.style.borderRadius = "12px";

  popup.innerHTML = `
    <img src="${url}" alt="ảnh" style="max-width:350px; max-height:350px; border-radius:12px;">
    <div style="
      color: #fff;
      font-size: 20px;
      margin-top: 15px;
      text-shadow: 0 2px 4px rgba(0,0,0,0.5);
      text-align: center;
      font-family: 'Segoe Script', cursive;
    ">${message}</div>
  `;

  popup.addEventListener("click", e=>{ if(e.target===popup) popup.remove(); });
  stage.appendChild(popup);
}

// Tạo 6 thỏ placeholder ban đầu
placeholderImages.forEach((_, index) => createRabbit(index));
