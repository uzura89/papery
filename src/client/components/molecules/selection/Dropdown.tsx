import { useRef, useState } from "react";
import { useClickOutsideEffect } from "../../../modules/ui/useOutsideClick";
import clsx from "clsx";

export default function Dropdown(props: {
  children: React.ReactNode;
  items: {
    icon?: React.ReactNode;
    text: string;
    onClick: () => void;
    isDanger?: boolean;
  }[];
  width: string;
  alignLeft?: boolean;
  top?: number;
}) {
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useClickOutsideEffect(ref, () => setDropdownVisible(false), dropdownVisible);

  const toggleDropdown = () => {
    setDropdownVisible(!dropdownVisible);
  };

  return (
    <div ref={ref} className="relative inline-block">
      <div onClick={toggleDropdown}>{props.children}</div>

      {/* Dropdown Window */}
      {dropdownVisible && (
        <div
          className={`absolute z-10 ${
            props.alignLeft ? "!left-0" : "!right-0"
          }`}
          style={{
            width: props.width,
            top: props.top || 34,
          }}
        >
          <div className="bg-card rounded-lg shadow-md py-1 shadow-shadowColor">
            {props.items.map((item, index) => (
              <div
                key={index}
                onClick={(e) => {
                  e.stopPropagation();
                  setDropdownVisible(false);
                  item.onClick();
                }}
                className={clsx(
                  `flex items-center gap-2 pl-3 pr-5 py-1.5 hover:bg-textHoverBg cursor-pointer text-sm`,
                  item.isDanger ? "text-foreDanger" : "text-fore"
                )}
              >
                {item.icon && (
                  <div className="w-4 h-4 opacity-60 flex items-center">
                    {item.icon}
                  </div>
                )}
                <div className="text-sm">{item.text}</div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
