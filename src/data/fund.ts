/* =====================================================
   CẤU HÌNH — SỬA Ở ĐÂY
   Chữ hiển thị nằm trong src/locales/{vi,en}.json
   ===================================================== */
export type TierId = "passerby" | "goodPerson" | "benefactor" | "patron";
export type TaskId = "shopee" | "share" | "candle" | "tiktok" | "lazada" | "signup";

export const fund = {
  nickname: "Tanh", // biệt danh hiển thị
  avatar: "" as string, // link ảnh của bạn (vd "/images/me.jpg"). Để trống = ảnh mờ vẽ bằng CSS
  bankName: "Techcombank", // tên ngân hàng hiển thị
  bankCode: "TCB", // mã ngân hàng trên img.vietqr.io
  accountNo: "1212141000", // số tài khoản
  accountName: "NGUYEN TUAN ANH", // tên chủ tài khoản (không dấu)
  memo: "Moi Tanh an com", // nội dung chuyển khoản (không dấu, tối đa 25 ký tự)
  goal: 1_000_000_000,
  raised: 12_000,
  /** Đồng hồ "bữa no gần nhất cách đây": mốc đếm lúc mở trang (giây). */
  lastMealSeconds: 38 * 3600 + 17 * 60 + 42,
};

export const tiers: { id: TierId; amount: number }[] = [
  { id: "passerby", amount: 10_000 },
  { id: "goodPerson", amount: 50_000 },
  { id: "benefactor", amount: 200_000 },
  { id: "patron", amount: 1_000_000 },
];

export const defaultTier: TierId = "goodPerson";

/**
 * Trang "Ủng hộ kiểu 0đ". Task có `url` rỗng sẽ bị ẩn: điền link aff vào là hiện.
 * "random-product" mở một sản phẩm Shopee ngẫu nhiên, "share" chia sẻ link trang,
 * "candle" là nút giữ 3 giây để thắp nến.
 */
export const tasks: { id: TaskId; icon: string; url: string; merit: number }[] = [
  { id: "shopee", icon: "🛒", url: "random-product", merit: 100 },
  { id: "share", icon: "📨", url: "share", merit: 200 },
  { id: "candle", icon: "🕯️", url: "candle", merit: 30 },
  { id: "tiktok", icon: "🎵", url: "", merit: 100 },
  { id: "lazada", icon: "📦", url: "", merit: 50 },
  { id: "signup", icon: "📲", url: "", merit: 150 },
];

export const productMerit = 50;

/** Mốc điểm cho danh hiệu và "quy đổi" trên hóa đơn công đức (free.levels / free.foods). */
export const meritSteps = [0, 50, 150, 300, 500, 800];

/** Giữ bao lâu thì nến cháy, và bao lâu thì tắt khi buông tay (ms). */
export const candleHoldMs = 3000;
export const candleDrainMs = 700;
