import { useLayoutEffect, useState } from "react";

const storageKey = "dark";

function getInitialDark() {
  let saved: string | null = null;
  try {
    saved = localStorage.getItem(storageKey);
  } catch {
    // Storage can be unavailable in privacy-restricted browsers.
  }
  if (saved !== null) return saved === "1";
  const hour = new Date().getHours();
  return hour >= 22 || hour < 5;
}

export function useDarkMode() {
  const [dark, setDark] = useState(getInitialDark);

  useLayoutEffect(() => {
    document.body.classList.toggle("dark", dark);
  }, [dark]);

  // Chỉ lưu khi người dùng tự bấm, để khách chưa chọn vẫn tự tối theo giờ.
  function toggle() {
    const next = !dark;
    setDark(next);
    try {
      localStorage.setItem(storageKey, next ? "1" : "0");
    } catch {
      // The selected theme still works for the current page session.
    }
    return next;
  }

  return { dark, toggle };
}
