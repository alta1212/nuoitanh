const options = [...document.querySelectorAll('[data-amount]')];
const qrImage = document.querySelector('[data-qr-image]');
const qrLink = document.querySelector('[data-qr-link]');
const customAmount = document.querySelector('[data-custom-amount]');
const customError = document.querySelector('[data-custom-error]');
const qrBase = 'https://img.vietqr.io/image/TCB-1212141000-compact.png';
const qrNote = 'cam on da nuoi Tanh';

function selectAmount(value, customLabel) {
  const amount = Math.floor(Number(value));
  if (!Number.isFinite(amount) || amount < 2000) return;
  const selected = options.find((option) => Number(option.dataset.amount) === amount);
  options.forEach((option) => option.setAttribute('aria-pressed', String(option === selected)));
  const formatted = amount.toLocaleString('vi-VN') + 'đ';
  const qrUrl = `${qrBase}?amount=${amount}&addInfo=${encodeURIComponent(qrNote)}`;
  qrImage.src = qrUrl;
  qrLink.href = qrUrl;
  const label = document.querySelector('[data-selected-label]');
  if (label) label.textContent = selected?.dataset.label || customLabel || 'Số tiền tùy chọn';
}

options.forEach((option) => option.addEventListener('click', () => {
  customAmount.value = '';
  customError.textContent = 'Tối thiểu 2.000đ.';
  selectAmount(option.dataset.amount);
}));
document.querySelectorAll('[data-pick-amount]').forEach((link) => {
  link.addEventListener('click', () => selectAmount(link.dataset.pickAmount));
});

function applyCustomAmount(showError = false) {
  const amount = Math.floor(Number(customAmount.value));
  if (!Number.isFinite(amount) || amount < 2000) {
    customError.textContent = 'Vui lòng nhập ít nhất 2.000đ.';
    customAmount.setCustomValidity('Số tiền tối thiểu là 2.000đ.');
    if (showError) customAmount.reportValidity();
    return;
  }
  customAmount.setCustomValidity('');
  customError.textContent = `Đã tạo QR ${amount.toLocaleString('vi-VN')}đ.`;
  selectAmount(amount, 'Số tiền tùy chọn');
}

customAmount.addEventListener('input', () => {
  customAmount.setCustomValidity('');
  if (Number(customAmount.value) >= 2000) applyCustomAmount();
});
customAmount.addEventListener('keydown', (event) => {
  if (event.key === 'Enter') applyCustomAmount(true);
});
document.querySelector('[data-custom-submit]').addEventListener('click', () => applyCustomAmount(true));

const cheers = [
  'Tanh nhận được một cái vỗ vai tinh thần. Cảm ơn bạn nhé! ♡',
  'Một chút ấm lòng đã được thêm vào ngày hôm nay. Bạn cũng cố lên nha!',
  'Bụng có thể chưa no, nhưng tinh thần đã được tiếp tế. Cảm ơn bạn!',
  'Gửi lại bạn một lời chúc: cơm ngon, việc thuận, ngủ thật yên. ♡',
];
let cheerIndex = 0;
document.querySelector('[data-cheer]').addEventListener('click', () => {
  document.querySelector('[data-cheer-message]').textContent = cheers[cheerIndex % cheers.length];
  cheerIndex += 1;
});
