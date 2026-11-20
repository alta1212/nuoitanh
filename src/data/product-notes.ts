/**
 * Ghi chú cho kệ đồ ở trang "Ủng hộ kiểu 0đ".
 * `category` khớp với free.categories, `note` khớp với free.notes trong locales.
 * Link nào không có ở đây thì vẫn hiện, chỉ là không có lời bình và nằm ở "Tất cả".
 */
export type CategoryId = "keyboard" | "tech" | "clothes" | "home";

export const categoryOrder: CategoryId[] = ["keyboard", "tech", "clothes", "home"];

export const productNotes: Record<string, { category: CategoryId; note: string }> = {
  "https://s.shopee.vn/6AlS7sfDUR": { category: "keyboard", note: "keyboardRgb" },
  "https://s.shopee.vn/2LYjYnQ5uY": { category: "keyboard", note: "keyboardF61" },
  "https://s.shopee.vn/6L4sK7h5ij": { category: "keyboard", note: "keyboardF61Alt" },
  "https://s.shopee.vn/4fweLD8ktE": { category: "tech", note: "wifi5g" },
  "https://s.shopee.vn/905dVDZecO": { category: "clothes", note: "jerseyVn" },
  "https://s.shopee.vn/40gxY4RQFE": { category: "clothes", note: "menSet" },
  "https://s.shopee.vn/20vtAPKkHx": { category: "clothes", note: "sportSet" },
  "https://s.shopee.vn/4LJnwiGgRF": { category: "clothes", note: "menSetAlt" },
  "https://s.shopee.vn/6q18vK37QR": { category: "clothes", note: "sportShorts" },
  "https://s.shopee.vn/40gxY80EWI": { category: "clothes", note: "menSetNew" },
  "https://s.shopee.vn/6L4sKQzCCx": { category: "clothes", note: "sportSetAlt" },
  "https://s.shopee.vn/9fLKIZze3a": { category: "clothes", note: "sportShirt" },
  "https://s.shopee.vn/AKb15pwIcK": { category: "clothes", note: "fashion" },
  "https://s.shopee.vn/8AWWVvwp1W": { category: "home", note: "tissueCombo" },
  "https://s.shopee.vn/7VGpjSti9v": { category: "home", note: "micellar" },
  "https://s.shopee.vn/3B7qZVACx6": { category: "home", note: "toiletPaper" },
  "https://s.shopee.vn/30oQNCAqI5": { category: "home", note: "tissueBox" },
};
