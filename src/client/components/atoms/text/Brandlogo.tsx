import clsx from "clsx";

export function BrandLogo(props: { size: number; transparent?: boolean }) {
  return (
    <div className="">
      {props.transparent ? (
        <img src="/img/brand/brandlogo.svg" className="w-[5rem]" />
      ) : (
        <div
          className={clsx("font-serif", "text-brandlogo")}
          style={{
            fontSize: props.size,
            fontWeight: "bold",
          }}
        >
          Papery
        </div>
      )}
    </div>
  );
}
