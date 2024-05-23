import { LuX } from "react-icons/lu";

export function ModalCloseButton(props: { onClick: () => void }) {
  return (
    <div className="absolute top-[9px] right-[9px] rounded-full overflow-hidden w-7 h-7 flex justify-center items-center">
      <button className="btn btn-text" onClick={props.onClick}>
        <LuX className="text-foreLight text-sm" />
      </button>
    </div>
  );
}
