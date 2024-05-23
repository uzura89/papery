import { useNavigate, useParams } from "react-router-dom";

import { CONS_PATH_TEMPLATES } from "../../../common/constants";
import useTemplateStore from "../../store/template/templateStore";
import TemplateForm from "../organisms/template/TemplateForm";
import { TagSelectionModal } from "../organisms/entry/TagSelectionModal";
import BackButton from "../atoms/buttons/BackButton";

export default function EditTemplatesPage() {
  const navigate = useNavigate();
  const params = useParams();
  // store
  const templateStore = useTemplateStore();
  // get this template
  const templateId = params.id as string;
  const thisTemplate = templateStore.getTemplateById(templateId);

  // if template not found, go back to templates page
  if (!thisTemplate) {
    navigate(CONS_PATH_TEMPLATES);
    return null;
  }

  function onClickSave(title: string, bodies: string[]) {
    if (!thisTemplate) return;
    templateStore.updateTemplate(thisTemplate.id, title, bodies);
    navigate(CONS_PATH_TEMPLATES);
  }

  function deleteTemplate() {
    if (!thisTemplate) return;
    templateStore.deleteTemplate(thisTemplate.id);
    navigate(CONS_PATH_TEMPLATES);
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
              initName={thisTemplate ? thisTemplate.name : ""}
              initBodies={thisTemplate ? thisTemplate.bodies : []}
              onClickSave={onClickSave}
              onClickCancel={cancelAndGoBack}
              onClickDelete={deleteTemplate}
            />
          </div>
          <TagSelectionModal />
        </div>
      </div>
    </div>
  );
}
