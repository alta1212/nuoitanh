import type { products } from "../data/products";

type Product = (typeof products)[number];

interface ProductCardProps {
  index: number;
  product: Product;
}

export default function ProductCard({ index, product }: ProductCardProps) {
  const number = String(index + 1).padStart(2, "0");

  return (
    <article className="product-card">
      <div className="preview-image" aria-hidden="true"><span>SP</span><b>{number}</b></div>
      <div className="preview-body">
        <p className="preview-domain">shopee.vn · liên kết tiếp tế</p>
        <h3>{product.title}</h3>
        <p className="preview-description">{product.description}</p>
        <p className="preview-url">{product.url}</p>
        <a className="product-link" href={product.url} target="_blank" rel="noopener">
          Xem sản phẩm <span aria-hidden="true">↗</span>
        </a>
      </div>
    </article>
  );
}
