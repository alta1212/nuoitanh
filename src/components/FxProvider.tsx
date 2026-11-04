import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { useCoinRain, type BurstOrigin } from "../hooks/useCoinRain";

interface Fx {
  toast: (message: string) => void;
  burst: (count: number, origin?: BurstOrigin | null) => void;
}

const FxContext = createContext<Fx | null>(null);

export function useFx() {
  const fx = useContext(FxContext);
  if (!fx) throw new Error("useFx must be used inside FxProvider");
  return fx;
}

/** Toast và mưa xu, dùng chung cho mọi trang. */
export default function FxProvider({ children }: { children: ReactNode }) {
  const { canvasRef, burst } = useCoinRain();
  const [message, setMessage] = useState("");
  const [visible, setVisible] = useState(false);
  const timer = useRef<number | undefined>(undefined);

  useEffect(() => () => clearTimeout(timer.current), []);

  const toast = useCallback((next: string) => {
    setMessage(next);
    setVisible(true);
    clearTimeout(timer.current);
    timer.current = window.setTimeout(() => setVisible(false), 2600);
  }, []);

  const value = useMemo(() => ({ toast, burst }), [toast, burst]);

  return (
    <FxContext.Provider value={value}>
      {children}
      <div className={`toast${visible ? " show" : ""}`} role="status">
        {message}
      </div>
      <canvas id="fx" ref={canvasRef} aria-hidden="true" />
    </FxContext.Provider>
  );
}
