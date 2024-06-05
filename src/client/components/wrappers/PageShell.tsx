import { ReactNode } from "react";
import { LuCrown } from "react-icons/lu";

export function PageWrapper(props: { children: ReactNode }) {
  return (
    <div className="w-full overflow-y-scroll h-full pb-10">
      {props.children}
    </div>
  );
}

export function PageTitle(props: { title: string; children?: ReactNode }) {
  return (
    <div className="flex justify-between items-center mb-6">
      <h1 className="font-bold text-xl md:text-2xl font-serif">
        {props.title}
      </h1>
      {props.children}
    </div>
  );
}

export function PageSection(props: {
  title: string;
  icon: ReactNode;
  children: ReactNode;
}) {
  return (
    <div className="">
      <h2 className="font-bold mb-3 flex items-center gap-1.5">
        <span className="opacity-50 text-sm">{props.icon}</span> {props.title}
      </h2>
      {props.children}
    </div>
  );
}
