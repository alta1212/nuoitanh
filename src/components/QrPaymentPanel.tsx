import { useEffect, useState } from "react";
import AmountPicker from "./AmountPicker";

const qrBase = "https://img.vietqr.io/image/TCB-1212141000-compact.png";

export default function QrPaymentPanel() {
  const [amount, setAmount] = useState(50_000);
  const [customAmount, setCustomAmount] = useState("");
  const [error, setError] = useState(false);

  useEffect(() => {
    if (!customAmount) {
      setError(false);
      return;
    }

    const timer = window.setTimeout(() => {
      const value = Math.floor(Number(customAmount));
      const invalid = !Number.isFinite(value) || value < 2_000;
      setError(invalid);
      if (!invalid) setAmount(value);
    }, 300);

    return () => window.clearTimeout(timer);
  }, [customAmount]);

  function selectAmount(value: number) {
    setCustomAmount("");
    setError(false);
    setAmount(value);
  }

  const qrUrl = `${qrBase}?amount=${amount}&addInfo=${encodeURIComponent("cam on da nuoi Tanh")}`;

  return (
    <section className="qr-panel" aria-labelledby="qr-title">
      <div className="qr-heading">
        <div>
          <p className="section-label">Phương án quét mã</p>
          <h2 id="qr-title">Chuyển khoản cứu đói.</h2>
        </div>
        <span className="stamp" aria-label="Đã xác nhận bụng có thật">
          Đã xác nhận<br />bụng có thật
        </span>
      </div>
      <AmountPicker
        amount={amount}
        customAmount={customAmount}
        error={error}
        onAmountChange={selectAmount}
        onCustomAmountChange={setCustomAmount}
      />
      <a
        className="qr-link"
        href={qrUrl}
        target="_blank"
        rel="noopener"
        aria-label="Mở mã QR chuyển khoản kích thước đầy đủ"
      >
        <img src={qrUrl} width="512" height="512" alt="Mã QR chuyển khoản nuôi Tanh" />
      </a>
      <div className="bank-line" aria-label="Thông tin tài khoản">
        <span>Ngân hàng</span><strong>Techcombank</strong>
        <span>Số tài khoản</span><strong>1212141000</strong>
        <span>Người nhận</span><strong>Nguyễn Tuấn Anh</strong>
      </div>
      <p className="disclaimer">
        Đây không phải quỹ từ thiện. Đây là một lời mời cơm tự nguyện cho Tanh.
        Không mời cũng không sao, hồ sơ vẫn được đóng dấu thân thiện.
      </p>
    </section>
  );
}
