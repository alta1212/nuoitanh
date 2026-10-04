import { useEffect } from "react";
import { products } from "./products";

export default function FreeFeedPage() {
  useEffect(() => {
    document.title = "Tự chọn sản phẩm | Nuôi Tanh miễn phí";
  }, []);

  return (
    <div className="page free-feed-page">
      <header className="masthead">
        <a className="brand" href="/">Trung tâm cứu đói cho Tanh</a>
        <a className="back-link" href="/">← Về trang chính</a>
      </header>
      <main className="feed-main">
        <section className="feed-intro" aria-labelledby="feed-title">
          <p className="kicker">Phương án miễn phí · tự chọn</p>
          <h1 id="feed-title">Chọn món.<br />Nuôi Tanh.</h1>
          <p className="lead">
            Mở một sản phẩm bạn thấy thú vị. Chỉ cần xem qua, không cần mua.
          </p>
        </section>
        <section className="product-grid" aria-label="Danh sách sản phẩm">
          {products.map((product) => (
            <a
              className="product-card"
              href={product.url}
              target="_blank"
              rel="sponsored noopener noreferrer"
              key={product.url}
            >
              {product.image ? (
                <img src={product.image} alt="" loading="lazy" />
              ) : (
                <span className="product-image-fallback" aria-hidden="true">0Đ</span>
              )}
              <span className="product-copy">
                <span className="product-label">Sản phẩm tiếp tế ↗</span>
                <h2>{product.title}</h2>
                <span className="product-description">{product.description}</span>
              </span>
            </a>
          ))}
        </section>
      </main>
    </div>
  );
}
