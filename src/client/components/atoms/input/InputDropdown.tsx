export function InputDropdownWindow(props: {
  children: React.ReactNode;
  top: string;
  maxHeight?: string;
  radius?: string;
}) {
  return (
    <div
      className="absolute left-0 z-10 bg-card shadow-md w-full py-2 overflow-y-scroll border border-borderLight"
      style={{
        top: props.top,
        maxHeight: props.maxHeight || "160px",
        borderRadius: props.radius || "0.5rem",
      }}
    >
      {props.children}
    </div>
  );
}

export function InputDropdownItem(props: {
  id: string;
  children: React.ReactNode;
  onClick: (id: string) => void;
}) {
  return (
    <div
      className="py-1 px-3 flex items-center gap-2 clickable-opacity hover:bg-textHoverBg"
      onClick={() => props.onClick(props.id)}
    >
      {props.children}
    </div>
  );
}
