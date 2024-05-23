import { useNavigate } from "react-router-dom";
import {
  CONS_PATH_TEMPLATES_EDIT,
  CONS_PATH_TEMPLATES_NEW,
} from "../../../common/constants";
import useTemplateStore from "../../store/template/templateStore";
import TemplateItem from "../atoms/template/TemplateItem";
import { Card } from "../atoms/card/Card";
import { PageTitle, PageWrapper } from "../wrappers/PageShell";

export default function TemplatesPage() {
  const navigate = useNavigate();
  // stores
  const templateStore = useTemplateStore();

  function goToNewTemplatePage() {
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
