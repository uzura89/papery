import { TemplateBaseType, TemplateSchemaType } from "../../../common/types";

export async function dbUpsertTemplate(
  mongoose: any,
  userParmId: string,
  template: TemplateBaseType
): Promise<TemplateSchemaType> {
  const Template = mongoose.model("Template");

  try {
    // update template
    const updatedTemplate = await Template.findOneAndUpdate(
      { userParmId, id: template.id },
      {
        name: template.name,
        bodies: template.bodies,
      },
      { new: true, upsert: true }
    );

    // return
    return updatedTemplate;
  } catch (error) {
    throw error;
  }
}
