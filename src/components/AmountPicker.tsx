const amounts = [15_000, 35_000, 50_000];

interface AmountPickerProps {
  amount: number;
  customAmount: string;
  error: boolean;
  onAmountChange: (amount: number) => void;
  onCustomAmountChange: (value: string) => void;
}

export default function AmountPicker({
  amount,
  customAmount,
  error,
  onAmountChange,
  onCustomAmountChange,
}: AmountPickerProps) {
  return (
    <fieldset className="amount-picker">
      <legend>Chọn ngân sách cứu đói</legend>
      <div className="amount-options">
        {amounts.map((option) => (
          <button
            className="amount-option"
            type="button"
            aria-pressed={amount === option && customAmount === ""}
            onClick={() => onAmountChange(option)}
            key={option}
          >
            {option.toLocaleString("vi-VN")}đ
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
          value={customAmount}
          onChange={(event) => onCustomAmountChange(event.target.value)}
        />
      </div>
      <p
        className="amount-message"
        id="amount-message"
        data-error={error || undefined}
        aria-live="polite"
      >
        {error
          ? "Bank không cho chuyển dưới 2k =)) nhiều hơn đi"
          : customAmount === ""
            ? `QR hiện tại: ${amount.toLocaleString("vi-VN")}đ`
            : Number(customAmount) >= 2_000
              ? `QR hiện tại: ${amount.toLocaleString("vi-VN")}đ`
              : "Nhập tối thiểu 2.000đ."}
      </p>
    </fieldset>
  );
}
