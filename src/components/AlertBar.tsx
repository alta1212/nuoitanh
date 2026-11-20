export default function AlertBar({ text }: { text: string }) {
  return (
    <div className="ticker" aria-hidden="true">
      <span className="track">{text.repeat(6)}</span>
    </div>
  );
}
