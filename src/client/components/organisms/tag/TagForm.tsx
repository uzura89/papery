import {
  CONS_TAG_COLOR_LIST,
  getTagColor,
} from "../../../../common/constants/tag.cons";
import { FormInput } from "../../atoms/input/FormInput";
import { FormLabel } from "../../atoms/input/FormLabel";
import { FormSelection } from "../../atoms/input/FormSelection";

export function TagForm(props: {
  name: string;
  color: string;
  setName: (name: string) => void;
  setColor: (color: string) => void;
}) {
  function handleChangeTagName(value: string) {
    const withoutSpace = value.replace(/\s/g, "");
    props.setName(withoutSpace);
  }

  return (
    <div className="padding-x-sm pt-4 pb-6 flex flex-col gap-4">
      <div>
        <FormLabel text="Name" />
        <FormInput
          label="Name"
          value={props.name}
          onChange={handleChangeTagName}
          placeholder="TagName"
          type="text"
        />
      </div>
      <div>
        <FormLabel text="Color" />
        <FormSelection
          selection={{
            ids: CONS_TAG_COLOR_LIST,
            icons: CONS_TAG_COLOR_LIST.map((color) => (
              <div
                className="w-3 h-3 rounded-full"
                style={{ backgroundColor: getTagColor(color) }}
              />
            )),
            texts: CONS_TAG_COLOR_LIST.map(
              (color) => color.charAt(0).toUpperCase() + color.slice(1)
            ),
          }}
          selectedId={props.color}
          onSelect={props.setColor}
          maxHeight={200}
        />
      </div>
    </div>
  );
}
