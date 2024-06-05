import { useEffect, useState } from "react";

import Modal from "../../molecules/modal/Modal";
import { ModalFooter } from "../../molecules/modal/ModalFooter";
import { ModalHeader } from "../../molecules/modal/ModalHeader";
import { LuAlignJustify, LuAlignVerticalJustifyCenter } from "react-icons/lu";
import clsx from "clsx";

type ItemType = {
  id: string;
  text: string;
  order: number;
};

export default function SortListModal(props: {
  visible: boolean;
  title: string;
  sortItems: {
    ids: string[];
    texts: string[];
    orders: number[];
  };
  closeModal: () => void;
  onSave: (newOrders: { id: string; order: number }[]) => void;
}) {
  const [items, setItems] = useState<ItemType[]>([]);
  const [draggingId, setDraggingId] = useState<string>("");

  function changeOrderOfItems(
    _items: ItemType[],
    _draggingId: string,
    _targetId: string
  ): ItemType[] {
    const draggingIndex = _items.findIndex((item) => item.id === _draggingId);
    const targetIndex = _items.findIndex((item) => item.id === _targetId);

    const newItems = _items.filter((item) => item.id !== _draggingId);
    newItems.splice(targetIndex, 0, _items[draggingIndex]);
    return newItems;
  }

  function onDragStart(id: string) {
    setDraggingId(id);
  }

  function onDragEnter(id: string) {
    const newItems = changeOrderOfItems(items, draggingId, id);
    setItems(newItems);
  }

  function onClickSave() {
    const newOrders = items.map((item, index) => {
      return {
        id: item.id,
        order: index,
      };
    });
    props.onSave(newOrders);
  }

  useEffect(() => {
    const sortItems = props.sortItems;
    const items = sortItems.ids.map((id, index) => {
      return {
        id: id,
        text: sortItems.texts[index],
        order: sortItems.orders[index],
      };
    });
    items.sort((a, b) => a.order - b.order);
    setItems(items);

    document.addEventListener("dragover", function (e) {
      e.preventDefault();
    });
  }, [props.sortItems]);

  return (
    <Modal width="400px" closeModal={props.closeModal} visible={props.visible}>
      <ModalHeader title={props.title} />

      <div className="py-1.5">
        {items.map((item, index) => (
          <Item
            item={item}
            onDragStart={onDragStart}
            onDragEnter={onDragEnter}
            key={item.id}
            isDragging={item.id === draggingId}
          />
        ))}
      </div>

      <ModalFooter>
        <div />
        <div>
          <button className="btn" onClick={onClickSave}>
            Save
          </button>
        </div>
      </ModalFooter>
    </Modal>
  );
}

function Item(props: {
  item: ItemType;
  isDragging: boolean;
  onDragStart: (id: string) => void;
  onDragEnter: (id: string) => void;
}) {
  function onDragStart(e: any) {
    props.onDragStart(props.item.id);
  }

  function onDragEnter(e: any) {
    props.onDragEnter(props.item.id);
  }

  return (
    <div className={"cursor-pointer relative"}>
      <div
        draggable
        onDragStart={onDragStart}
        onDragEnter={onDragEnter}
        className={clsx(
          "padding-x-sm py-1.5 flex items-center gap-1.5 bg-transparent"
        )}
      >
        <LuAlignJustify className="text-foreLighter text-sm" />
        {props.item.text}
      </div>
    </div>
  );
}
