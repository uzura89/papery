import { useNavigate } from "react-router-dom";

import { CONS_PATH_TEMPLATES } from "../../../common/constants";
import useTemplateStore from "../../store/template/templateStore";
import TemplateForm from "../organisms/template/TemplateForm";
import BackButton from "../atoms/buttons/BackButton";
import { TagSelectionModal } from "../organisms/entry/TagSelectionModal";
import EventTracker from "../../modules/analytics/EventTracker";

export default function NewTemplatesPage() {
  const navigate = useNavigate();
  // store
  const templateStore = useTemplateStore();

  function onClickSave(title: string, bodies: string[]) {
    templateStore.createTemplate(title, bodies);
    navigate(CONS_PATH_TEMPLATES);

    EventTracker.createTemplate();
  }

  function cancelAndGoBack() {
    navigate(CONS_PATH_TEMPLATES);
  }

  return (
    <div className="w-full h-full">
      <div className="container-tiny h-full">
        <div className="w-full relative h-full flex flex-col justify-stretch">
          <div className="mb-4">
            <BackButton onClick={cancelAndGoBack} />
          </div>

          <div className="h-full overflow-y-scroll pb-10">
            <TemplateForm
              initName=""
              initBodies={[]}
              onClickCancel={cancelAndGoBack}
              onClickSave={onClickSave}
            />
          </div>
          <TagSelectionModal />
        </div>
      </div>
    </div>
  );
}
