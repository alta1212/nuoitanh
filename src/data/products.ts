const productCodes = [
  "6AlS7sfDUR", "2LYjYnQ5uY", "6L4sK7h5ij", "4fweLD8ktE", "905dVDZecO",
  "40gxY4RQFE", "20vtAPKkHx", "4LJnwiGgRF", "6q18vK37QR", "40gxY80EWI",
  "6L4sKQzCCx", "9fLKIZze3a", "AKb15pwIcK", "8AWWVvwp1W", "7VGpjSti9v",
  "3B7qZVACx6", "30oQNCAqI5", "2gBb4AHrWY", "7KxQcn8Ead", "7faH1Q2A5g",
];

export const products = productCodes.map((code, index) => ({
  code,
  title: `Sản phẩm tiếp tế số ${String(index + 1).padStart(2, "0")}`,
  description: "Mở trang Shopee để xem ảnh, giá và thông tin mới nhất.",
  url: `https://s.shopee.vn/${code}`,
}));

export function openRandomProduct() {
  const randomValue = new Uint32Array(1);
  crypto.getRandomValues(randomValue);
  window.open(products[randomValue[0] % products.length].url, "_blank", "noopener");
}
