import clsx from "clsx";

export default function Switcher(props: {
  enabled: boolean;
  onChange: (enabled: boolean) => void;
  enabledText?: string;
  disabledText?: string;
}) {
  return (
    <div
      className="clickable-opacity inline-flex items-center"
      onClick={() => props.onChange(!props.enabled)}
    >
      {/* Switcher */}
      <div className="h-[20px] w-[35px] inline-flex items-center justify-center relative">
        <div
          className={clsx(
            "h-[7px] w-full rounded-full transition-all duration-150 ease-out",
            props.enabled ? "bg-fillPositive" : "bg-border"
          )}
        />
        <div
          className={clsx(
            "absolute h-[16px] w-[16px] rounded-full bg-white transition-all duration-150 ease-out -left-[0px] shadow-md border border-borderLight",
            props.enabled ? "translate-x-[19px]" : "translate-x-0"
          )}
        />
      </div>

      {/* Text */}
      {props.enabledText &&
        props.disabledText &&
        (props.enabled ? (
          <span className="text-xs ml-2 text-fore">Enabled</span>
        ) : (
          <span className="text-xs ml-2 text-foreLight">Disabled</span>
        ))}
    </div>
  );
}
