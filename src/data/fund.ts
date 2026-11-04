/* =====================================================
   CẤU HÌNH — SỬA Ở ĐÂY
   Chữ hiển thị nằm trong src/locales/{vi,en}.json
   ===================================================== */
export type TierId = "passerby" | "goodPerson" | "bodhisattva" | "adoptiveParent";
export type TaskId = "shopee" | "tiktok" | "lazada" | "signup" | "share";

export const fund = {
  nickname: "Tanh", // biệt danh hiển thị
  avatar: "" as string, // link ảnh của bạn (vd "/images/me.jpg"). Để trống = emoji
  bankName: "Techcombank", // tên ngân hàng hiển thị
  bankCode: "TCB", // mã ngân hàng trên img.vietqr.io
  accountNo: "1212141000", // số tài khoản
  accountName: "NGUYEN TUAN ANH", // tên chủ tài khoản (không dấu)
  memo: "Moi Tanh an com", // nội dung chuyển khoản (không dấu, tối đa 25 ký tự)
  goal: 1_000_000_000,
  raised: 12_000,
};

export const tiers: { id: TierId; em: string; amount: number; fx: number }[] = [
  { id: "passerby", em: "🚶", amount: 10_000, fx: 12 },
  { id: "goodPerson", em: "😇", amount: 50_000, fx: 24 },
  { id: "bodhisattva", em: "🪷", amount: 200_000, fx: 45 },
  { id: "adoptiveParent", em: "👑", amount: 1_000_000, fx: 90 },
];

export const defaultTier: TierId = "goodPerson";

/**
 * Trang "Ủng hộ kiểu 0đ". Task có `url` rỗng sẽ bị ẩn: điền link aff vào là hiện.
 * "random-product" mở một sản phẩm Shopee ngẫu nhiên, "share" chép link trang.
 */
export const tasks: { id: TaskId; icon: string; url: string; merit: number }[] = [
  { id: "shopee", icon: "🛒", url: "random-product", merit: 100 },
  { id: "tiktok", icon: "🎵", url: "", merit: 100 },
  { id: "lazada", icon: "📦", url: "", merit: 50 },
  { id: "signup", icon: "📲", url: "", merit: 150 },
  { id: "share", icon: "🔗", url: "share", merit: 200 },
];

export const productMerit = 50;
