import React from "react";

export function BlankButton(props: {
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <div
      onClick={props.onClick}
      className="w-full rounded-lg bg-textHoverBg clickable-text h-12 md:h-14 active:opacity-60 duration-150"
    >
      {/* Inner border */}
      <div className="border-dashed border-[1.5px] border-black/10 rounded-lg h-full w-full flex justify-center items-center">
        <div className="text-sm text-foreLight select-none">
          {props.children}
        </div>
      </div>
    </div>
  );
}
