import { useEffect, useState } from "react";
import {
  formatAmountInput,
  normalizeAmountInput,
  parseAmount,
} from "../utils/amount";
import { products } from "../data/products";

const amounts = [15_000, 35_000, 50_000];
const qrBase = "https://img.vietqr.io/image/TCB-1212141000-compact.png";

export default function HomePage() {
  const [status, setStatus] = useState("Trạng thái: sẵn sàng tiếp nhận lòng tốt.");
  const [amount, setAmount] = useState(50_000);
  const [customAmount, setCustomAmount] = useState("");
  const [message, setMessage] = useState("QR hiện tại: 50.000đ");
  const [error, setError] = useState(false);

  useEffect(() => {
    if (!customAmount) return;

    const timer = window.setTimeout(() => {
      const value = parseAmount(customAmount);
      if (value === null) {
        setError(true);
        setMessage(
          Number(customAmount) < 2_000
            ? "Bank không cho chuyển dưới 2k =)) nhiều hơn đi"
            : "Số tiền này lớn quá, nhập ít hơn nhé.",
        );
        return;
      }

      setAmount(value);
      setMessage(`QR hiện tại: ${value.toLocaleString("vi-VN")}đ`);
    }, 300);

    return () => window.clearTimeout(timer);
  }, [customAmount]);

  function feedForFree() {
    const randomValue = new Uint32Array(1);
    crypto.getRandomValues(randomValue);
    window.open(
      products[randomValue[0] % products.length].url,
      "_blank",
      "noopener",
    );
    setStatus("Đã mở nhiệm vụ. Tanh xin ghi nhận công lao.");
  }

  function selectAmount(value: number) {
    setAmount(value);
    setCustomAmount("");
    setError(false);
    setMessage(`QR hiện tại: ${value.toLocaleString("vi-VN")}đ`);
  }

  function changeCustomAmount(value: string) {
    const normalized = normalizeAmountInput(value);
    setCustomAmount(normalized);
    setError(false);
    if (!normalized) setMessage("Nhập tối thiểu 2.000đ.");
  }

  const qrUrl = `${qrBase}?amount=${amount}&addInfo=${encodeURIComponent("cam on da nuoi Tanh")}`;

  return (
    <div className="page">
      <header className="masthead">
        <p className="brand">Trung tâm cứu đói cho Tanh</p>
        <p className="record">Biên bản tiếp tế<br />Lưu hành nội bộ trong bụng</p>
      </header>
      <main>
        <section className="left" aria-labelledby="page-title">
          <div>
            <p className="kicker">Thông báo hoàn toàn nghiêm túc</p>
            <h1 id="page-title">Hai cách<br />nuôi Tanh.</h1>
            <p className="lead">Một cách không tốn tiền. Một cách khiến ứng dụng ngân hàng hơi bận.</p>
          </div>
          <div className="free-box">
            <p className="section-label">Phương án miễn phí</p>
            <h2>Nhấp một cái.<br />Bụng ghi nhận.</h2>
            <p>Mở một sản phẩm ngẫu nhiên ở tab mới. Bạn xem qua là đã hỗ trợ Tanh, không cần mua và không cần làm lễ bàn giao.</p>
            <div className="action-row">
              <button className="action" type="button" onClick={feedForFree}>Mở ngẫu nhiên ↗</button>
              <a className="action action-secondary" href="/free-feed">Tự chọn sản phẩm ↗</a>
            </div>
            <p className="status" aria-live="polite">{status}</p>
          </div>
        </section>
        <section className="qr-panel" aria-labelledby="qr-title">
          <div className="qr-heading">
            <div>
              <p className="section-label">Phương án quét mã</p>
              <h2 id="qr-title">Chuyển khoản cứu đói.</h2>
            </div>
            <span className="stamp" aria-label="Đã xác nhận bụng có thật">Đã xác nhận<br />bụng có thật</span>
          </div>
          <fieldset className="amount-picker">
            <legend>Chọn ngân sách cứu đói</legend>
            <div className="amount-options">
              {amounts.map((value) => (
                <button
                  className="amount-option"
                  type="button"
                  aria-pressed={amount === value && !customAmount}
                  onClick={() => selectAmount(value)}
                  key={value}
                >
                  {value.toLocaleString("vi-VN")}đ
                </button>
              ))}
            </div>
            <div className="custom-amount">
              <input
                type="text"
                inputMode="numeric"
                placeholder="Hoặc nhập số tiền bạn muốn"
                aria-label="Số tiền tùy chọn"
                aria-describedby="amount-message"
                aria-invalid={error || undefined}
                value={formatAmountInput(customAmount)}
                onChange={(event) => changeCustomAmount(event.target.value)}
              />
            </div>
            <p className="amount-message" id="amount-message" data-error={error || undefined} aria-live="polite">{message}</p>
          </fieldset>
          <a className="qr-link" href={qrUrl} target="_blank" rel="noopener" aria-label="Mở mã QR chuyển khoản kích thước đầy đủ">
            <img src={qrUrl} width="512" height="512" alt="Mã QR chuyển khoản nuôi Tanh" />
          </a>
          <div className="bank-line" aria-label="Thông tin tài khoản">
            <span>Ngân hàng</span><strong>Techcombank</strong>
            <span>Số tài khoản</span><strong>1212141000</strong>
            <span>Người nhận</span><strong>Nguyễn Tuấn Anh</strong>
          </div>
          <p className="disclaimer">Đây không phải quỹ từ thiện. Đây là một lời mời cơm tự nguyện cho Tanh. Không mời cũng không sao, hồ sơ vẫn được đóng dấu thân thiện.</p>
        </section>
      </main>
    </div>
  );
}
