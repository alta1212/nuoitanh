const freeFeedLinks = [
  "6AlS7sfDUR", "2LYjYnQ5uY", "6L4sK7h5ij", "4fweLD8ktE", "905dVDZecO",
  "40gxY4RQFE", "20vtAPKkHx", "4LJnwiGgRF", "6q18vK37QR", "40gxY80EWI",
  "6L4sKQzCCx", "9fLKIZze3a", "AKb15pwIcK", "8AWWVvwp1W", "7VGpjSti9v",
  "3B7qZVACx6", "30oQNCAqI5", "2gBb4AHrWY", "7KxQcn8Ead", "7faH1Q2A5g",
].map((code, index) => ({
  code,
  title: `Sản phẩm tiếp tế số ${String(index + 1).padStart(2, "0")}`,
  description: "Mở trang Shopee để xem ảnh, giá và thông tin mới nhất.",
  url: `https://s.shopee.vn/${code}`,
}));

function openRandomProduct() {
  const randomValue = new Uint32Array(1);
  crypto.getRandomValues(randomValue);
  const randomIndex = randomValue[0] % freeFeedLinks.length;
  window.open(freeFeedLinks[randomIndex].url, "_blank", "noopener");
}

document.querySelector("[data-free-feed]")?.addEventListener("click", openRandomProduct);

const productGrid = document.querySelector("[data-product-grid]");
if (productGrid) {
  productGrid.innerHTML = freeFeedLinks.map((product, index) => `
    <article class="product-card">
      <div class="preview-image" aria-hidden="true"><span>SP</span><b>${String(index + 1).padStart(2, "0")}</b></div>
      <div class="preview-body">
        <p class="preview-domain">shopee.vn · liên kết tiếp tế</p>
        <h3>${product.title}</h3>
        <p class="preview-description">${product.description}</p>
        <p class="preview-url">${product.url}</p>
        <a class="product-link" href="${product.url}" target="_blank" rel="noopener">Xem sản phẩm <span aria-hidden="true">↗</span></a>
      </div>
    </article>`).join("");
}
