const freeFeedLinks = [
  "https://s.shopee.vn/6AlS7sfDUR",
  "https://s.shopee.vn/2LYjYnQ5uY",
  "https://s.shopee.vn/6L4sK7h5ij",
  "https://s.shopee.vn/4fweLD8ktE",
  "https://s.shopee.vn/905dVDZecO",
  "https://s.shopee.vn/40gxY4RQFE",
  "https://s.shopee.vn/20vtAPKkHx",
  "https://s.shopee.vn/4LJnwiGgRF",
  "https://s.shopee.vn/6q18vK37QR",
  "https://s.shopee.vn/40gxY80EWI",
  "https://s.shopee.vn/6L4sKQzCCx",
  "https://s.shopee.vn/9fLKIZze3a",
  "https://s.shopee.vn/AKb15pwIcK",
  "https://s.shopee.vn/8AWWVvwp1W",
  "https://s.shopee.vn/7VGpjSti9v",
  "https://s.shopee.vn/3B7qZVACx6",
  "https://s.shopee.vn/30oQNCAqI5",
];

const freeFeedButton = document.querySelector("[data-free-feed]");

freeFeedButton?.addEventListener("click", () => {
  const randomValue = new Uint32Array(1);
  crypto.getRandomValues(randomValue);
  const randomIndex = randomValue[0] % freeFeedLinks.length;
  window.open(freeFeedLinks[randomIndex], "_blank", "noopener");
});
