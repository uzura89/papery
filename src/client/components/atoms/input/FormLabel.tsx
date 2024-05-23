export function FormLabel(props: { text: string }) {
  return (
    <label className="text-fore font-bold text-sm mb-1 block">
      {props.text}
    </label>
  );
}
