export function ModalFooter(props: { children: React.ReactNode }) {
  return (
    <div className="flex items-center padding-x-sm py-3 border-t border-borderGray justify-between">
      {props.children}
    </div>
  );
}
