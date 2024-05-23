import { CONS_REPORT_DIVIDE_BY_EMOJI } from "../../../../common/constants/report.cons";
import { ReportDataType } from "../../../../common/types";
import useTagStore from "../../../store/tag/tagStore";
import ProgressBar from "../../atoms/report/ProgressBar";
import { TagItem } from "../../atoms/tag/TagItem";

export default function ReportDataBar(props: {
  divideBy: string;
  reportData: ReportDataType;
}) {
  const tagStore = useTagStore();
  // get max data points
  const maxDataPoints = props.reportData.reduce(
    (acc, data) => (data.value > acc ? data.value : acc),
    0
  );

  function renderLabel(label: string) {
    if (props.divideBy === CONS_REPORT_DIVIDE_BY_EMOJI) {
      return <div>{label === "" ? "🗒" : label}</div>;
    }

    const tag = tagStore.tags.find((tag) => tag.text === label);
    if (!tag) return null;
    return <TagItem text={tag.text} color={tag.color} />;
  }

  return (
    <table className="w-full">
      <tbody className="">
        {props.reportData.map((data) => {
          const labelItem = renderLabel(data.label);
          if (labelItem === null) return null;

          return (
            <tr key={data.label} className="">
              <td className="text-foreLight text-md pr-4 py-1">{labelItem}</td>
              <td className="w-full pr-4">
                <ProgressBar value={data.value} max={maxDataPoints} />
              </td>
              <td className="text-sm w-10 text-right">{data.value}</td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}
