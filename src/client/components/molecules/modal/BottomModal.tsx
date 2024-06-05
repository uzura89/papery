import clsx from "clsx";
import { ReactNode, useEffect, useRef } from "react";

import { useClickOutsideEffect } from "../../../modules/ui/useOutsideClick";

interface Props {
  visible: boolean;
  width: string;
  closeModal: () => void;
  children: ReactNode;
  height: string;
  title?: string;
}

export default function BottomModal(props: Props) {
  const windowRef = useRef<HTMLDivElement>(null);

  const onClickOutside = () => {
    props.closeModal();
  };

  useClickOutsideEffect(windowRef, onClickOutside, props.visible);

  return (
    <div
      className={clsx(
        `absolute bottom-0 px-3 duration-150 ease-in-out w-full`,
        props.visible
          ? "pointer-events-auto opacity-100 translate-y-0"
          : "pointer-events-none opacity-0 translate-y-[100%]"
      )}
      style={{
        height: props.height,
      }}
    >
      {/* Window */}
      <div
        className="bg-card rounded-t-xl pt-4 padding-x-sm h-full shadow-shadowColor shadow-bottom"
        style={
          {
            // boxShadow: "0px 0px 10px",
          }
        }
      >
        <div className="text-xs text-foreGray font-medium mb-4">
          {props.title}
        </div>
        <div className="h-full overflow-y-scroll pb-12">{props.children}</div>
      </div>
    </div>
  );
}
