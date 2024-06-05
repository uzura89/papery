import clsx from "clsx";
import { LuLock, LuUnlock } from "react-icons/lu";

export default function PremiumIcon(props: { isPremium?: boolean }) {
  return (
    <div
      className={clsx(
        "inline-flex items-center justify-center w-[20px] h-[20px] rounded-full",
        props.isPremium
          ? "bg-[#90d0a742] text-[#268444]"
          : "bg-[#d8af3247] text-[#b18c1b]"
      )}
    >
      <div className="">
        {props.isPremium ? (
          <LuUnlock className="text-xs" />
        ) : (
          <LuLock className="text-xs" />
        )}
      </div>
    </div>
  );
}
