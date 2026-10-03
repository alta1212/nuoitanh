import { useEffect } from "react";
import Masthead from "../components/Masthead";
import ProductCard from "../components/ProductCard";
import { openRandomProduct, products } from "../data/products";

export default function FreeFeedPage() {
  useEffect(() => {
    const previousTitle = document.title;
    document.title = "Chọn sản phẩm | Nuôi Tanh";
    return () => { document.title = previousTitle; };
  }, []);

  return (
    <main className="page free-feed-page">
      <Masthead catalog />
      <section className="feed-intro" aria-labelledby="page-title">
        <p className="feed-eyebrow">Phương án miễn phí</p>
        <h1 id="page-title">Bạn chọn món.<br />Tanh nhận lòng tốt.</h1>
        <p>
          Đây là các liên kết tiếp tế. Hãy mở một sản phẩm bạn thấy hợp mắt để
          xem trang gốc. Không cần mua gì cả, chỉ cần ghé qua là được.
        </p>
        <button className="random-button" type="button" onClick={openRandomProduct}>
          Mở ngẫu nhiên <span aria-hidden="true">↗</span>
        </button>
      </section>
      <section className="catalog" aria-labelledby="catalog-title">
        <div className="catalog-heading">
          <h2 id="catalog-title">Danh sách sản phẩm</h2>
          <span>{products.length} lựa chọn</span>
        </div>
        <div className="product-grid">
          {products.map((product, index) => (
            <ProductCard key={product.code} product={product} index={index} />
          ))}
        </div>
      </section>
      <footer className="feed-footer">
        <a href="/">← Quay lại trang chính</a>
        <span>Liên kết có thể thay đổi theo thời gian.</span>
      </footer>
    </main>
  );
}
