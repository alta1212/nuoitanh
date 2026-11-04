import type { MouseEvent, ReactNode } from "react";

interface TaskCardProps {
  icon: ReactNode;
  title: string;
  description: string;
  meritLabel: string;
  cta: string;
  done: boolean;
  /** Có href thì là link mở tab mới, không có thì là nút. */
  href?: string;
  clampDescription?: boolean;
  onActivate: (event: MouseEvent) => void;
}

export default function TaskCard({
  icon,
  title,
  description,
  meritLabel,
  cta,
  done,
  href,
  clampDescription,
  onActivate,
}: TaskCardProps) {
  return (
    <div className={`task${done ? " done" : ""}`}>
      <div className="tick">{done ? "✅" : icon}</div>
      <div>
        <h3>{title}</h3>
        <p className={clampDescription ? "clamp" : undefined}>{description}</p>
        <span className="pts">{meritLabel}</span>
      </div>
      {href ? (
        <a
          className="btn btn-red go"
          href={href}
          target="_blank"
          rel="sponsored noopener noreferrer"
          onClick={onActivate}
        >
          {cta} →
        </a>
      ) : (
        <button className="btn btn-red go" type="button" onClick={onActivate}>
          {cta}
        </button>
      )}
    </div>
  );
}
