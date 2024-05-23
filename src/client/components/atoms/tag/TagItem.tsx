import { getTagColor } from "../../../../common/constants/tag.cons";

export function TagItem(props: {
  text: string;
  color: string;
  noBgColor?: boolean;
}) {
  const color = getTagColor(props.color);

  return (
    <span
      className={`font-[500] text-sm px-[5px] py-[3px] rounded-md select-none`}
      style={{
        color: color,
        backgroundColor: props.noBgColor ? "" : `${color}1c`,
      }}
    >
      #{props.text}
    </span>
  );
}
