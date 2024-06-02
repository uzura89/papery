import { LuLayoutTemplate } from "react-icons/lu";
import { useNavigate } from "react-router-dom";

import { extractTagsFromBody } from "../../../../common/modules/tag/extractTagsFromBody";
import EventTracker from "../../../modules/analytics/EventTracker";
import useEntrySearchStore from "../../../store/entry/entrySearchStore";
import useEntryStore from "../../../store/entry/entryStore";
import useTemplateStore from "../../../store/template/templateStore";
import TemplateItem from "../../atoms/template/TemplateItem";
import Modal from "../../molecules/modal/Modal";
import { ModalFooter } from "../../molecules/modal/ModalFooter";
import { ModalHeader } from "../../molecules/modal/ModalHeader";
import { CONS_PATH_TEMPLATES } from "../../../../common/constants";
import { extractDateFromText } from "../../../../common/modules/date/extractDateFromText";

export default function AddEntryModal(props: {
  visible: boolean;
  closeModal: () => void;
}) {
  const navigate = useNavigate();
  // store
  const entryStore = useEntryStore();
  const entrySearchStore = useEntrySearchStore();
  const templateStore = useTemplateStore();

  const goToTemplatePage = () => {
    props.closeModal();
    navigate(CONS_PATH_TEMPLATES);
  };

  const focusOnEntry = () => {
    setTimeout(() => {
      // focus on the first textarea
      const textarea = document.querySelector("textarea");
      if (textarea) {
        textarea.focus();
        // place the cursor to the end
        const length = textarea.value.length;
        textarea.setSelectionRange(length, length);
      }
    }, 500);
  };

  const createEntries = (bodies: string[]) => {
    // get date from the search text
    const date = extractDateFromText(entrySearchStore.searchText);
    const dateText = date.length === 10 ? date : "";

    // create entries
    bodies.forEach((body) => {
      entryStore.createEntry(body, dateText);
    });

    // closing
    EventTracker.createEntry();
    props.closeModal();
  };

  const onClickBlankEntry = () => {
    // create a new entry with tags from the search text
    const tags = extractTagsFromBody(entrySearchStore.searchText);
    const tagsText =
      tags.length > 0 ? tags.map((t) => `#${t}`).join(" ") + " " : "";

    // create entries
    createEntries([tagsText]);

    focusOnEntry();
  };

  const onClickTemplate = (templateId: string) => {
    const template = templateStore.getTemplateById(templateId);
    if (!template) return;

    createEntries(template.bodies);

    EventTracker.useTemplate();
  };

  return (
    <Modal
      visible={props.visible}
      width="450px"
      closeModal={props.closeModal}
      alignTop={true}
    >
      <ModalHeader title="Add Entry" />
      <div className="py-4 grid grid-cols-1 md:grid-cols-2 gap-2 padding-x-sm">
        <TemplateItem id="blank" name="+ New" onClick={onClickBlankEntry} />

        {templateStore.templates.map((template) => (
          <TemplateItem
            key={template.id}
            id={template.id}
            name={template.name}
            onClick={onClickTemplate}
          />
        ))}
      </div>

      <ModalFooter>
        <div className="flex justify-end w-full">
          <button
            className="btn btn-text text-foreLight"
            onClick={goToTemplatePage}
          >
            <LuLayoutTemplate className="mr-1.5" /> Edit Template
          </button>
        </div>
      </ModalFooter>
    </Modal>
  );
}
