import {
  TemplateBaseType,
  TemplateSchemaType,
} from "../../../common/types/template.types";

export async function dbFetchAllTemplates(
  mongoose: any,
  userParmId: string
): Promise<TemplateBaseType[]> {
  const Template = mongoose.model("Template");

  try {
    // fetch all Templates
    const templateSchemas = await Template.find({ userParmId });

    const templates: TemplateBaseType[] = templateSchemas.map(
      (templateSchema: any) => {
        return {
          id: templateSchema.id,
          name: templateSchema.name,
          bodies: templateSchema.bodies,
          index: templateSchema.index,
        };
      }
    );

    // return
    return templates;
  } catch (error) {
    throw error;
  }
}
