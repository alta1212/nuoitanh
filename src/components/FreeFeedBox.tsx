import { useState } from "react";
import { openRandomProduct } from "../data/products";

export default function FreeFeedBox() {
  const [status, setStatus] = useState("Trạng thái: sẵn sàng tiếp nhận lòng tốt.");

  function handleRandomProduct() {
    openRandomProduct();
    setStatus("Đã mở nhiệm vụ ngẫu nhiên. Tanh xin ghi nhận công lao.");
  }

  return (
    <div className="free-box">
      <p className="section-label">Phương án miễn phí</p>
      <h2>Nhấp một cái.<br />Bụng ghi nhận.</h2>
      <p>
        Chọn một sản phẩm trong danh sách tiếp tế. Bạn chỉ cần mở trang xem qua,
        không cần mua và không cần làm lễ bàn giao.
      </p>
      <div className="action-row">
        <button className="action" type="button" onClick={handleRandomProduct}>
          Nuôi Tanh miễn phí
        </button>
        <a className="action action-secondary" href="/free-feed">
          Cũng là nuôi Tanh miễn phí nhưng có danh sách sản phẩm
        </a>
      </div>
      <p className="status" aria-live="polite">{status}</p>
    </div>
  );
}
