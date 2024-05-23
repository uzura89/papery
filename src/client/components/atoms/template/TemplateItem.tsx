export default function TemplateItem(props: {
  id: string;
  name: string;
  onClick: (id: string) => void;
}) {
  return (
    <button
      key={props.id}
      className="bg-card flex items-center justify-center border border-gray p-4 rounded-md shadow-sm"
      onClick={() => props.onClick(props.id)}
    >
      <span className="text-foreSecondary">{props.name}</span>
    </button>
  );
}
