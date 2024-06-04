import { useNavigate } from "react-router-dom";
import {
  CONS_MODAL_UPGRADE,
  CONS_PATH_TEMPLATES_EDIT,
  CONS_PATH_TEMPLATES_NEW,
} from "../../../common/constants";
import useTemplateStore from "../../store/template/templateStore";
import TemplateItem from "../atoms/template/TemplateItem";
import { Card } from "../atoms/card/Card";
import { PageTitle, PageWrapper } from "../wrappers/PageShell";
import useUserStore from "../../store/user/userStore";
import useUiStore from "../../store/ui/uiStore";

export default function TemplatesPage() {
  const navigate = useNavigate();
  // stores
  const templateStore = useTemplateStore();
  const { checkIfPremium } = useUserStore();
  const uiStore = useUiStore();

  function goToNewTemplatePage() {
    if (!checkIfPremium() && templateStore.templates.length >= 1) {
      const response = confirm(
        "Please upgrade to premium to create more than 1 template"
      );
      if (response) {
        uiStore.setVisibleModal(CONS_MODAL_UPGRADE);
      }
      return;
    }

    navigate(CONS_PATH_TEMPLATES_NEW);
  }

  function goToTemplatePage(templateId: string) {
    navigate(`${CONS_PATH_TEMPLATES_EDIT}/${templateId}`);
  }

  return (
    <PageWrapper>
      <div className="container-tiny">
        {/* Header */}
        <PageTitle title="Template">
          <button className="btn" onClick={goToNewTemplatePage}>
            + New Template
          </button>
        </PageTitle>

        <Card>
          <div className="p-4">
            {/* If No Templates */}
            {templateStore.templates.length === 0 && (
              <div className="p-4 text-center">
                <h2 className="text-foreLight">No templates created yet</h2>
              </div>
            )}

            {/* Templates */}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {templateStore.templates.map((template) => (
                <TemplateItem
                  key={template.id}
                  id={template.id}
                  name={template.name}
                  onClick={goToTemplatePage}
                />
              ))}
            </div>
          </div>
        </Card>
      </div>
    </PageWrapper>
  );
}
