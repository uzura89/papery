import { Card } from "../card/Card";

export default function EntryCardWrapper(props: { children: React.ReactNode }) {
  return (
    <Card>
      <div className="relative pt-3 pb-4 px-6">{props.children}</div>
    </Card>
  );
}
