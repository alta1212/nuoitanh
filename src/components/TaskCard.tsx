import type { ReactNode } from "react";

interface TaskCardProps {
  icon: ReactNode;
  title: string;
  description: string;
  meritLabel: string;
  done: boolean;
  /** Nút hoặc link để làm việc tốt. */
  children: ReactNode;
}

export default function TaskCard({
  icon,
  title,
  description,
  meritLabel,
  done,
  children,
}: TaskCardProps) {
  return (
    <div className={`task${done ? " done" : ""}`}>
      <div className="ic" aria-hidden="true">
        {icon}
      </div>
      <h3>{title}</h3>
      <p>{description}</p>
      <span className="pt">{meritLabel}</span>
      {children}
    </div>
  );
}
