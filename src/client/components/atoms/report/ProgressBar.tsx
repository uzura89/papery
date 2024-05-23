export default function ProgressBar(props: { value: number; max: number }) {
  const percentage = (props.value / props.max) * 100;
  return (
    <div className="h-[6.5px] rounded-full bg-fillLightGray w-full">
      <div
        className="h-full rounded-full bg-fillPositive"
        style={{ width: `${percentage}%` }}
      />
    </div>
  );
}
