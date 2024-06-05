export function Card(props: { children: React.ReactNode }) {
  return (
    <div className="bg-card shadow-md rounded-xl border-borderLight border shadow-shadowColor">
      {props.children}
    </div>
  );
}
