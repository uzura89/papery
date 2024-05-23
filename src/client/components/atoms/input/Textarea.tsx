import { useEffect, useRef } from "react";

export const DEFAULT_HEIGHT = 100;

export default function Textarea(props: {
  textareaRef?: React.RefObject<HTMLTextAreaElement>;
  value: string;
  type?: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  placeholder?: string;
  width?: string;
  height?: number;
  extensible?: boolean;
  onKeyDown?: (e: React.KeyboardEvent<HTMLTextAreaElement>) => void;
  onKeyUp?: (e: React.KeyboardEvent<HTMLTextAreaElement>) => void;
}) {
  // refs
  const textareaRef = props.textareaRef || useRef<HTMLTextAreaElement>(null);

  /**
   * Functions
   */

  function changeHeight(height: number) {
    if (!textareaRef.current) return;
    textareaRef.current.style.height = `${height}px`;
  }

  function adjustHeight() {
    const defaultHeight = props.height || DEFAULT_HEIGHT;

    // first, set it to default
    changeHeight(defaultHeight);
    // calculate the scroll height and apply it
    const scrollHeight = textareaRef.current?.scrollHeight || 0;
    const newHeight =
      scrollHeight > defaultHeight ? scrollHeight : defaultHeight;
    changeHeight(newHeight + 2);
  }

  /**
   * User Interactions
   */

  function handleChange(e: React.ChangeEvent<HTMLTextAreaElement>) {
    props.onChange(e);

    // extensible
    if (props.extensible) {
      // if the value is empty, set the height to default
      if (e.target.value === "") {
        return;
      }

      adjustHeight();
    }
  }

  /**
   * Effects
   */

  useEffect(() => {
    changeHeight(props.height ? props.height : DEFAULT_HEIGHT);
  }, [props.height]);

  useEffect(() => {
    adjustHeight();
  }, [props.value]);

  /**
   * Render
   */

  return (
    <textarea
      ref={textareaRef}
      // className="px-4 py-2 border border-gray-400 rounded w-full"
      className="w-full p-0 placeholder:italic"
      style={{ maxWidth: props.width || "100%" }}
      placeholder={props.placeholder}
      value={props.value}
      onChange={handleChange}
      onKeyDown={props.onKeyDown}
      onKeyUp={props.onKeyUp}
      dir="auto"
    />
  );
}
