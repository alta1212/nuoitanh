export default function AlertBar({ text }: { text: string }) {
  return (
    <div className="alert">
      <div className="track">{text.repeat(6)}</div>
    </div>
  );
}
