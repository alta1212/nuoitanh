const options = [...document.querySelectorAll('[data-amount]')];

function selectAmount(amount) {
  const selected = options.find((option) => option.dataset.amount === amount);
  if (!selected) return;
  options.forEach((option) => option.setAttribute('aria-pressed', String(option === selected)));
  const formatted = Number(amount).toLocaleString('vi-VN') + 'đ';
  document.querySelector('[data-amount-display]').textContent = formatted;
  document.querySelector('[data-amount-help]').textContent = `Nhập ${formatted} trong ứng dụng, hoặc số tiền bạn muốn.`;
  const label = document.querySelector('[data-selected-label]');
  if (label) label.textContent = selected.dataset.label;
}

options.forEach((option) => option.addEventListener('click', () => selectAmount(option.dataset.amount)));
document.querySelectorAll('[data-pick-amount]').forEach((link) => {
  link.addEventListener('click', () => selectAmount(link.dataset.pickAmount));
});

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
