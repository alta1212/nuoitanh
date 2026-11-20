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

interface Fx {
  toast: (message: string) => void;
}

const FxContext = createContext<Fx | null>(null);

export function useFx() {
  const fx = useContext(FxContext);
  if (!fx) throw new Error("useFx must be used inside FxProvider");
  return fx;
}

/** Toast dùng chung cho mọi trang. */
export default function FxProvider({ children }: { children: ReactNode }) {
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

  const value = useMemo(() => ({ toast }), [toast]);

  return (
    <FxContext.Provider value={value}>
      {children}
      <div className={`toast${visible ? " show" : ""}`} role="status">
        {message}
      </div>
    </FxContext.Provider>
  );
}
