// Tạo nút QR trên stage
const qrBtn = document.createElement("button");
qrBtn.className = "qr-btn";
qrBtn.textContent = "Tạo QR Code";
document.body.appendChild(qrBtn);

qrBtn.addEventListener("click", ()=>{
  // Nếu popup đã tồn tại thì remove
  const oldPopup = document.querySelector(".qr-popup");
  if(oldPopup) oldPopup.remove();

  const popup = document.createElement("div");
  popup.className = "qr-popup";

  const content = document.createElement("div");
  content.className = "qr-popup-content";

  // QR code
  const qrDiv = document.createElement("div");
  new QRCode(qrDiv, {
    text: window.location.href,
    width: 200,
    height: 200,
    colorDark: "#000000",
    colorLight: "#ffffff",
    correctLevel: QRCode.CorrectLevel.H
  });

  // Link web
  const linkP = document.createElement("p");
  linkP.textContent = window.location.href;

  // Nút copy
  const copyBtn = document.createElement("button");
  copyBtn.className = "copy-btn";
  copyBtn.textContent = "Sao chép link";
  copyBtn.addEventListener("click", ()=>{
    navigator.clipboard.writeText(window.location.href)
      .then(()=> alert("Đã sao chép link!"));
  });

  content.appendChild(qrDiv);
  content.appendChild(linkP);
  content.appendChild(copyBtn);
  popup.appendChild(content);

  // Click ra ngoài đóng popup
  popup.addEventListener("click", e=>{
    if(e.target === popup) popup.remove();
  });

  document.body.appendChild(popup);
});
