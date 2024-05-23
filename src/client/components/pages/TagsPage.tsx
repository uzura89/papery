import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { TagType } from "../../../common/types/tag.types";
import useTagStore from "../../store/tag/tagStore";
import { Card } from "../atoms/card/Card";
import { TagItem } from "../atoms/tag/TagItem";
import { LuFileEdit } from "react-icons/lu";
import { TagEditModal } from "../organisms/tag/TagEditModal";
import { TagCreateModal } from "../organisms/tag/TagCreateModal";
import useEntryStore from "../../store/entry/entryStore";
import { CONS_PATH_HOME } from "../../../common/constants";
import useEntrySearchStore from "../../store/entry/entrySearchStore";
import { PageTitle, PageWrapper } from "../wrappers/PageShell";

export default function TagsPage() {
  const navigate = useNavigate();
  // store
  const tagStore = useTagStore();
  const entryStore = useEntryStore();
  const entrySearchStore = useEntrySearchStore();
  // state
  const [editTagModalVisible, setEditTagModalVisible] = useState(false);
  const [createTagModalVisible, setCreateTagModalVisible] = useState(false);
  const [selectedTag, setSelectedTag] = useState<TagType | null>(null);

  function openEditTagModal(tag: TagType) {
    setSelectedTag(tag);
    setEditTagModalVisible(true);
  }

  function openCreateTagModal() {
    setCreateTagModalVisible(true);
  }

  function onClickTag(tagName: string) {
    const tagWithHash = `#${tagName}`;

    entrySearchStore.changeSearchText(tagWithHash);
    entryStore.fetchEntriesBySearchText();

    navigate(CONS_PATH_HOME);
  }

  function closeModal() {
    setEditTagModalVisible(false);
    setCreateTagModalVisible(false);
  }

  return (
    <PageWrapper>
      <div className="container-tiny">
        <PageTitle title="Tags">
          <button className="btn" onClick={openCreateTagModal}>
            + New Tag
          </button>
        </PageTitle>
        <Card>
          <div className="py-1">
            {tagStore.tags.map((tag, index) => {
              return (
                <div key={tag.id}>
                  {index > 0 && <hr className="border-borderLight" />}
                  <TagRow
                    key={tag.id}
                    tag={tag}
                    onClickEdit={openEditTagModal}
                    onClickTag={onClickTag}
                  />
                </div>
              );
            })}
          </div>
        </Card>

        {selectedTag && (
          <TagEditModal
            visible={editTagModalVisible}
            selectedTag={selectedTag}
            closeModal={closeModal}
          />
        )}

        <TagCreateModal
          visible={createTagModalVisible}
          closeModal={closeModal}
        />
      </div>
    </PageWrapper>
  );
}

function TagRow(props: {
  tag: TagType;
  onClickEdit: (tag: TagType) => void;
  onClickTag: (tagName: string) => void;
}) {
  return (
    <div className="flex items-center justify-between padding-x-sm py-2">
      <div
        className="clickable"
        onClick={() => props.onClickTag(props.tag.text)}
      >
        <TagItem text={props.tag.text} color={props.tag.color} />
      </div>

      <button
        className="btn btn-text"
        onClick={() => props.onClickEdit(props.tag)}
      >
        <LuFileEdit className="text-foreLight text-sm" />
      </button>
    </div>
  );
}
