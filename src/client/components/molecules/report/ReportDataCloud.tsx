import { useEffect, useRef } from "react";
import WordCloud from "wordcloud";

import { CONS_REPORT_DIVIDE_BY_EMOJI } from "../../../../common/constants/report.cons";
import { ReportDataType } from "../../../../common/types";
import useTagStore from "../../../store/tag/tagStore";

export default function ReportDataCloud(props: {
  divideBy: string;
  reportData: ReportDataType;
}) {
  // refs
  const canvasRef = useRef<HTMLCanvasElement>(null);
  // get max data points
  const maxDataPoints = props.reportData.reduce(
    (acc, data) => (data.value > acc ? data.value : acc),
    0
  );

  //   function renderItem(label: string, value: number) {
  //     const fontSize = `${
  //       maxDataPoints === 0 ? 1 : (value / maxDataPoints) * 2
  //     }rem`;

  //     if (props.divideBy === CONS_REPORT_DIVIDE_BY_EMOJI) {
  //       return (
  //         <div
  //           style={{
  //             fontSize,
  //           }}
  //         >
  //           {label === "" ? "🗒" : label}
  //         </div>
  //       );
  //     }

  //     const tag = tagStore.tags.find((tag) => tag.text === label);
  //     if (!tag) return null;
  //     return (
  //       <div
  //         style={{
  //           fontSize,
  //         }}
  //       >
  //         <TagItem text={tag.text} color={tag.color} />
  //       </div>
  //     );
  //   }

  useEffect(() => {
    if (props.reportData.length === 0) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const list: any = props.reportData.map((data) => {
      const labelWithHash =
        props.divideBy === CONS_REPORT_DIVIDE_BY_EMOJI
          ? data.label
          : `#${data.label}`;
      const valuePrc = (data.value / maxDataPoints) * 5;

      return [labelWithHash, valuePrc];
    });

    WordCloud(canvas, {
      list,
      weightFactor: 25,
      rotateRatio: 0,
    });
  }, [props.reportData]);

  return (
    <div className="flex items-center justify-center relative w-full">
      <canvas
        ref={canvasRef}
        className=""
        style={{ width: "70%", height: "100%" }}
      />
    </div>
  );
}
