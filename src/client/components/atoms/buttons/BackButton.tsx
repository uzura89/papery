import { LuChevronLeft } from "react-icons/lu";

export default function BackButton(props: { onClick: () => void }) {
  return (
    <button
      className="clickable-text flex items-center gap-0.5 rounded-md text-foreLight py-1 pl-1 pr-2 text-sm"
      onClick={props.onClick}
    >
      <LuChevronLeft className="text-md" /> Back
    </button>
  );
}
