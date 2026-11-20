import { useCallback, useEffect, useRef, useState } from "react";

export interface MeritState {
  /** Tổng điểm công đức. */
  points: number;
  /** key việc tốt -> điểm đã cộng (dùng cho hóa đơn công đức). */
  log: Record<string, number>;
  /** Những link sản phẩm khách đã mở. */
  seen: string[];
}

const storageKey = "nuoitanh-merit";
const empty: MeritState = { points: 0, log: {}, seen: [] };

function read(): MeritState {
  try {
    const raw = localStorage.getItem(storageKey);
    if (!raw) return empty;
    const saved = JSON.parse(raw) as Partial<MeritState>;
    return {
      points: typeof saved.points === "number" && saved.points >= 0 ? saved.points : 0,
      log: saved.log && typeof saved.log === "object" ? saved.log : {},
      seen: Array.isArray(saved.seen) ? saved.seen.filter((url) => typeof url === "string") : [],
    };
  } catch {
    return empty;
  }
}

/** Điểm công đức, lưu trong localStorage để khách quay lại vẫn còn. */
export function useMerit() {
  const [state, setState] = useState<MeritState>(empty);
  const stateRef = useRef(state);

  // Đọc sau khi mount: HTML prerender luôn là 0 điểm nên hydrate không bị lệch.
  useEffect(() => {
    const saved = read();
    stateRef.current = saved;
    setState(saved);
  }, []);

  const commit = useCallback((next: MeritState) => {
    stateRef.current = next;
    setState(next);
    try {
      localStorage.setItem(storageKey, JSON.stringify(next));
    } catch {
      // Không lưu được thì điểm chỉ tồn tại trong lần xem này.
    }
  }, []);

  /** Cộng điểm. `once` = mỗi khách chỉ được tính một lần; trả về false nếu đã làm rồi. */
  const add = useCallback(
    (key: string, points: number, once = false) => {
      const current = stateRef.current;
      if (once && current.log[key]) return false;
      commit({
        ...current,
        points: current.points + points,
        log: { ...current.log, [key]: (current.log[key] ?? 0) + points },
      });
      return true;
    },
    [commit],
  );

  /** Đánh dấu đã mở một sản phẩm; trả về false nếu khách xem link đó rồi. */
  const markSeen = useCallback(
    (url: string) => {
      const current = stateRef.current;
      if (current.seen.includes(url)) return false;
      commit({ ...current, seen: [...current.seen, url] });
      return true;
    },
    [commit],
  );

  return { merit: state, add, markSeen };
}
