import { v4 } from "uuid";
import { create } from "zustand";

import { TemplateBaseType } from "../../../common/types";
import { callFetchAllTemplates } from "../../api/template/callFetchAllTemplates";
import { callCreateTemplate } from "../../api/template/callCreateTemplate";
import { callUpdateTemplate } from "../../api/template/callUpdateTemplate";
import { callDeleteTemplate } from "../../api/template/callDeleteTemplate";

const useTemplateStore = create<{
  templates: TemplateBaseType[];
  fetchAllTemplates: () => Promise<void>;
  getTemplateById: (id: string) => TemplateBaseType | undefined;
  createTemplate: (name: string, bodies: string[]) => Promise<void>;
  updateTemplate: (id: string, name: string, bodies: string[]) => Promise<void>;
  deleteTemplate: (id: string) => Promise<void>;
}>((set, get) => ({
  templates: [],
  fetchAllTemplates: async () => {
    // fetch all templates
    const response = await callFetchAllTemplates({});
    if (response.error) return;

    // update store
    set(() => ({
      templates: response.data.templates,
    }));
  },
  getTemplateById: (id) => {
    return get().templates.find((template) => template.id === id);
  },
  createTemplate: async (name, bodies) => {
    // create new template
    const newTemplate = {
      id: v4(),
      name,
      bodies,
      index: get().templates.length,
    };

    // update store
    set(() => ({
      templates: [...get().templates, newTemplate],
    }));

    // create template
    await callCreateTemplate(newTemplate);
  },
  updateTemplate: async (id, name, bodies) => {
    // update store
    const newTemplates = get().templates.map((template) => {
      if (template.id !== id) return template;
      return {
        ...template,
        name,
        bodies,
      };
    });
    set(() => ({
      templates: newTemplates,
    }));

    // update template
    await callUpdateTemplate({ id, name, bodies });
  },
  deleteTemplate: async (id) => {
    // update store
    const newTemplates = get().templates.filter(
      (template) => template.id !== id
    );
    set(() => ({
      templates: newTemplates,
    }));

    // delete template
    await callDeleteTemplate({ id });
  },
}));

export default useTemplateStore;
