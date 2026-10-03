interface MastheadProps {
  catalog?: boolean;
}

export default function Masthead({ catalog = false }: MastheadProps) {
  return (
    <header className="masthead">
      {catalog ? (
        <a className="brand" href="/">nuôi tanh.</a>
      ) : (
        <p className="brand">Trung tâm cứu đói cho Tanh</p>
      )}
      <p className="record">
        {catalog ? "Danh sách tiếp tế" : "Biên bản tiếp tế"}
        <br />
        {catalog ? "Tự chọn · 0đ" : "Lưu hành nội bộ trong bụng"}
      </p>
    </header>
  );
}
