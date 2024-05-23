export function ModalHeader(props: { title: string }) {
  return (
    <div className="flex items-center justify-between padding-x-sm py-3 border-b border-borderGray">
      <h2 className="font-bold text-foreSecondary text-md">{props.title}</h2>
    </div>
  );
}
